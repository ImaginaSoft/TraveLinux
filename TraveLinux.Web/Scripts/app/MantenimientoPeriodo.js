$(function(){
    $('#dtp_start').datetimepicker();
    $('#dtp_end').datetimepicker();
    var Proveedor = $('#proveedor').val();
    var Servicio = $('#servicio').val();

    function onClickCancelarPeriodo() {        

        window.location = '/Tarifa/TarifaProveedor?Servicio=' + Servicio + '&Proveedor=' + Proveedor;

    };


    // Guardar Cliente

    function onClickRegistrarPeriodo() {

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }
        debugger;
        var data = {
            ePeriodo: {
                Proveedor: $('#proveedor').val(),
                Servicio: $('#servicio').val(),
                Descripcion: $('#descripcion').val(),
                Fecha_Inicio: $('#dtp_start').data('DateTimePicker').date(),
                Fecha_Fin: $('#dtp_end').data('DateTimePicker').date(),
                Tipo_Servicio: $('#tiposervicio').val(),
            }
        }


        $.ajax({
            type: 'POST',
            url: '/Periodo/GuardarPeriodo',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el periodo');
            setTimeout(function () {
                window.location = '/Periodo/Index?Servicio=' + Servicio + '&Proveedor=' + Proveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el periodo. Inténtelo de nuevo.');
            enableAllComponents(true);
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
                type: 'column',
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                renderer: function (api, index, columns) {
                    $('div#resultados_wrapper .dataTables_scrollHead').hide();

                    var row = $(api.row(index).node());
                    row.hide();

                    var html = $('#responsive-template').html();
                    var a = document.getElementById('yourlinkId'); //or grab it by tagname etc


                    var template = $(html);
                    template.find('#moneda').html(columns[0].data);
                    template.find('#descripcion').html(columns[1].data);
                    template.find('#valor').html(columns[2].data);
                    template.find('#estado').html(columns[3].data);

                    setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Periodo/ListadoPeriodo?Proveedor=' + Proveedor + '&Servicio=' + Servicio,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'ID_TARIFA',
        data: 'ID_TARIFA',
        width: 125,
        className: 'not-mobile',
        visible : false
    },
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 125,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'SERVICIO',
        data: 'SERVICIO',
        width: 150,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'DESCRIPCION',
        data: 'DESCRIPCION',
        width: 150,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },

    {
        title: 'FECHA_INICIO',
        data: 'FECHA_INICIO',
        width: 40,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },
    {
        title: 'FECHA_FIN',
        data: 'FECHA_FIN',
        width: 40,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },

    {
        title: 'USUARIO_REGISTRO',
        data: 'USUARIO_REGISTRO',        
        width: 150,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },

    //{
    //    data: null,
    //    width: 80,
    //    className: 'dt-body-center not-mobile',
    //    render: function (data, type, row, meta) {
    //        var content = [];

    //        var editar = '<button class="btn btn-success Editar" title="Editar Moneda"><i class="glyphicon glyphicon-pencil"></i></button>';
    //        var eliminar = '<button class="btn btn-danger Eliminar" title="Eliminar Moneda"><i class="glyphicon glyphicon-remove"></i></button>';

    //        content.push(editar);
    //        content.push(eliminar);

    //        return content.join('&nbsp;&nbsp;');
    //    }
    //},

        ]

    });




    $('#btn-guardar').on('click', onClickRegistrarPeriodo);
    $('#btn-cancelar').on('click', onClickCancelarPeriodo);

})
