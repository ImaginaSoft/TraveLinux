    $.noty.defaults = {
        layout: 'topCenter',
        theme: 'defaultTheme', // or 'relax'
        type: 'alert',
        text: '', // can be html or string
        dismissQueue: true, // If you want to use queue feature set this true
        template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation: {
            open: { height: 'toggle' }, // or Animate.css class names like: 'animated bounceInLeft'
            close: { height: 'toggle' }, // or Animate.css class names like: 'animated bounceOutLeft'
            easing: 'swing',
            speed: 500 // opening & closing animation speed
        },
        timeout: false, // delay for closing event. Set false for sticky notifications
        force: false, // adds notification to the beginning of queue when set to true
        modal: false,
        maxVisible: 5, // you can set max visible notification for dismissQueue true option,
        killer: false, // for close all notifications before show
        closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
        callback: {
            onShow: function () { },
            afterShow: function () { },
            onClose: function () { },
            afterClose: function () { },
            onCloseClick: function () { }
        },
        buttons: false // an array of buttons
    };

    $.extend($.fn.dataTable.defaults, {
        language: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    function showInfoMessage(message) {
        showNotyMessage(message, 'information', 3000);
    }

    function showSuccessMessage(message) {
        showNotyMessage(message, 'success', 3000);
    }

    function showErrorMessage(message) {
        showNotyMessage(message, 'error', 5000);
    }

    function showWarningMessage(message) {
        showNotyMessage(message, 'warning', 5000);
    }

    function showNotyMessage(message, type, timeout) {
        noty({ text: '<strong style="font-size: 15px;">' + message + '</strong>', type: type, timeout: timeout });
    }

    function showInputDialog(options) {
        noty({
            text: '<span> ' + options.message + '</span></br><div><span style="text-align: left;">Nro. de Recibo</span><textarea placeholder="Escriba el número de recibo para la liquidación" rows="2" style="width: 100%; margin-top: 10px; resize: none;" class="noty_input_area"></textarea></div>',
            type: 'confirm',
            dismissQueue: false,
            layout: 'center',
            theme: 'defaultTheme',
            modal: true,
            buttons: $.map(options.buttons, function (button) {
                return {
                    addClass: button.className,
                    text: button.text,
                    onClick: function ($noty) {
                        var value = $noty.$message.find('.noty_input_area').val();
                        button.callback && button.callback($noty, value);
                    }
                };
            })
        });
    }

    function showConfirmDialog(message, callback) {
        noty({
            text: message,
            type: 'confirm',
            dismissQueue: false,
            layout: 'center',
            theme: 'defaultTheme',
            modal: true,
            buttons: [
                {
                    addClass: 'btn btn-primary',
                    text: 'Aceptar',
                    onClick: function ($noty) {
                        $noty.close();
                        callback && callback(true);
                    }
                },
                {
                    addClass: 'btn btn-default',
                    text: 'Cancelar',
                    onClick: function ($noty) {
                        $noty.close();
                        callback && callback(false);
                    }
                }
            ]
        });
    }

    function showWaitDialog() {
        if (typeof $.blockUI !== 'undefined') {
            $.blockUI({
                message: '<h3><img src="/Content/img/default.gif" /> Espere un momento...</h3>',
                css: { fadeOut: 100, border: '3px solid #3f51b5' }
            });
        }
    }

    function removeWaitDialog() {
        if (typeof $.unblockUI !== 'undefined') {
            $.unblockUI();
        }
    }

    $(document).ajaxStart(showWaitDialog).ajaxStop(removeWaitDialog);

    $.ajaxSetup({
        statusCode: {
            401: function () {
                showErrorMessage('La sesión ha caducado. Por favor inicie sesión nuevamente.');
            },
            403: function () {
                showErrorMessage('No tiene permisos para ejecutar esta acción.');
            }
        },
        cache: false
    });