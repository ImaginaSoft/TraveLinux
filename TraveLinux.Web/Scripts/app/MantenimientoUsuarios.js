$(function () {
   
    $('#proveedor')
        .change(function () {
            $.ajax({
                type: 'GET',
                url: '/Administracion/ObtenerUsuarioPorClaveProveedor',
                data: { proveedor: $(this).val() }
            })
            .done(function (usuario) {
                $('#nombre').val(usuario.Nombre);
                $('#usuario').val(usuario.Usuario);
                $('#password').val(usuario.Password);
            })
            .fail(function () {
                showErrorMessage('No se pudo obtener los datos del usuario');
            });
        })
        .trigger('change');

    $('#guardar').click(function () {
        var data = {
            proveedor: $('#proveedor').val(),
            usuario: $.trim($('#usuario').val()),
            password: $.trim($('#password').val())
        };

        if (!data.usuario || data.usuario.length == 0) {
            showErrorMessage('Debe de ingresar el nombre de usuario');
            return;
        }

        if (!data.password || data.password.length == 0) {
            showErrorMessage('Debe de ingresar la contraseña');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/Administracion/ActualizarCredenciales',
            data: data
        })
        .done(function () {
            showSuccessMessage('Se han actualizado las credenciales del usuario con éxito');
        })
        .fail(function () {
            showErrorMessage('No se pudo actualizar las credenciales del usuario');
        });
    });

});