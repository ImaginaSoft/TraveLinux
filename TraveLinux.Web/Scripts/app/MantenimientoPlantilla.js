$(function () {

    //document.getElementById("btn-editar").disabled = true;
    var editor;
    $('#fecha_inicio').datetimepicker();


    // Guardar Plantilla

    function onClickGuardarPlantilla() {

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = "S"
        }
        else {
            valor = "N"
        }
        //debugger;
        var data = {
            ePlantilla: {
                Descripcion: $('#template_name').val(),
                //Ejecutiva: $('#paterno').val(),
                Cant_child: $('#cant_child').val(),
                Cant_adult: $('#cant_adult').val(),
               // Cant_pax: $('#numero').val(),
                Estado: valor,
                Fecha_ini: $('#fecha_inicio').data('DateTimePicker').date(),
                Markup: $('#markup').val()
            }
        }


        $.ajax({
            type: 'POST',
            url: '/Plantilla/GuardarPlantilla',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado la plantilla');
            setTimeout(function () {
                window.location = '/Plantilla/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar la plantilla. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    $('#btn-guardar').on('click', onClickGuardarPlantilla);


    function onClickVerDetallePlantilla(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }

        window.location = '/Plantilla/CrearPlantillaDetalle?Plantilla=' + item.ID_PLANTILLA;
    }


    function onClickModificarPlantilla(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }

        window.location = '/Plantilla/ModificarPlantilla?Plantilla=' + item.ID_PLANTILLA;
    }


    //*LISTA PLANTILLA*//
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

                    template.find('#nombre').html(columns[1].data);
                    template.find('#alias').html(columns[2].data);

                    template.find('#ruc').html(columns[9].data);
                    template.find('#paginaweb').html(columns[8].data);


                    template.find('#pais').html(columns[5].data);
                    template.find('#ciudad').html(columns[6].data);
                    template.find('#idioma').html(columns[10].data);
                    //setTextColor(template, '#estado', columns[11].data);


                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Plantilla/ListadoPlantilla',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {

                var filtro = {
                    Estado: $.trim($('#proveedor_estado').val())
                };
                return filtro;
            }
        },

        columns: [
            {
                title: '# TEMPLATE',
                data: 'ID_PLANTILLA',
                width: 70,
                className: 'not-mobile',
                visible: true,
            },

            {
                title: 'DESCRIPTION',
                data: 'DESCRIPCION',
                width: 110,
                className: 'not-mobile',
                visible: true,

            },
            {
                title: 'EXECUTIVE',
                data: 'EJECUTIVA',
                width: 110,
                className: 'not-mobile',
                visible: true,

             },

             {
                title: '# CHILD',
                data: 'CANT_CHILD',
                width: 110,
                className: 'not-mobile',
                visible: true,

             },

             {
                title: '# ADULT',
                data: 'CANT_ADULT',
                width: 110,
                className: 'not-mobile',
                visible: true,

             },
             {
                title: '# TOTAL PAX',
                data: 'CANT_PAX',
                width: 110,
                className: 'not-mobile',
                visible: true,

             },

             {
                    title: 'DATE',
                    data: 'FECHA_INI',
                    width: 110,
                    className: 'not-mobile',
                    visible: true,

             },


             {
                     title: 'MARKUP',
                     data: 'MARKUP',
                     width: 110,
                     className: 'not-mobile',
                     visible: true,

              },


            {
                data: null,
                width: 80,
                className: 'dt-body-center not-mobile',
                render: function (data, type, row, meta) {
                    var content = [];


                    var SeleccionarOpcion = '<a class="btn btn-warning btn-SeleccionarOpcion data-toggle="modal" data-target="#myModal" title="tools"><i class="fa fa-cogs"></i></a>';
                    var CrearServicio = '<button class="btn btn-primary btn-VerServicio" title="View Details"><i class="fa fa-eye-slash"></i></button>';
                    //var CrearTarifa = '<button class="btn btn-danger btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';


                    content.push(CrearServicio);
                    content.push(SeleccionarOpcion);

                    return content.join('&nbsp;&nbsp;');
                }
            },

        ],

    });

    $('#resultados tbody').on('click', 'button.btn-VerServicio', onClickVerDetallePlantilla);
    $('#resultados tbody').on('click', 'a.btn-SeleccionarOpcion', onClickSeleccionarOpcion);

    window.onClickVerDetallePlantilla = onClickVerDetallePlantilla;


});