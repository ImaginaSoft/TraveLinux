$(function () {
    var Proveedor = $("#proveedor").val();

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
                    $.each(data, function (i, val) {
                        $select.append('<option value="' + val.DEPARTAMENTO + '">' + val.NOMBRE + '</option>');

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

    //Funcion para deshabilitar las opciones de valoracion por servicio
    $(document).ready(function () {
        $('#valor').attr('disabled', 'disabled');
        $('select[name="valorxservicio"]').on('change', function () {
            var others = $(this).val();
            if (others == "MTF" || others == "PVT") {
                $('#valor').removeAttr('disabled');
            } else {
                $('#valor').attr('disabled', 'disabled');
            }

        });
    });


    //*VER TARIFA*//
    function onClickVerTarifa(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        //alert(item.PROVEEDOR);

        debugger;
        window.location = '/Tarifa/TarifaProveedor?Servicio=' + item["SERVICIO"] + '&Proveedor=' + item["PROVEEDOR"];
    }


    //*Eliminar TARIFA*//
    function onClickEliminarServicio(e) {
        e.preventDefault();
        debugger;
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;
        //var Servicio = item.SERVICIO;


        $.ajax({
            type: 'POST',
            url: '/Servicios/EliminarServicio',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Servicio: item.SERVICIO, Proveedor: Proveedor }),
        })
        .done(function (data) {
            showSuccessMessage('Se ha eliminado el servicio');
            setTimeout(function () {
                window.location = '/Servicios/ServicioProveedor?Proveedor=' + Proveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo borrar el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });

    }




    //*LISTA CLIENTE*//
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

                    //setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Servicios/ListadoServicioxProveedor?Proveedor=' + Proveedor,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        data: null,
        width: 20,
        defaultContent: '',
        className: 'select-checkbox',
        orderable: false
    },
    {
        title: 'PROVEEDOR',
        data: 'PROVEEDOR',
        width: 20,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'PROVEEDOR_NOMBRE',
        data: 'PROVEEDOR_NOMBRE',
        width: 20,
        className: 'not-mobile',
        visible: false,
    },

    {
        title: 'SERVICIO',
        data: 'SERVICIO',
        width: 20,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 25,
        className: 'not-mobile',
        visible: true,
    },

     {
         title: 'CIUDAD',
         data: 'CIUDAD_NOMBRE',
         width: 25,
         className: 'not-mobile',
         visible: true,
     },

        {
            title: 'TIPO SERVICIO',
            data: 'TIPO_SERVICIO_NOMBRE',
            width: 25,
            className: 'not-mobile',
            visible: true,
        },

    //{
    //    title: 'BOX_LUNCH',
    //    data: 'BOX_LUNCH',
    //    width: 25,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'ESTADO',
    //    data: 'ESTADO',
    //    width: 20,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'NOMBRE',
    //    data: 'NOMBRE',
    //    width: 25,
    //    className: 'not-mobile'
    //},

    //{
    //    title: 'BOX_LUNCH',
    //    data: 'BOX_LUNCH',
    //    width: 25,
    //    className: 'not-mobile',
    //    visible: true,
    //},
    //{
    //    title: 'AEROLINEA',
    //    data: 'AEROLINEA',
    //    width: 25,
    //    className: 'not-mobile',
    //    visible: true,
    //},

    //{
    //    title: 'RUTA',
    //    data: 'RUTA',
    //    width: 25,
    //    className: 'not-mobile',
    //    visible: true,
    //},

    //{
    //    title: 'TIPO_PERSONA',
    //    data: 'TIPO_PERSONA',
    //    width: 25,
    //    className: 'not-mobile',
    //    visible: true,
    //},

    {
        data: null,
        width: 80,
        className: 'dt-body-center not-mobile',
        render: function (data, type, row, meta) {
            var content = [];

            //var CrearServicio = '<button class="btn btn-danger btn-VerServicio" title="Ver Servicio"><i class="fa fa-eye" aria-hidden="true"></i></button>';
            var EliminarServicio = '<button class="btn btn-danger btn-EliminarServicio" title="Eliminar Servicio"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';
            var CrearTarifa = '<button class="btn btn-success btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';
            var CrearServicio = '<button class="btn btn-danger btn-VerServicio" title="Ver Servicio"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';


            
            content.push(CrearTarifa);
            content.push(EliminarServicio);
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

    debugger
    grid.on('select', function (e, dt, type, indexes) {
        debugger
        var items = dt.rows({ selected: true }).data().toArray();
        window.location = '/Servicios/EditarServicio?Servicio=' + items[0]["SERVICIO"] + '&Proveedor=' + items[0]["PROVEEDOR"];
    });




    // Cancelar proveedor
    function onClickCancelarServicio(e) {
        e.preventDefault();

        window.location = '/Servicios/ServicioProveedor?Proveedor=' + Proveedor;
    }

    //Actualizar servicio

    function onClickActualizarServicio() {

        var valor = 'N';
        var desayuno = 0;
        var almuerzo = 0;
        var cena = 0;

        var checkcli, checkprov, checkprecio='N'

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 'S'
        }
        else {
            valor = 'N'
        }

        /*DESAYUNO-ALMUERZO-CENA*/

        if ($('input#Checkboxdesa').is(':checked')) {
            desayuno = 1
        } else {
            desayuno = 0
        }
        if ($('input#Checkboxalmu').is(':checked')) {
            almuerzo = 1
        } else {
            almuerzo = 0

        }
        if ($('input#Checkboxcena').is(':checked')) {
            cena = 1
        } else {
            cena = 0
        }


        if ($('input#clienteCheckbox').is(':checked')) {
            checkcli = 'S'
        }
        else {
            checkcli = 'N'
        }

        if ($('input#proveedorCheckbox').is(':checked')) {
            checkprov = 'S'
        }
        else {
            checkprov = 'N'
        }

        if ($('input#precioCheckbox').is(':checked')) {
            checkprecio = 'S'
        }
        else {
            checkprecio = 'N'
        }




        var data = {
            eServicio: {
                Proveedor: $('#proveedor').val(),
                Servicio: $('#servicio').val(),
                Nombre: $('#nombre').val(),
                Tipo: $('#tipo').val(),
                Valorxservicio: $('#valorxservicio').val(),
                Valor: $('#valor').val(),
                Duracion: $('#duracion').val(),
                Turno: $('#turno').val(),
                Desayuno: desayuno,
                Almuerzo: almuerzo,
                Cena: cena,
                Vista_cliente: checkcli,
                Vista_proveedor: checkprov,
                Precio_obligatorio: checkprecio,
                Aerolinea: $('#aerolinea').val(),
                Box_Lunch: $('#boxlunch').val(),
                Ruta: $('#ruta').val(),
                Descripcion: $('#descripcion').val(),
                Tipo_Servicio: $('#tproveedor').val(),
                Tipo_Persona: $('#tipopersona').val(),
                Desc_Esp: $('#des_esp').val(),
                Desc_Ingl: $('#des_ingles').val(),
                Desc_Port: $('#des_port').val(),
                Desc_Ale: $('#des_ale').val(),
                Estado: valor,
                Ciudad: $('#departamentos').val(),
                Hora: $('#time').val(),
                Hora_fin: $('#time_end').val()

            }
        }


        $.ajax({
            type: 'POST',
            url: '/Servicios/ActualizarServicio',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha actualizado el servicio');
            setTimeout(function () {
                window.location = window.location = '/Servicios/ServicioProveedor?proveedor=' + Proveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se ha actualizado el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });

    }


    // Guardar carga servicio

    function onClickGuardarCargaServicio() {

        var lstServicios = new Array();
        $("#tblCustomers TBODY TR").each(function () {
            debugger;
            var row = $(this);
            var lstServicio = {};

            lstServicio.PROVEEDOR = Proveedor;

            lstServicio.NOMBRE = row.find("TD").eq(0).html();
            lstServicio.DESC_ESP = row.find("TD").eq(1).html();
            lstServicio.DESC_INGL = row.find("TD").eq(2).html();
            lstServicio.DESC_PORT = row.find("TD").eq(3).html();
            lstServicio.DESC_ALE = row.find("TD").eq(4).html();
            lstServicio.DESCRIPCION = row.find("TD").eq(5).html();
            lstServicio.TIPO_SERVICIO = row.find("TD").eq(6).html(); /*CODIGO GENERADO*/
            //lstServicio.TIPO_PERSONA = row.find("TD").eq(7).html();
            lstServicio.DESAYUNO = row.find("TD").eq(7).html();
            lstServicio.ALMUERZO = row.find("TD").eq(8).html();
            lstServicio.CENA = row.find("TD").eq(9).html();
            //lstServicio.BOX_LUNCH = row.find("TD").eq(10).html();
            //lstServicio.AEROLINEA = row.find("TD").eq(10).html();
            //lstServicio.RUTA = row.find("TD").eq(11).html();
            lstServicio.RESUMEN = row.find("TD").eq(10).html();
            lstServicio.INICIO_SERVICIO = row.find("TD").eq(11).html();
            lstServicio.FIN_SERVICIO = row.find("TD").eq(12).html();
            lstServicio.VISTA_PROVEEDOR = row.find("TD").eq(13).html();
            lstServicio.VISTA_CLIENTE = row.find("TD").eq(14).html();
            lstServicio.CIUDAD = row.find("TD").eq(15).html();
            lstServicios.push(lstServicio);
        });


        $.ajax({
            type: 'POST',
            url: '/Servicios/GuardarServicioCarga',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lstServicios)
        })
            .done(function (data) {
                debugger;
                showSuccessMessage('Se ha guardado con exito');
                setTimeout(function () {
                    window.location = '/Servicios/ServicioProveedor?proveedor=' + Proveedor;
                }, 2000);
            })
        .fail(function () {
            showErrorMessage('No se pudo guardar.');
            enableAllComponents(true);
        });
    };




    // Guardar servicio

    function onClickRegistrarServicio(e) {
        e.preventDefault();
        window.location = '/Servicios/NuevoServicio?Proveedor=' + Proveedor;
    }

    function onClickCargaServicio(e) {
        e.preventDefault();
        debugger;
        window.location = '/Servicios/CargaServicio?Proveedor=' + Proveedor;
    }




    function onClickGuardarServicio() {

        var valor = 'N';
        var desayuno = 0;
        var almuerzo = 0;
        var cena = 0;
        var checkcli, checkprov, checkprecio = 'N';

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 'S'
        }
        else {
            valor = 'N'
        }


        if ($('input#clienteCheckbox').is(':checked')) {
            checkcli = 'S'
        }
        else {
            checkcli = 'N'
        }

        if ($('input#proveedorCheckbox').is(':checked')) {
            checkprov = 'S'
        }
        else {
            checkprov = 'N'
        }

        if ($('input#precioCheckbox').is(':checked')) {
            checkprecio = 'S'
        }
        else {
            checkprecio = 'N'
        }


        /*DESAYUNO-ALMUERZO-CENA*/

        if ($('input#Checkboxdesa').is(':checked')) {
            desayuno = 1
        }
        else {
            desayuno = 0
        }
        if ($('input#Checkboxalmu').is(':checked')) {
            almuerzo = 1
        } else {
            almuerzo = 0
        }
        if ($('input#Checkboxcena').is(':checked')) {
            cena = 1
        } else {
            cena = 0
        }




        var data = {
            eServicio: {
                Proveedor: $('#proveedor').val(),
                Nombre: $('#nombre').val(),
                Tipo: $('#tipo').val(),
                Valorxservicio: $('#valorxservicio').val(),
                Valor: $('#valor').val(),
                Duracion: $('#duracion').val(),
                Turno: $('#turno').val(),
                Desayuno: desayuno,
                Almuerzo: almuerzo,
                Cena: cena,
                Aerolinea: $('#aerolinea').val(),
                Box_Lunch: $('#boxlunch').val(),
                Ruta: $('#ruta').val(),
                Ciudad: $('#departamentos').val(),
                Hora: $('#time').val(),
                Hora_fin: $('#time_end').val(),
                Vista_Cliente: checkcli,
                Vista_Proveedor: checkprov,
                Precio_Obligatorio: checkprecio,
                Descripcion: $('#descripcion').val(),
                Tipo_Servicio: $('#tipo_servicio').val(),
                Tipo_Persona: $('#tipopersona').val(),
                Desc_Esp: $('#des_esp').val(),
                Desc_Ingl: $('#des_ingles').val(),
                Desc_Port: $('#des_port').val(),
                Desc_Ale: $('#des_ale').val(),
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
                window.location = '/Servicios/ServicioProveedor?proveedor=' + Proveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    $('.form-horizontal').on('click', 'button.RegistrarServicio', onClickRegistrarServicio);
    window.onClickRegistrarServicio = onClickRegistrarServicio;


    $('.form-horizontal').on('click', 'button.CargaServicio', onClickCargaServicio);
    window.onClickCargaServicio = onClickCargaServicio;


    function onClickCargaTerAer(e) {
            e.preventDefault();
            window.location = '/TarifaDetalle/NuevaTarifaDetalle?Proveedor=' + Proveedor;
        }

    function onClickCargaHotel(e) {
        e.preventDefault();
        window.location = '/TarifaDetalle/NuevaTarifaDetalleHotel?Proveedor=' + Proveedor;
    }


    //$('.form-horizontal').on('click', 'button.CargaTarifa', onClickCargaTarifa);
    //window.onClickCargaTarifa = onClickCargaTarifa;

    //debugger;
    //$('.CargaTarifa').on('click', 'button.CargaTarifa', function () {
    //    debugger;
    //    $('#myModal').show();
    //});

    //$("#CargaTarifa").click(function () {
    //    alert("hola");
    //    $("#myModal").show();
    //});



        $('#Tservicio').on('change', function () {

        var Tservicio = $(this).val();
        
        if (Tservicio == "TER") {
            $('button.CargaTarifa').prop("disabled", false);
            $('.modal').on('click', 'button.CargaTarifa', onClickCargaTerAer);
            
            
        }
        if (Tservicio == "AER") {
            $('button.CargaTarifa').prop("disabled", false);
            $('.modal').on('click', 'button.CargaTarifa', onClickCargaTerAer);
        }
            //$("#btn-guardarCarga").html('Save Aereo');        }

        if (Tservicio == "HOT") {
        $('button.CargaTarifa').prop("disabled", false);
        $('.modal').on('click', 'button.CargaTarifa', onClickCargaHotel);
        //$("#btn-guardarCarga").html('Save Hotel');
        }

        if (Tservicio == "0") {
            $('button.CargaTarifa').prop("disabled", true);            
        }

        
    });




    $('#btn-guardar').on('click', onClickGuardarServicio);
    $('#btn-guardarCarga').on('click', onClickGuardarCargaServicio);
    $('#btn-actualizar').on('click', onClickActualizarServicio);
    $('#btn-cancelar').on('click', onClickCancelarServicio);

    $('#resultados tbody').on('click', 'button.btn-VerTarifa', onClickVerTarifa);
    window.onClickVerTarifa = onClickVerTarifa;

    $('#resultados tbody').on('click', 'button.btn-EliminarServicio', onClickEliminarServicio);
    window.onClickEliminarServicio = onClickEliminarServicio;



    /*VALIDAR CAMPOS FORMULARIOS*/
    $("#formulario_servicio").validate({
        rules: {
            nombre: "required",
            descripcion: "required",
            tipo_servicio: {
                required: true
            },
            //tipo_servicio: {
            // required: true
            //},
            pais: {
                required: true
            },
            departamentos: {
                required: true
            }
            //alias: "required",
            //ruc: "required",
            //username1: {
            //    required: true,
            //    minlength: 2
            //},
            //tproveedor: {
            //    required: true
            //},
            //ruc: {
            //    required: true,
            //    digits: true,
            //},

            //telefono1: {
            //    required: true,
            //    digits: true,
            //    minlength: 7
            //},
            //telefono2: {
            //    required: true,
            //    digits: true,
            //    minlength: 7
            //},
            //telefono3: {
            //    required: true,
            //    digits: true,
            //    minlength: 7
            //},

            //password1: {
            //    required: true,
            //    minlength: 5
            //},
            //confirm_password1: {
            //    required: true,
            //    minlength: 5,
            //    equalTo: "#password1"
            //},
            //email1: {
            //    required: true,
            //    email: true
            //},
            //email2: {
            //    required: true,
            //    email: true
            //},
            //email3: {
            //    required: true,
            //    email: true
            //},
            //agree1: "required"
        },
        messages: {
            nombre: "Please enter your name",

            tipo_servicio: "Please selected a services type",
            pais: "Please enter country",
            departamentos: "Please enter city",
            descripcion : "gg"

            //alias: "Please enter your alias",
            //ruc: {
            //    required: "Please enter only digits",
            //},

            //telefono1: {
            //    required: "Please enter only digits",
            //    minlength: "Please enter minim 7 digits"
            //},

            //telefono2: {
            //    required: "Please enter only digits",
            //    minlength: "Please enter minim 7 digits"
            //},
            //telefono3: {
            //    required: "Please enter only digits",
            //    minlength: "Please enter minim 7 digits"
            //},

            //email1: "Please enter a valid email address",
            //email2: "Please enter a valid email address",
            //email3: "Please enter a valid email address",
            //tproveedor: "Please selected a services type",
            //agree1: "Please accept our policy"
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

    $('#formulario_servicio input').on('keyup blur', function () {
        if ($('#formulario_servicio').valid()) {
            $('button#btn-guardar').prop('disabled', false);
        } else {
            $('button#btn-guardar').prop('disabled', 'disabled');
        }
    });
         
});