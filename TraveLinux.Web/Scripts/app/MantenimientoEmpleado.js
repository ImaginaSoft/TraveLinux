$(function () {
   
    $('#empleado')
        .change(function () {
            $.ajax({
                type: 'GET',
                url: '/Administracion/ObtenerUsuarioPorClaveEmpleado',
                data: { empleado: $(this).val() }
            })
            .done(function (usuario) {                
                //$('#password').val(usuario.Usuario);
                $('#password').val(usuario.Password);
            })
            .fail(function () {
                showErrorMessage('No se pudo obtener los datos del usuario');
            });
        })
        .trigger('change');

    
    $('#guardar').click(function () {
        var data = {
            empleado: $('#empleado').val(),
            password: $.trim($('#password').val())
        };       

        if (!data.password || data.password.length == 0) {
            showErrorMessage('Debe de ingresar la contraseña');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/Administracion/ActualizarCredencialesEmpleados',
            data: data
        })
        .done(function () {
            showSuccessMessage('Se han actualizado las credenciales del empleado con éxito');
        })
        .fail(function () {
            showErrorMessage('No se pudo actualizar las credenciales del empleado');
        });
    });

});


