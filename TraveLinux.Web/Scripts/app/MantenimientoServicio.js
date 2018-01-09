$(function(){
    // Guardar servicio

    function onClickRegistrarServicio() {

        var valor = 0;
        var desayuno = 'NO';
        var almuerzo = 'NO';
        var cena = 'NO';

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }

        /*DESAYUNO-ALMUERZO-CENA*/

        if ($('input#Checkboxdesa').is(':checked')) {
            desayuno = 'SI'
        }
        if ($('input#Checkboxalmu').is(':checked')) {
            almuerzo = 'SI'
        }
        if ($('input#Checkboxcena').is(':checked')) {
            cena = 'SI'
        }




        var data = {
            eServicio: {
                //Servicio: $('#servicio').val(),
                Nombre: $('#nombre').val(),
                Tipo: $('#tproveedor').val(),
                Valorxservicio: $('#valorxservicio').val(),
                Valor: $('#valor').val(),
                Duracion: $('#duracion').val(),
                Turno: $('#turno').val(),
                Desayuno: desayuno,
                Almuerzo: almuerzo,
                Cena: cena,
                Desc_Esp: $('#des_esp').val(),
                Desc_Ingl: $('#des_ingles').val(),
                Desc_Port: $('#des_port').val(),
                Estado: valor
            }
        }


        $.ajax({
            type: 'POST',
            url: '/Servicios/GuardarServicio',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el servicio');
            setTimeout(function () {
                window.location = '/Servicios/NuevoServicio';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    $('#btn-guardar').on('click', onClickRegistrarServicio);
});