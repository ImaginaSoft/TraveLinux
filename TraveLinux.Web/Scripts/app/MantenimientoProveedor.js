$(function(){    
    
    $("#eliminar_email").hide();
    $("#eliminar_fono").hide();
    var max_fields = 3;
    var x = 1;
    var y = 1;

    $("#mostrar_email").click(function (e) {
        e.preventDefault();       
        if ('clicked') {
            if (x < max_fields) {
                x++; 
                $("#caja_dinamico").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x +'"><p>Email ' + x + ':</p><input class="form-control" id="email' + x + '"placeholder="Enter Email"></div>');

                if (x == 2) {                    
                    $("#eliminar_email").show();
                }                
            }
        }

    });    

    $('#eliminar_email').click(function () {
        debugger;
        if (x != 0) {
            $('#eliminarcajas' + x).remove();           
            x = x - 1;
        }
    });


    $("#mostrar_fono").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (y < max_fields) {
                y++;
                $("#caja_dinamico_2").append('<div class="col-xs-12 col-sm-12 col-md-3" id ="eliminarcajas_2' + y + '"><p>Phone ' + y + ':</p><input class="form-control" id="telefono' + y + '"placeholder="Enter Fono"></div>');

                if (y == 2) {
                    $("#eliminar_fono").show();
                }
            }
        }

    });

    $('#eliminar_fono').click(function () {
        debugger;
        if (y != 0) {
            $('#eliminarcajas_2' + y).remove();
            y = y - 1;
        }
    });

    $('#pais').on('change', function () {

        var Pais = $(this).val();
        $select = $('#departamentos');
        $.ajax({
            type: 'POST',
            url: '/Cliente/ListadoDepartamento',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Pais: Pais }),
            success: function (data) {
                debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option id="' + val.DEPARTAMENTO + '">' + val.NOMBRE + '</option>');

                    })
                    $select.selectpicker('refresh');
                }
                else {
                    //$select.append('<option>No hay Distritos</option>');
                    $select.html('');

                }

            },
        })
    });


    function renderTextColor(data, type, row, meta) {
        var text = data.toUpperCase();
        var template = $('<span>');
        if (text.indexOf('ESTADO') == 'ACTIVO') {
            template.css('color', 'red').html(data);
        } else {
            template.css('color', 'green').html(data);
        }
        return $('<div>').append(template).html();
       
    }

    // Guardar Proveedor

    
    function onClickListarTarifa(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        //alert(item.PROVEEDOR);

        debugger;
        window.location = '/Tarifa/TarifaProveedor?Proveedor=' + item.PROVEEDOR;        
    }

    function onClickCancelarProveedor(e) {
        e.preventDefault();       
        
        window.location = '/Proveedor/Index';
    }
    
    function onClickEditarProveedor(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        //alert(item.PROVEEDOR);

        debugger;
        window.location = '/Proveedor/EditarProveedor?Proveedor=' + item.PROVEEDOR;
    }


    function onClickRegistrarProveedor() {

        debugger;

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }

        var data = {
            eProveedor: {                
                Nombre: $('#nombre').val(),
                Alias: $('#alias').val(),
                Tproveedor: $('#tproveedor').val(),
                Tipo: $('#radio').val(),
                pais: $('#pais').val(),
                Ciudad: $('#departamentos').val(),
                Direccion: $('#direccion').val(),
                PaginaWeb: $('#paginaweb').val(),
                ruc: $('#ruc').val(),
                Idioma: $('#idioma').val(),
                Email_1: $('#email1').val(),
                Email_2: $('#email2').val(),
                Email_3: $('#email3').val(),
                Telefono_1: $('#telefono1').val(),
                Telefono_2: $('#telefono2').val(),
                Telefono_3: $('#telefono3').val(),
                Estado: valor
            }
        };

        //if (data.Nombre == null) {
        //    showErrorMessage('Debe ingresar un nombre');
        //    return;
        //}


        $.ajax({
            type: 'POST',
            url: '/Proveedor/GuardarProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el proveedor');
            setTimeout(function () {
                window.location = '/Proveedor/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el proveedor. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }


    function onClickActualizarProveedor() {

        debugger;

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }

        var data = {
            eProveedor: {
                Proveedor: $('#proveedor').val(),
                Nombre: $('#nombre').val(),
                Alias: $('#alias').val(),
                Tproveedor: $('#tproveedor').val(),
                Tipo: $('#radio').val(),
                pais: $('#pais').val(),
                Ciudad: $('#departamentos').val(),
                Direccion: $('#direccion').val(),
                PaginaWeb: $('#paginaweb').val(),
                ruc: $('#ruc').val(),
                Idioma: $('#idioma').val(),
                Email_1: $('#email1').val(),
                Email_2: $('#email2').val(),
                Email_3: $('#email3').val(),
                Telefono_1: $('#telefono1').val(),
                Telefono_2: $('#telefono2').val(),
                Telefono_3: $('#telefono3').val(),
                Estado: valor
            }
        };

        //if (data.Nombre == null) {
        //    showErrorMessage('Debe ingresar un nombre');
        //    return;
        //}


        $.ajax({
            type: 'POST',
            url: '/Proveedor/ActualizarProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha actualizado el proveedor');
            setTimeout(function () {
                window.location = '/Proveedor/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo actualizar el proveedor. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    //*LISTA PROVEEDOR*//
    var grid = $('#resultados').DataTable({
        scrollX: true,
        paging: true,
        processing: true,
        ordering: false,
        deferLoading: 0,
        responsive: {
            details: {
                type: 'column',
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                renderer: function (api, index, columns) {
                    $('div#resultados_wrapper .dataTables_scrollHead').hide();

                    var row = $(api.row(index).node());
                    row.hide();

                    var html = $('#responsive-template').html();
                    var a = document.getElementById('yourlinkId'); //or grab it by tagname etc


                    var template = $(html);
                    template.find('#proveedor').html(columns[0].data);
                    template.find('#nombre').html(columns[1].data);
                    template.find('#alias').html(columns[2].data);
                    template.find('#ruc').html(columns[10].data);
                    template.find('#idioma').html(columns[8].data);                    
                    //template.find('#estado').html(columns[11].data);
                    setTextColor(template, '#estado', columns[11].data);
                    //setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Proveedor/ListadoProveedor',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 70,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 110,
        className: 'not-mobile'
    },

    {
        title: 'ALIAS',
        data: 'ALIAS',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'TIPO PROVEEDOR',
        data: 'TPROVEEDOR',
        width: 70,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'TIPO',
        data: 'TIPO',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'PAIS',
        data: 'PAIS',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'CIUDAD',
        data: 'CIUDAD',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'DIRECCION',
        data: 'DIRECCION',
        width: 150,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'PAGINA WEB',
        data: 'PAGINAWEB',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'RUC',
        data: 'RUC',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'IDIOMA',
        data: 'IDIOMA',
        width: 70,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'ESTADO',
        data: 'ESTADO',
        width: 20,
        className: 'not-mobile',
        visible: true,
        render: renderTextColor
    },

   
    {
        data: null,
        width: 80,
        className: 'dt-body-center not-mobile',
        render: function (data, type, row, meta) {
            var content = [];

            var editarProveedor = '<button class="btn btn-success EditarProveedor btn-editar" title="Editar Proveedor"><i class="glyphicon glyphicon-pencil"></i></button>';
            var CrearTarifa = '<button class="btn btn-danger ListarTarifa btn-CrearTarifa" title="Crear Tarifa"><i class="fa fa-file-text-o"></i></button>';
            //var eliminar = '<button class="btn btn-danger Eliminar" title="Eliminar Cliente"><i class="glyphicon glyphicon-remove"></i></button>';

            content.push(editarProveedor);
            content.push(CrearTarifa);
            //content.push(eliminar);

            return content.join('&nbsp;&nbsp;');
        }
    },

        ]

    });


    $('#btn-guardar').on('click', onClickRegistrarProveedor);
    $('#btn-actualizar').on('click', onClickActualizarProveedor);
    $('#btn-cancelar').on('click', onClickCancelarProveedor);
    $('#resultados tbody').on('click', 'button.ListarTarifa', onClickListarTarifa);
    $('#resultados tbody').on('click', 'button.EditarProveedor', onClickEditarProveedor);

    window.onClickListarTarifa = onClickListarTarifa;
    window.onClickEditarProveedor = onClickEditarProveedor;
});