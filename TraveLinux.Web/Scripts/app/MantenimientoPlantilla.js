$(function () {

    //document.getElementById("btn-editar").disabled = true;
    var editor;
    $('#fecha_inicio').datetimepicker();

    $('#proveedor').on('change', function () {

        var Proveedor = $(this).val();
        $select = $('#ciudad');
        $.ajax({
            type: 'POST',
            url: '/Plantilla/ListadoCiudadServProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Proveedor: Proveedor }),
            success: function (data) {
               // debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option value="' + val.DEPARTAMENTO + '">' + val.NOMBRE + '</option>');

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


    $('#tiposervicio').on('change', function () {

        var Tipo_Servicio = $(this).val();
        var Proveedor = $('#proveedor option:selected').val();
        var Ciudad = $('#ciudad option:selected').val();
        $select = $('#servicio');
        $select1 = $('#tipoacco');
        $.ajax({
            type: 'POST',
            url: '/Plantilla/ListadoServicioxProvPlantilla',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ sProveedor: Proveedor, sTipo_Servicio: Tipo_Servicio, sCiudad: Ciudad }),
            success: function (data) {
             //   debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option value="' + val.SERVICIO + '">' + val.NOMBRE + '</option>');

                    })
                    $select.selectpicker('refresh');
                }
                else {
                    //$select.append('<option>No hay Distritos</option>');
                    $select.html('');
                    $select.selectpicker('refresh');


                }

                    
                $.ajax({
                    type: 'POST',
                    url: '/Plantilla/ObtenerListAcomodacionPlantilla',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ sTipo_Servicio: Tipo_Servicio}),
                    success: function (data) {
                        //   debugger;
                        if (data.length != 0) {
                            $select1.html('');
                            $select1.append('<option>-- Seleccione --</option>');
                            $.each(data, function (i, val) {
                                $select1.append('<option value="' + val.ID_TIPO_ACOM + '">' + val.DESCR_ACOM + '</option>');

                            })
                            $select1.selectpicker('refresh');
                        }
                        else {
                            //$select.append('<option>No hay Distritos</option>');
                            $select1.html('');
                            $select1.selectpicker('refresh');


                        }

                    },
                });
                    

            },
        })
    });



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



    // Guardar Detalle Plantilla

    //function onClickRegistrarDetallePlantilla() {

    //    //var valor = 0;

    //    //if ($('input#inlineCheckbox1').is(':checked')) {
    //    //    valor = 1
    //    //}
    //    //else {
    //    //    valor = 0
    //    //}
    //    //debugger;
    //    var data = {
    //        ePlantillaDetalle: {
    //            Id_Plantilla: $('#id_plantilla').val(),
    //            Servicio: $('#servicio').val(),
    //            Proveedor: $('#proveedor').val(),
    //           // Cant_Dias: $('#dtp_start').val(),
    //            Tipo_Servicio: $('#tiposervicio').val(),
    //            Tipo_Acomodacion: $('#tipoacco').val(),
    //            //Estado: $('#tiposervicio').val(),
    //           // Precio_Total: $('#tiposervicio').val(),

    //        }
    //    }


    //    $.ajax({
    //        type: 'POST',
    //        url: '/Plantilla/GuardarPlantillaDetalle',
    //        contentType: 'application/json; charset=utf-8',
    //        data: JSON.stringify(data)
    //    })
    //    .done(function (data) {
    //        showSuccessMessage('Se ha guardado el detalle de la plantilla');
    //        setTimeout(function () {
    //            window.location = '/Plantilla/CrearPlantillaDetalle?Plantilla=' + Id_Plantilla;
    //        }, 2000);
    //    })
    //    .fail(function () {
    //        showErrorMessage('No se pudo guardar el detalle de la plantillas. Inténtelo de nuevo.');
    //        enableAllComponents(true);
    //    });
    //}
    




    //var grid = $('#detalleplantilla').DataTable({
    //    scrollX: true,
    //    paging: true,
    //    processing: true,
    //    ordering: false,
    //    deferLoading: 0,
    //    responsive: {
    //        details: {
    //            type: 'column',
    //            display: $.fn.dataTable.Responsive.display.childRowImmediate,
    //            renderer: function (api, index, columns) {
    //                $('div#resultados_wrapper .dataTables_scrollHead').hide();

    //                var row = $(api.row(index).node());
    //                row.hide();

    //                var html = $('#responsive-template').html();
    //                var a = document.getElementById('yourlinkId'); //or grab it by tagname etc


    //                var template = $(html);
    //                template.find('#moneda').html(columns[0].data);
    //                template.find('#descripcion').html(columns[1].data);
    //                template.find('#valor').html(columns[2].data);
    //                template.find('#estado').html(columns[3].data);

    //                setTextColor(template, '#descripcion', columns[1].data);

    //                return template;
    //            }
    //        }
    //    },

    //    ajax: {
    //        method: 'GET',
    //        url: '/Plantilla/ListadoDetallePlantilla?Plantilla=' + Id_Plantilla,
    //        dataType: 'json',
    //        dataSrc: '',
    //        data: function (items) {
    //        }
    //    },

    //    columns: [
    //{
    //    title: 'ID_PLANTILLA',
    //    data: 'ID_PLANTILLA',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false
    //},
    //{
    //    title: 'SERVICIO',
    //    data: 'SERVICIO',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false
    //},
    //{
    //    title: 'PROVEEDOR',
    //    data: 'PROVEEDOR',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false
    //},
    //{
    //    title: 'TIPO_SERVICIO',
    //    data: 'TIPO_SERVICIO',
    //    width: 150,
    //    className: 'not-mobile',
    //    //render: renderTextColor
    //    visible: true,
    //},

    //{
    //    title: 'TIPO_ACOMODACION',
    //    data: 'TIPO_ACOMODACION',
    //    width: 40,
    //    className: 'not-mobile',
    //    //render: renderTextColor
    //    visible: true,
    //},
 

    //    ]

    //});


    ////$('#detalleplantilla tbody').on('click', 'button.btn-guardar-detalle', onClickRegistrarDetallePlantilla);

    //$('#btn-guardar-detalle').on('click', onClickRegistrarDetallePlantilla);




});