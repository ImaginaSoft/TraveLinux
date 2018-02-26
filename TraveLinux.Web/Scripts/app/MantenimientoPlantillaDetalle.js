$(function () {

    
    

    // Guardar Detalle Plantilla

    function onClickRegistrarDetallePlantilla() {

        //var valor = 0;

        //if ($('input#inlineCheckbox1').is(':checked')) {
        //    valor = 1
        //}
        //else {
        //    valor = 0
        //}
        //debugger;
        var data = {
            ePlantillaDetalle: {
                Id_Plantilla: $('#id_plantilla').val(),
                Servicio: $('#servicio').val(),
                Proveedor: $('#proveedor').val(),
                // Cant_Dias: $('#dtp_start').val(),
                Tipo_Servicio: $('#tiposervicio').val(),
                Tipo_Acomodacion: $('#tipoacco').val()
                //Estado: $('#tiposervicio').val(),
                // Precio_Total: $('#tiposervicio').val(),

            }
        }


        $.ajax({
            type: 'POST',
            url: '/Plantilla/GuardarPlantillaDetalle',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el detalle de la plantilla');
            setTimeout(function () {
                window.location = '/Plantilla/CrearPlantillaDetalle?Plantilla=' + Id_Plantilla;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el detalle de la plantillas. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }


    $('#btn-guardar-detalle').on('click', onClickRegistrarDetallePlantilla);



    var grid = $('#detalleplantilla').DataTable({
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
            url: '/Plantilla/ListadoDetallePlantilla?Plantilla=' + Id_Plantilla,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'ID_PLANTILLA',
        data: 'ID_PLANTILLA',
        width: 125,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'SERVICIO',
        data: 'SERVICIO',
        width: 125,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 150,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'TIPO_SERVICIO',
        data: 'TIPO_SERVICIO',
        width: 150,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },

    {
        title: 'TIPO_ACOMODACION',
        data: 'TIPO_ACOMODACION',
        width: 40,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },
    //{
    //    title: 'FECHA_FIN',
    //    data: 'FECHA_FIN',
    //    width: 40,
    //    className: 'not-mobile',
    //    //render: renderTextColor
    //    visible: true,
    //},

    //{
    //    title: 'USUARIO_REGISTRO',
    //    data: 'USUARIO_REGISTRO',
    //    width: 150,
    //    className: 'not-mobile',
    //    //render: renderTextColor
    //    visible: true,
    //},

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


    //$('#detalleplantilla tbody').on('click', 'button.btn-guardar-detalle', onClickRegistrarDetallePlantilla);



    //$('#btn-guardar-detalle').on('click', onClickRegistrarDetallePlantilla);


});