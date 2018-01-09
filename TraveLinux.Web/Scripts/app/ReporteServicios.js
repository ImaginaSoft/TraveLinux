
$(function () {

    function onClickGuardar() {
        var data = {
            file: $('#file').val(),
            proveedor: $('#proveedor').val(),
            consecutivo: $('#consecutivo').val(),
            reporte: {
                Usuario: $('#usuario').html(),
                Email: $('#email').html(),
                Ciudad: $('#ciudad').val(),
                NroFile: $('#nro-file').html(),
                SubFile: $('#sub-file').html(),
                TipoServicio: $('#tipo-servicio').html(),
                FechaServicio: $('#fecha-servicio').html(),
                HoraRecojo: $('#hora-recojo').data('DateTimePicker').date(),
                Pax: $('#pax').val(),
                NroPax: $('#nro-pax').val(),
                Reporte: $.trim($('#reporte').val()),
                Vuelo: $('#vuelo').val(),
                CantMaletas: $('#cant-maletas').val(),
                CarroBus: $('#carro-bus').val(),
                Chofer: $('#chofer').val(),
                Hotel: $('#hotel').val(),
                NroHabitacion: $('#nro-habitacion').val(),
                Incidencia: $('#incidencia').is(':checked')
            }
        };

        if (!data.reporte.HoraRecojo) {
            showErrorMessage('Debe ingresar una hora de recojo');
            return;
        }

        if (!data.reporte.Reporte || data.reporte.Reporte.length == 0) {
            showErrorMessage('Debe ingresar el reporte');
            return;
        }

        data.reporte.HoraRecojo = data.reporte.HoraRecojo.format('HH:mm');

        enableAllComponents(false);

        $.ajax({
            type: 'POST',
            url: '/Reportes/GuardarReporteServicios',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el reporte con éxito y se envió una copia a su correo electrónico.');
            setTimeout(function () {
                window.location = '/Servicios/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el reporte. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    function onClickCancelar() {
        showConfirmDialog('¿Está seguro de cancelar los cambios en el reporte?', function (value) {
            if (value) {
                window.location = '/Servicios/Index';
            }
        });
    }

    function clearAllComponents() {
        $('#usuario').val('');
        $('#email').val('');
        $('#nro-file').val('');
        $('#sub-file').val('');
        $('#tipo-servicio').val('');
        $('#fecha-servicio').val('');
        $('#hora-recojo').data('DateTimePicker').clear();
        $('#pax').val('');
        $('#nro-pax').val('');
        $('#reporte').val('');
        $('#vuelo').val('');
        $('#cant-maletas').val('');
        $('#carro-bus').val('');
        $('#chofer').val('');
        $('#hotel').val('');
        $('#nro-habitacion').val('');
        $('#incidencia').prop('checked', false);
    }

    function enableAllComponents(value) {
        $('#usuario').prop('disabled', !value);
        $('#email').prop('disabled', !value);
        $('#nro-file').prop('disabled', !value);
        $('#sub-file').prop('disabled', !value);
        $('#tipo-servicio').prop('disabled', !value);
        $('#fecha-servicio').prop('disabled', !value);
        if (value) $('#hora-recojo').data('DateTimePicker').enable();
        else $('#hora-recojo').data('DateTimePicker').disable();
        $('#pax').prop('disabled', !value);
        $('#nro-pax').prop('disabled', !value);
        $('#reporte').prop('disabled', !value);
        $('#vuelo').prop('disabled', !value);
        $('#cant-maletas').prop('disabled', !value);
        $('#carro-bus').prop('disabled', !value);
        $('#chofer').prop('disabled', !value);
        $('#hotel').prop('disabled', !value);
        $('#nro-habitacion').prop('disabled', !value);
        $('#incidencia').prop('disabled', !value);
    }

    $('#nro-pax, #cant-maletas').keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode == 67 && e.ctrlKey === true) ||
            (e.keyCode == 88 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#hora-recojo').datetimepicker({
        format: 'HH:mm'
    });

    $('#btn-guardar').click(onClickGuardar);
    $('#btn-cancelar').click(onClickCancelar);

});