$(function () {        

    var proveedor_codigo = $("input#proveedor_codigo").val();
    var tarifa_codigo = $("input#tarifa_codigo").val();

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
            type: "POST",
            url: "/TarifaDetalle/GuardarTarifaDetalle",
            data: JSON.stringify(lsttarifas),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (r) {
                alert(r + " record(s) inserted.");
            }
        });
    };


});