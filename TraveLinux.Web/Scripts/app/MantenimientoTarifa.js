$(function () {

    var vProveedor = $('#proveedor').val();
    $('#dtp_start').datetimepicker({
        defaultDate: new Date(),
    });
    $('#dtp_beginning').datetimepicker();
    $('#dtp_ending').datetimepicker();



        function renderTextColor(data, type, row, meta) {
        var text = data.toLowerCase();
        var template = $('<span>');
        if (text.indexOf('no aplicable') >= 0) {
            template.css('color', 'green').html(data);
        } else if (text.indexOf('conforme') >= 0) {
            template.css('color', 'green').html(data);
        } else if (text.indexOf('pendiente') >= 0) {
            template.css('color', 'red').html(data);
        } else {
            template.css('color', 'red').html(data);
        }
        return $('<div>').append(template).html();
    }

        

    // Listar Fechas POr Temporada

        $('#temporada').on('change', function () {
            var Temporada = $(this).val();
            var Fecha_Inicio = "";
            var Fecha_Final = "";
            var fecha = '1001-01-01 00:00';
            var max_fields = 1;
            var x = 0;
            debugger;
            $.ajax({
                type: 'POST',
                url: '/Tarifa/ListadoFechasXTemporada',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({ Temporada: Temporada }),
                success: function (data) {                    
                    Fecha_Inicio = data.FECHA_INICIO;
                    Fecha_Final = data.FECHA_FIN;
                    debugger;

                    if (fecha == Fecha_Inicio && fecha == Fecha_Final) {
                        $("#dtp_beginning").remove();
                        $("#dtp_ending").remove();
                        $(".dtp_beginning").append('<div class="input-group date" id="dtp_beginning"><input type="text" class="form-control input-sm" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                        $(".dtp_ending").append('<div class="input-group date" id="dtp_ending"><input type="text" class="form-control input-sm" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                        $('#dtp_beginning').datetimepicker();
                        $('#dtp_ending').datetimepicker();

                    }

                    

                    if (data.length != 0) {
                        if (fecha != Fecha_Inicio) {
                            if (x < max_fields) {
                                $("#dtp_beginning").remove();
                                $("#dtp_ending").remove();
                                $(".dtp_beginning").append('<div class="input-group date" id="dtp_beginning"><input type="text" class="form-control input-sm" value ="' + Fecha_Inicio + '"" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                                $(".dtp_ending").append('<div class="input-group date" id="dtp_ending"><input type="text" class="form-control input-sm" value ="' + Fecha_Final + '"" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                                $('#dtp_beginning').datetimepicker();
                                $('#dtp_ending').datetimepicker();
                            }
                        }
            
                   }
                   
                },
            })

        });


    //*Guardar Tarifa*//

    function onClickGuardarTarifa() {
        debugger;
        var valor = 0;
        var vProveedor = $('#proveedor').val();

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0        }
      
        var data = {            
            eTarifa: {
                Proveedor: vProveedor,
                Estado: valor,
                Nombre: $('#tarifa').val(),
                Fecha_Comenzar: $('#dtp_start').data('DateTimePicker').date(),
                Temporada: $('#temporada').val(),                
                Notas: $('#notas').val(),
            }
        }


        $.ajax({
            type: 'POST',
            url: '/Tarifa/GuardarTarifa',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            debugger;
            showSuccessMessage('Se ha guardado la tarifa');
            setTimeout(function () {
                window.location = '/Tarifa/TarifaProveedor?proveedor=' + vProveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el tarifario. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    function onClickRegistrarTarifa(e) {
        e.preventDefault();

        var Proveedor = $("#proveedor").val();

        window.location = '/Tarifa/NuevaTarifa?Proveedor=' + Proveedor;
    }

    function onClickRegistrarTarifaDetalle(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;

        //var Tarifa = item.TARIFA;
        //var Proveedor = item.PROVEEDOR;

        window.location = '/TarifaDetalle/NuevaTarifaDetalle?Proveedor=' + item.PROVEEDOR + '&Tarifa=' + item.TARIFA;

    }

    function onClickListarServiciotarifa(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;

        var Tarifa = item.TARIFA;
        var Proveedor = item.PROVEEDOR;

        window.location = '/TarifaDetalleServicio/Index?Proveedor=' + item.PROVEEDOR + '&Tarifa=' + item.TARIFA;

    }


    //*LISTA TARIFA*//
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
                    template.find('#tarifa').html(columns[0].data);
                    template.find('#nombre').html(columns[1].data);
                    template.find('#fechavalidez').html(columns[2].data);
                    template.find('#fechainivigencia').html(columns[3].data);

                    //setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Tarifa/ListadoTarifa?Proveedor=' + vProveedor,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'TARIFA',
        data: 'TARIFA',
        width: 70,
        className: 'not-mobile',
        visible: false,

    },
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 50,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'PROVEEDOR_NOMBRE',
        data: 'PROVEEDOR_NOMBRE',
        width: 50,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 100,
        className: 'not-mobile'
    },

    {
        title: 'FECHA_COMENZAR',
        data: 'FECHA_COMENZAR',
        width: 40,
        className: 'not-mobile'
    },

    {
        title: 'DESCRIPCION',
        data: 'DESCRIPCION',
        width: 40,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'FECHA_INICIO',
        data: 'FECHA_INICIO',
        width: 40,
        className: 'not-mobile'
    },

    {
        title: 'FECHA_FINAL',
        data: 'FECHA_FINAL',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'NOTAS',
        data: 'NOTAS',
        width: 150,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'ESTADO',
        data: 'ESTADO',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'DINAMICO',
        data: 'DINAMICO',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'FECHA_REGISTRO',
        data: 'FECHA_REGISTRO',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'USUARIO_REGISTRO',
        data: 'USUARIO_REGISTRO',
        width: 150,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'FECHA_ULT_MODIF',
        data: 'FECHA_ULT_MODIF',
        width: 150,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'USUARIO_ULT_MODIF',
        data: 'USUARIO_ULT_MODIF',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },


    {
        data: null,
        width: 10,
        className: 'dt-body-center not-mobile',
        render: function (data, type, row, meta) {
            var content = [];
            var CargaServicio = '<button class="btn btn-success RegistrarTarifDetalle" title="Carga Servicio"><i class="glyphicon glyphicon-pencil"></i></button>';
            content.push(CargaServicio);
            return content.join('&nbsp;&nbsp;');
        }
    },

        {
            data: null,
            width: 10,
            className: 'dt-body-center not-mobile',
            render: function (data, type, row, meta) {
                var content = [];
                var VerServicio = '<button class="btn btn-danger ListarServiciotarifa" title="Ver Servicio"><i class="glyphicon glyphicon-eye-open"></i></button>';
                if (data.DINAMICO >= 1) {
                    content.push(VerServicio);
                }
                return content.join('&nbsp;&nbsp;');
            }
        },

        ]
    });

    $('#resultados tbody').on('click', 'button.RegistrarTarifDetalle', onClickRegistrarTarifaDetalle);
    window.onClickRegistrarTarifaDetalle = onClickRegistrarTarifaDetalle;


    $('#resultados tbody').on('click', 'button.ListarServiciotarifa', onClickListarServiciotarifa);
    window.onClickListarServiciotarifa = onClickListarServiciotarifa;

    $('.form-horizontal').on('click', 'button.RegistrarTarifa', onClickRegistrarTarifa);
    window.onClickRegistrarTarifa = onClickRegistrarTarifa;

    $('#btn-guardar').click(onClickGuardarTarifa);




});