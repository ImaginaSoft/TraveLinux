$(function () {

    function renderTamPass(name) {
        return function (data, type, full, meta) {
            var $container = $('<div>');

            var $view = $('<button class="btn btn-default ver-imagen" title="Ver Imagen"><i class="fa fa-camera"></i></button>');
            var $add = $('<button class="btn btn-default  agregar-imagen" title="Agregar Imagen"><i class="fa fa-plus"></i></button>');
            var $update = $('<button class="btn btn-default actualizar-imagen" title="Actualizar Imagen"><i class="fa fa-pencil"></i></button>');
            var $remove = $('<button class="btn btn-default eliminar-imagen" title="Eliminar Imagen"><i class="fa fa-times"></i></button>');
            var $file = $('<input type="file" onchange="GetFileSize()" accept="image/*" style="display: none;" class="' + name + '">');

            var editable = name == 'TieneTam'  ? full['TamEditable']  :
                           name == 'TienePass' ? full['PassEditable'] : false;

            if (full[name] === 'SI') {
                if (editable) {
                    if (perfil === 'Proveedor') {
                        $container.append($view).append($update).append($remove).append($file);
                    } else {
                        $container.append($view).append($file);
                    }
                } else {
                    $container.append($view).append($file);
                }
            } else {
                if (editable) {
                    if (perfil === 'Proveedor') {
                        $container.append($add).append($file);
                    }
                }                
            }

            return $container.html();
        };
    }

    function uploadImage(item, type, value) {
        var file = $(this)
            .parent()
            .find('input[type=file]')
            .prop('files');

        if (file) {
            file = file[0];
        }

        var data = new FormData();
        data.append('File', item.File);
        data.append('SubFile', item.SubFile);
        data.append('Consecutivo', item.Consecutivo);
        data.append('Tipo', type);
        data.append(type, value || file);

        $.ajax({
            type: 'POST',
            url: '/Reportes/SubirImagen',
            cache: false,
            contentType: false,
            processData: false,
            data: data
        })
        .done(function (response) {
            showSuccessMessage('Se ha actualizado la imagen con éxito');
            grid.ajax.reload();
        })
        .fail(function (xhr) {
            if (xhr.status === 400) {
                showErrorMessage('No se pudo subir el archivo porque no es una imagen');
            } else {
                showErrorMessage('No se pudo subir la imagen');
            }
        });
    }

    var grid = $('#resultados').DataTable({
        scrollX: true,
        paging: true,
        processing: true,
        ordering: false,
        deferLoading: 0,
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate
            }
        },
        ajax: {
            method: 'GET',
            url: '/Reportes/ObtenerPasajeros',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
                return {
                    file: $('#file').val(),
                    subfile: $('#subfile').val(),
                    consecutivo: $('#consecutivo').val()
                };
            }
        },
        columnDefs: [
            {
                responsivePriority: 1,
                targets: 0
            },
            {
                responsivePriority: 2,
                targets: 1
            },
            {
                responsivePriority: 3,
                targets: 2
            },
            {
                responsivePriority: 4,
                targets: 3
            }
        ],
        columns: [
            {
                title: 'Consecutivo',
                data: 'Consecutivo',
                width: 80,
                className: 'all'
            },
            {
                title: 'Nombre',
                data: 'Nombre',
                width: 125,
                className: 'all'
            },
            {
                title: 'Tam',
                data: null,
                width: 80,
                className: 'not-mobile',
                render: renderTamPass('TieneTam')
            },
            {
                title: 'Pass',
                data: null,
                width: 80,
                className: 'not-mobile',
                render: renderTamPass('TienePass')
            }
        ]
    });

    $('#resultados tbody').on('click', 'button.ver-imagen', function (e) {
        e.preventDefault();

        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            var index = $(this).parents('li').attr('data-dt-row');
            item = grid.row(index).data();
        }

        var type = $(this).parent().find('input[type=file]').attr('class');
        var code, desc;

        if (type === 'TieneTam') {
            code = 'T';
            desc = 'Tam';
        } else if (type === 'TienePass') {
            code = 'P';
            desc = 'Pasaporte';
        }

        $.ajax({
            type: 'GET',
            url: '/Reportes/ObtenerImagen',
            data: {
                file: item.File,
                subfile: item.SubFile,
                consecutivo: item.Consecutivo,
                tipo: code
            }
        })
        .done(function (response) {
            $('#image-modal-title').html(item.Nombre + ' - Imagen ' + desc);
            $('#image-modal-content').attr('src', 'data:image/png;base64,' + response);
            $('#image-modal').modal('show');
        })
        .fail(function () {
            showErrorMessage('No se pudo obtener la imagen');
        });
    });

    $('#resultados tbody').on('click', 'button.agregar-imagen', function (e) {
        e.preventDefault();

        var self = this;
        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            var index = $(this).parents('li').attr('data-dt-row');
            item = grid.row(index).data();
        }

        var type = $(this).parent().find('input[type=file]').attr('class');

        $(this).parent().find('input[type=file]').click();
        $(this).parent().find('input[type=file]').change(function () {
            uploadImage.bind(self)(item, type);
        });
    });

    $('#resultados tbody').on('click', 'button.actualizar-imagen', function (e) {
        e.preventDefault();

        var self = this;
        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            var index = $(this).parents('li').attr('data-dt-row');
            item = grid.row(index).data();
        }

        var type = $(this).parent().find('input[type=file]').attr('class');

        $(this).parent().find('input[type=file]').click();
        $(this).parent().find('input[type=file]').change(function () {
            uploadImage.bind(self)(item, type);
        });
    });

    $('#resultados tbody').on('click', 'button.eliminar-imagen', function (e) {
        e.preventDefault();

        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            var index = $(this).parents('li').attr('data-dt-row');
            item = grid.row(index).data();
        }

        var type = $(this).parent().find('input[type=file]').attr('class');

        uploadImage(item, type, null);
    });
    $("#chkExcepcion").click(function () {
        var data = {
            file: $('#file').val(),
            subfile: $('#subfile').val(),
            consecutivo: $('#consecutivo').val(),
            valor: $("#chkExcepcion").is(':checked')
        };
        $.ajax({
            type: 'POST',
            url: '/Reportes/ActualizarExcepcion',
            data: data
        })
     .done(function () {
         showSuccessMessage('Se han actualizado la excepcion');
     })
     .fail(function () {
             showErrorMessage('No se pudo actualizar la excepción');
         });
    });

});