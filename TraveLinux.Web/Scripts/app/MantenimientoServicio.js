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


    $(document).ready(function () {
        $('#valor').attr('disabled', 'disabled');
        $('select[name="valorxservicio"]').on('change', function () {
            var others = $(this).val();
            if (others == "monto_fijo") {
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
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }

        var Servicio = item.Servicio;



        $.ajax({
            type: 'POST',
            url: '/Servicio/EliminarServicio',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Servicio: Servicio, Proveedor: Proveedor }),
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
        className: 'not-mobile'
    },

    {
        title: 'BOX_LUNCH',
        data: 'BOX_LUNCH',
        width: 25,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'ESTADO',
        data: 'ESTADO',
        width: 20,
        className: 'not-mobile',
        visible: false,
    },
    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 25,
        className: 'not-mobile'
    },

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
            var CrearServicio = '<button class="btn btn-danger btn-EliminarServicio" title="Eliminar Servicio"><i class="fa fa-eye" aria-hidden="true"></i></button>';
            var CrearTarifa = '<button class="btn btn-success btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';


            content.push(CrearServicio);
            content.push(CrearTarifa);
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
                Hora: $('#time').val()
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


    function onClickCargaTarifa(e) {
        e.preventDefault();
        window.location = '/TarifaDetalle/NuevaTarifaDetalle?Proveedor=' + Proveedor;
    }

    function onClickGuardarServicio() {

        var valor = 0;
        var desayuno = 'NO';
        var almuerzo = 'NO';
        var cena = 'NO';
        var checkcli, checkprov, checkprecio = 0;

        if ($('input#inlineCheckbox1').is(':checked')) {
            valor = 1
        }
        else {
            valor = 0
        }


        if ($('input#clienteCheckbox').is(':checked')) {
            checkcli = 1
        }
        else {
            checkcli = 0
        }

        if ($('input#proveedorCheckbox').is(':checked')) {
            checkprov = 1
        }
        else {
            checkprov = 0
        }

        if ($('input#precioCheckbox').is(':checked')) {
            checkprecio = 1
        }
        else {
            checkprecio = 0
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
                Vista_Cliente: checkcli,
                Vista_Proveedor: checkprov,
                Precio_Obligatorio : checkprecio,
                Descripcion: $('#descripcion').val(),
                Tipo_Servicio: $('#tproveedor').val(),
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


    $('.form-horizontal').on('click', 'button.CargaTarifa', onClickCargaTarifa);
    window.onClickCargaTarifa = onClickCargaTarifa;


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
            tproveedor: {
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
            nombre: "Please enter your name"
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
        }
        /* errorElement: "em" *//* ,
        errorPlacement: function (error, element) {
            error.addClass("help-block");

            element.parents(".col-sm-5").addClass("has-feedback");
            element.parents(".col-sm-3").addClass("has-feedback"); 

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }

            if (!element.next("span")[0]) {
                $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
        } *//* ,
        success: function (label, element) {
            if (!$(element).next("span")[0]) {
                $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");

            $(element).parents(".col-sm-3").addClass("has-error").removeClass("has-success"); 
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");

            $(element).parents(".col-sm-3").addClass("has-success").removeClass("has-error"); 
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        } */
    }),

        $('#formulario_servicio input').on('keyup blur', function () {
            if ($('#formulario_servicio').valid()) {
                $('button#btn-guardar').prop('disabled', false);
            } else {
                $('button#btn-guardar').prop('disabled', 'disabled');
            }
        });






});