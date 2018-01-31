$(function () {

    $("#eliminar_email").hide();
    $("#eliminar_fono").hide();
    $("#eliminar_contacto").hide();
    $("#eliminar_posicion").hide();
    $("#eliminar_telefono").hide();

    var max_fields = 3;
    var x = 1;
    var y = 1;

    $("#mostrar_contacto").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (x < max_fields) {
                x++;
                $("#caja_dinamico_contact").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x + '"><p>Name ' + x + ':</p><input class="form-control" id="nombre_contacto' + x + '" placeholder="Enter Name" name="nombre_contacto' + x + '"></div>');

                if (x == 2) {
                    $("#eliminar_contacto").show();
                }
            }
        }

    });


    $('#eliminar_contacto').click(function () {
        debugger;
        if (x != 0) {
            $('#eliminarcajas' + x).remove();
            x = x - 1;
        }
    });


    $("#mostrar_posicion").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (x < max_fields) {
                x++;
                $("#caja_dinamico_contact_2").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x + '"><p>Position ' + x + ':</p><input class="form-control" id="posicion_contacto' + x + '" placeholder="Enter Position" name="posicion_contacto' + x + '"></div>');

                if (x == 2) {
                    $("#eliminar_posicion").show();
                }
            }
        }

    });


    $('#eliminar_posicion').click(function () {
        debugger;
        if (x != 0) {
            $('#eliminarcajas' + x).remove();
            x = x - 1;
        }
    });

    $("#mostrar_telefono").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (x < max_fields) {
                x++;
                $("#caja_dinamico_contact_3").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x + '"><p>Phone ' + x + ':</p><input class="form-control" id="telefono_contacto' + x + '" placeholder="Enter Phone" name="telefono_contacto' + x + '"></div>');

                if (x == 2) {
                    $("#eliminar_telefono").show();
                }
            }
        }

    });


    $('#eliminar_telefono').click(function () {
        debugger;
        if (x != 0) {
            $('#eliminarcajas' + x).remove();
            x = x - 1;
        }
    });



    $("#mostrar_email").click(function (e) {
        e.preventDefault();       
        if ('clicked') {
            if (x < max_fields) {
                x++; 
                $("#caja_dinamico").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x +'"><p>Email ' + x + ':</p><input class="form-control" id="email' + x + '" placeholder="Enter Email" name="email' + x + '"></div>');

                if (x == 2) {                    
                    $("#eliminar_email").show();
                }                
            }
        }

    });    

    $('#eliminar_email').click(function () {
        debugger;
        if (x != 0) {
            $('#eliminarcajas' + x).remove();           
            x = x - 1;
        }
    });


    $("#mostrar_fono").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (y < max_fields) {
                y++;
                $("#caja_dinamico_2").append('<div class="col-xs-12 col-sm-3 col-md-3" id ="eliminarcajas_2' + y + '"><p>Phone ' + y + ':</p><input class="form-control" id="telefono' + y + '" placeholder="Enter Fono" name="telefono' + x + '"></div>');

                if (y == 2) {
                    $("#eliminar_fono").show();
                }
            }
        }

    });

    $('#eliminar_fono').click(function () {
        debugger;
        if (y != 0) {
            $('#eliminarcajas_2' + y).remove();
            y = y - 1;
        }
    });




    $('#pais').on('change', function () {

        var Pais = $(this).val();
        $select = $('#departamentos');
        $.ajax({
            type: 'POST',
            url: '/Cliente/ListadoDepartamento',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Pais: Pais }),
            success: function (data) {
                debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option id="' + val.DEPARTAMENTO + '">' + val.NOMBRE + '</option>');

                    })
                    $select.selectpicker('refresh');
                }
                else {
                    //$select.append('<option>No hay Distritos</option>');
                    $select.html('');

                }

            },
        })
    });


    function renderTextColor(data, type, row, meta) {
        var text = data.toUpperCase();
        var template = $('<span>');
        if (text.indexOf('ESTADO') == 'ACTIVO') {
            template.css('color', 'red').html(data);
        } else {
            template.css('color', 'green').html(data);
        }
        return $('<div>').append(template).html();
       
    }

    // Guardar Proveedor

    
    function onClickVerTarifa(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        //alert(item.PROVEEDOR);

        debugger;
        window.location = '/Tarifa/TarifaProveedor?Proveedor=' + item.PROVEEDOR;        
    }

    function onClickCancelarProveedor(e) {
        e.preventDefault();       
        
        window.location = '/Proveedor/Index';
    }
    
    function onClickVerServicio(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        //alert(item.PROVEEDOR);
        
        debugger;
        window.location = '/Servicios/ServicioProveedor?Proveedor=' + item.PROVEEDOR;
    }


    function onClickRegistrarProveedor() {

        debugger;

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }

        var data = {
            eProveedor: {                
                Nombre: $('#nombre').val(),
                Alias: $('#alias').val(),
                Tproveedor: $('#tproveedor').val(),
                Tipo: $('#radio').val(),
                pais: $('#pais').val(),
                Ciudad: $('#departamentos').val(),
                Direccion: $('#direccion').val(),
                PaginaWeb: $('#paginaweb').val(),
                ruc: $('#ruc').val(),
                Idioma: $('#idioma').val(),
                Email_1: $('#email1').val(),
                Email_2: $('#email2').val(),
                Email_3: $('#email3').val(),
                Telefono_1: $('#telefono1').val(),
                Telefono_2: $('#telefono2').val(),
                Telefono_3: $('#telefono3').val(),
                Estado: valor,
                Nombre_contacto_1: $('#nombre_contacto').val(),
                Nombre_contacto_2: $('#nombre_contacto2').val(),
                Nombre_contacto_3: $('#nombre_contacto3').val(),
                Posicion_contacto_1: $('#posicion_contacto').val(),
                Posicion_contacto_2: $('#posicion_contacto2').val(),
                Posicion_contacto_3: $('#posicion_contacto3').val(),
                Telefono_contacto_1: $('#telefono_contacto').val(),
                Telefono_contacto_2: $('#telefono_contacto2').val(),
                Telefono_contacto_3: $('#telefono_contacto3').val()

            }
        };

        //if (data.Nombre == null) {
        //    showErrorMessage('Debe ingresar un nombre');
        //    return;
        //}


        $.ajax({
            type: 'POST',
            url: '/Proveedor/GuardarProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el proveedor');
            setTimeout(function () {
                window.location = '/Proveedor/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el proveedor. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }


    function onClickActualizarProveedor() {

        debugger;

        var valor = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }

        var data = {
            eProveedor: {
                Proveedor: $('#proveedor').val(),
                Nombre: $('#nombre').val(),
                Alias: $('#alias').val(),
                Tproveedor: $('#tproveedor').val(),
                Tipo: $('#radio').val(),
                pais: $('#pais').val(),
                Ciudad: $('#departamentos').val(),
                Direccion: $('#direccion').val(),
                PaginaWeb: $('#paginaweb').val(),
                ruc: $('#ruc').val(),
                Idioma: $('#idioma').val(),
                Email_1: $('#email1').val(),
                Email_2: $('#email2').val(),
                Email_3: $('#email3').val(),
                Telefono_1: $('#telefono1').val(),
                Telefono_2: $('#telefono2').val(),
                Telefono_3: $('#telefono3').val(),
                Estado: valor,
                Nombre_contacto_1: $('#nombre_contacto').val(),
                Nombre_contacto_2: $('#nombre_contacto2').val(),
                Nombre_contacto_3: $('#nombre_contacto3').val(),
                Posicion_contacto_1: $('#posicion_contacto').val(),
                Posicion_contacto_2: $('#posicion_contacto2').val(),
                Posicion_contacto_3: $('#posicion_contacto3').val(),
                Telefono_contacto_1: $('#telefono_contacto').val(),
                Telefono_contacto_2: $('#telefono_contacto2').val(),
                Telefono_contacto_3: $('#telefono_contacto3').val()
            }
        };

        //if (data.Nombre == null) {
        //    showErrorMessage('Debe ingresar un nombre');
        //    return;
        //}


        $.ajax({
            type: 'POST',
            url: '/Proveedor/ActualizarProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha actualizado el proveedor');
            setTimeout(function () {
                window.location = '/Proveedor/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo actualizar el proveedor. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    //*LISTA PROVEEDOR*//
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
                    template.find('#proveedor').html(columns[0].data);
                    template.find('#nombre').html(columns[1].data);
                    template.find('#alias').html(columns[2].data);
                    template.find('#ruc').html(columns[10].data);
                    template.find('#idioma').html(columns[8].data);                    
                    //template.find('#estado').html(columns[11].data);
                    setTextColor(template, '#estado', columns[11].data);
                    //setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Proveedor/ListadoProveedor',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        data: null,
        width: 30,
        defaultContent: '',
        className: 'select-checkbox',
        orderable: false
    },
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 70,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 110,
        className: 'not-mobile'
    },

    {
        title: 'ALIAS',
        data: 'ALIAS',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'TIPO PROVEEDOR',
        data: 'TPROVEEDOR',
        width: 70,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'TIPO',
        data: 'TIPO',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'PAIS',
        data: 'PAIS',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'CIUDAD',
        data: 'CIUDAD',
        width: 70,
        className: 'not-mobile'
    },

    {
        title: 'DIRECCION',
        data: 'DIRECCION',
        width: 150,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'PAGINA WEB',
        data: 'PAGINAWEB',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'RUC',
        data: 'RUC',
        width: 125,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'IDIOMA',
        data: 'IDIOMA',
        width: 70,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'ESTADO',
        data: 'ESTADO',
        width: 20,
        className: 'not-mobile',
        visible: true,
        render: renderTextColor
    },

   
    {
        data: null,
        width: 80,
        className: 'dt-body-center not-mobile',
        render: function (data, type, row, meta) {
            var content = [];

            var CrearServicio = '<button class="btn btn-success btn-VerServicio" title="Ver Servicio"><i class="fa fa-file-excel-o"></i></button>';
            //var CrearTarifa = '<button class="btn btn-danger btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';
            

            content.push(CrearServicio);
            //content.push(CrearTarifa);
            //content.push(eliminar);

            return content.join('&nbsp;&nbsp;');
        }
    },

        ],
        columnDefs: [{
            orderable: false,
            className: 'select-checkbox',
            targets: 0
        }],

        select: {
            style: 'os',
            selector: 'td:first-child'
        },

    });

    grid.on('select', function (e, dt, type, indexes) {
        var items = dt.rows({ selected: true }).data().toArray();
        window.location = '/Proveedor/EditarProveedor?Proveedor=' + items[0]["PROVEEDOR"];

    });

    $('#btn-guardar').on('click', onClickRegistrarProveedor);
    $('#btn-actualizar').on('click', onClickActualizarProveedor);
    $('#btn-cancelar').on('click', onClickCancelarProveedor);
    $('#resultados tbody').on('click', 'button.btn-VerTarifa', onClickVerTarifa);
    $('#resultados tbody').on('click', 'button.btn-VerServicio', onClickVerServicio);

    window.onClickVerTarifa = onClickVerTarifa;
    window.onClickVerServicio = onClickVerServicio;      







    /*VALIDAR CAMPOS FORMULARIOS*/
    $("#signupForm1").validate({
        rules: {
            nombre: "required",
            alias: "required",
            //direccion: "required",
            //paginaweb: "required",
            ruc: "required",
            //tproveedor: "required",
            username1: {
                required: true,
                minlength: 2
            },
            tproveedor: {
                required: true
            },
            ruc: {
                required: true,
                digits: true,
                //maxlength: 13,
                //minlength: 13
            },

            telefono1: {
                required: true,
                digits: true,
                minlength: 7
            },
            telefono2: {
                required: true,
                digits: true,
                minlength: 7
            },
            telefono3: {
                required: true,
                digits: true,
                minlength: 7
            },

            password1: {
                required: true,
                minlength: 5
            },
            confirm_password1: {
                required: true,
                minlength: 5,
                equalTo: "#password1"
            },
            email1: {
                required: true,
                email: true
            },
            email2: {
                required: true,
                email: true
            },
            email3: {
                required: true,
                email: true
            },
            agree1: "required"
        },
        messages: {
            nombre: "Please enter your name",
            alias: "Please enter your alias",
            //direccion: "Please enter your lastname",
            //paginaweb: "Please enter your WebSite",            
            ruc: {
                required: "Please enter only digits",
                //minlength: "Please enter minim 13 digits"
            },

            telefono1: {
                required: "Please enter only digits",
                minlength: "Please enter minim 7 digits"
            },

            telefono2: {
                required: "Please enter only digits",
                minlength: "Please enter minim 7 digits"
            },
            telefono3: {
                required: "Please enter only digits",
                minlength: "Please enter minim 7 digits"
            },

            email1: "Please enter a valid email address",
            email2: "Please enter a valid email address",
            email3: "Please enter a valid email address",
            tproveedor: "Please selected a services type",
            agree1: "Please accept our policy"
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents(".col-sm-5").addClass("has-feedback");
            element.parents(".col-sm-3").addClass("has-feedback"); //add to email

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("span")[0]) {
                $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
        },
        success: function (label, element) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!$(element).next("span")[0]) {
                $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");

            $(element).parents(".col-sm-3").addClass("has-error").removeClass("has-success"); //add to email
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");

            $(element).parents(".col-sm-3").addClass("has-success").removeClass("has-error"); //add to email
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        }
    }),

    $('#signupForm1 input').on('keyup blur', function () {
        if ($('#signupForm1').valid()) {
            $('button#btn-guardar').prop('disabled', false);
        } else {
            $('button#btn-guardar').prop('disabled', 'disabled');
        }
    });
});