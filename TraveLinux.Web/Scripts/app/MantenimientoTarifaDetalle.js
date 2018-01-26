$(function () {        
    
    var proveedor_codigo = $("input#proveedor_codigo").val();
    var tarifa_codigo = $("input#tarifa_codigo").val();

    var proveedor_codigo1 = $("input#provicodi").val();
    var tarifa_codigo2 = $("input#taricodi").val();
    var editor;


    //editor = new $.fn.dataTable.Editor({
    //    url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + proveedor_codigo1 + '&Tarifa=' + tarifa_codigo2,
    //    table: "#resultados",
    //    fields: [{
    //        label: "First name:",
    //        name: "first_name"
    //    }, {
    //        label: "Last name:",
    //        name: "last_name"
    //    }, {
    //        label: "Position:",
    //        name: "position"
    //    }, {
    //        label: "Office:",
    //        name: "office"
    //    }, {
    //        label: "Extension:",
    //        name: "extn"
    //    }, {
    //        label: "Start date:",
    //        name: "start_date",
    //        type: "datetime"
    //    }, {
    //        label: "Salary:",
    //        name: "salary"
    //    }
    //    ]
    //});




    $('#resultados').on('click', 'tbody td:not(:first-child)', function (e) {
        editor.inline(this);
    });



























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


                    //var template = $(html);
                    //template.find('#moneda').html(columns[0].data);
                    //template.find('#descripcion').html(columns[1].data);
                    //template.find('#valor').html(columns[2].data);
                    //template.find('#estado').html(columns[3].data);

                    //setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            //url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + 'PROV00011' + '&Tarifa=' + 'TAR00014',
            url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + proveedor_codigo1 + '&Tarifa=' + tarifa_codigo2,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 125,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'TARIFA',
        data: 'TARIFA',
        width: 125,
        className: 'not-mobile',
        visible: false
    },
    {
        title: 'SERVICIO',
        data: 'SERVICIO',
        width: 150,
        className: 'not-mobile'
    },
    {
        title: 'DESCRIPCION',
        data: 'DESCRIPCION',
        width: 150,
        className: 'not-mobile'
    },
    {
        title: 'RANGO_DEL',
        data: 'RANGO_DEL',
        width: 150,
        className: 'not-mobile'
    },
    {
        title: 'RANGO_AL',
        data: 'RANGO_AL',
        width: 150,
        className: 'not-mobile'
    },
    {
        title: 'PRECIO',
        data: 'PRECIO',
        width: 150,
        className: 'not-mobile'

    },
        ],
        select: {
        style:    'os',
        selector: 'td:first-child'
},
    });




    $('#btn-guardar').on('click', onClickRegistrarTarifa);

    function onClickRegistrarTarifa() {

        var lsttarifas = new Array();
        $("#tblCustomers TBODY TR").each(function () {

            var row = $(this);
            var lsttarifa = {};            

            lsttarifa.PROVEEDOR = proveedor_codigo;
            lsttarifa.TARIFA = tarifa_codigo;
            lsttarifa.SERVICIO = row.find("TD").eq(0).html();
            lsttarifa.DESCRIPCION = row.find("TD").eq(1).html();
            lsttarifa.RANGO_DEL = row.find("TD").eq(2).html();
            lsttarifa.RANGO_AL = row.find("TD").eq(3).html();
            lsttarifa.PRECIO = row.find("TD").eq(4).html();
            lsttarifas.push(lsttarifa);
        });
        debugger;
        //Send the JSON array to Controller using AJAX.
        $.ajax({
            type: 'POST',
            url: '/TarifaDetalle/GuardarTarifaDetalle',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lsttarifas)
        })
            .done(function (data) {
            debugger;
            showSuccessMessage('Se ha guardado con exito');
            setTimeout(function () {              
                window.location = window.location = '/Tarifa/TarifaProveedor?Proveedor=' + proveedor_codigo;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar.');
            enableAllComponents(true);
        });
    };


    $("#boton_validar").click(function () {
        alert("guardando");
        $("#btn-guardar").trigger("click");
    });

    

   
});