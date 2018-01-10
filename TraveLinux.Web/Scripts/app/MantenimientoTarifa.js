$(function () {
    //$('#dtp_start').datetimepicker();
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
                Fecha_Inicio: $('#dtp_beginning').data('DateTimePicker').date(),
                Fecha_Final: $('#dtp_ending').data('DateTimePicker').date(),
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

        alert("Hola");

        //alert(item.PROVEEDOR);

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
        className: 'not-mobile'
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
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'FECHA_COMENZAR',
        data: 'FECHA_COMENZAR',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'FECHA_INICIO',
        data: 'FECHA_INICIO',
        width: 70,
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

    debugger;
    $('#resultados tbody').on('click', 'button.RegistrarTarifDetalle', onClickRegistrarTarifaDetalle);
    window.onClickRegistrarTarifaDetalle = onClickRegistrarTarifaDetalle;


    $('#resultados tbody').on('click', 'button.ListarServiciotarifa', onClickListarServiciotarifa);
    window.onClickListarServiciotarifa = onClickListarServiciotarifa;

    $('.form-horizontal').on('click', 'button.RegistrarTarifa', onClickRegistrarTarifa);
    window.onClickRegistrarTarifa = onClickRegistrarTarifa;

    $('#btn-guardar').click(onClickGuardarTarifa);




});