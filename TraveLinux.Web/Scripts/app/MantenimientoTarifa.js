$(function () {
    var vProveedor = $('#proveedor').val();
    var vServicio = $('#servicio').val();
    var vdesc_servicio = $('#desc_servicio').val();
    
    //alert(vdesc_servicio.trim());

    $('#dtp_start').datetimepicker({
        defaultDate: new Date(),
    });
    $('#dtp_beginning').datetimepicker();
    $('#dtp_ending').datetimepicker();

    function renderTextColor(data, type, row, meta) {
        var text = data.toLowerCase();
        var template = $('<span>');
        if (text.indexOf('no aplicable') >= 0) {
            template.css('color', 'green').html(data);
        } else if (text.indexOf('conforme') >= 0) {
            template.css('color', 'green').html(data);
        } else if (text.indexOf('pendiente') >= 0) {
            template.css('color', 'red').html(data);
        } else {
            template.css('color', 'red').html(data);
        }
        return $('<div>').append(template).html();
    }
       

    $('#npersona').on('change', function () {        
        //var Rango = $(this).val();
        debugger;
        //var lstTarifas = {
        //        Proveedor: $('#proveedor').val(),
        //        Servicio: $('#servicio').val()
        //}

        var data = {
            eTarifa: {
                   Tarifa: $('#periodo').val(),
                   Desde: $('#npersona').val(),
                  Proveedor: $('#proveedor').val(),
                  Servicio: $('#servicio').val(),
                  Tipo_Pasajero: $('#tipopasajero').val(),
                }
            }
                

        $.ajax({
            type: 'POST',
            url: '/Tarifa/ValidarRango',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            //data: JSON.stringify({ Rango: Rango }),
            success: function (data) {
                debugger;
                if (data.RANGO != 0) {
                    $('#myModal').modal('show');
                    $("input#npersona").css("border-color", "rgb(47, 57, 86)");
                    $("input#npersona").css("box-shadow", "0 0 5px rgb(47, 57, 86)");
                }
            },
        })
    })


    // Listar Fechas POr Temporada

    $('#temporada').on('change', function () {
        var Temporada = $(this).val();
        var Fecha_Inicio = "";
        var Fecha_Final = "";
        var fecha = '1001-01-01 00:00';
        var max_fields = 1;
        var x = 0;
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Tarifa/ListadoFechasXTemporada',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Temporada: Temporada }),
            success: function (data) {
                Fecha_Inicio = data.FECHA_INICIO;
                Fecha_Final = data.FECHA_FIN;
                debugger;

                if (fecha == Fecha_Inicio && fecha == Fecha_Final) {
                    $("#dtp_beginning").remove();
                    $("#dtp_ending").remove();
                    $(".dtp_beginning").append('<div class="input-group date" id="dtp_beginning"><input type="text" class="form-control input-sm" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                    $(".dtp_ending").append('<div class="input-group date" id="dtp_ending"><input type="text" class="form-control input-sm" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                    $('#dtp_beginning').datetimepicker();
                    $('#dtp_ending').datetimepicker();

                }



                if (data.length != 0) {
                    if (fecha != Fecha_Inicio) {
                        if (x < max_fields) {
                            $("#dtp_beginning").remove();
                            $("#dtp_ending").remove();
                            $(".dtp_beginning").append('<div class="input-group date" id="dtp_beginning"><input type="text" class="form-control input-sm" value ="' + Fecha_Inicio + '"" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                            $(".dtp_ending").append('<div class="input-group date" id="dtp_ending"><input type="text" class="form-control input-sm" value ="' + Fecha_Final + '"" data-date-format="YYYY-MM-DD"/><span class="input-group-addon input-sm"><i class="fa fa-calendar"></i></span></div>');
                            $('#dtp_beginning').datetimepicker();
                            $('#dtp_ending').datetimepicker();
                        }
                    }

                }

            },
        })

    });

    //*Guardar Tarifa*//

    //function onClickGuardarTarifa() {
    //    debugger;
    //    var valor = 0;
    //    var vProveedor = $('#proveedor').val();

    //    if ($('input#inlineCheckbox1').is(':checked')) {
    //        valor = 1
    //    }
    //    else {
    //        valor = 0        }

    //    var data = {            
    //        eTarifa: {
    //            Proveedor: vProveedor,
    //            Estado: valor,
    //            Nombre: $('#tarifa').val(),
    //            Fecha_Comenzar: $('#dtp_start').data('DateTimePicker').date(),
    //            Temporada: $('#temporada').val(),                
    //            Notas: $('#notas').val(),
    //        }
    //    }


    //    $.ajax({
    //        type: 'POST',
    //        url: '/Tarifa/GuardarTarifa',
    //        contentType: 'application/json; charset=utf-8',
    //        data: JSON.stringify(data)
    //    })
    //    .done(function (data) {
    //        debugger;
    //        showSuccessMessage('Se ha guardado la tarifa');
    //        setTimeout(function () {
    //            window.location = '/Tarifa/TarifaProveedor?proveedor=' + vProveedor;
    //        }, 2000);
    //    })
    //    .fail(function () {
    //        showErrorMessage('No se pudo guardar el tarifario. Inténtelo de nuevo.');
    //        enableAllComponents(true);
    //    });
    //}

    function onClickRegistrarTarifa(e) {
        e.preventDefault();

        var lstTarifas = new Array();

        if (vdesc_servicio.trim() == "TERRESTRE" || vdesc_servicio.trim() == "AEREO")
        {
            desde = $("#npersona").val(),
            hasta = $("#hasta").val();

            //var data = {
            //    eTarifa: {
            //        Periodo_Fechas: $("#periodo").val(),
            //        Tipo_Acomodacion: $("#tipoacomodacion").val(),
            //        Tipo_Acomodacion: $("#tipoacomodacion").val(),
            //        Tipo_Pasajero: $("#tipopasajero").val(),
            //        N_Persona: $("#npersona").val(),
            //        N_hasta: $("#hasta").val(),
            //        Precio: $("#neto").val(),
            //    }
            //}
            debugger;
            while (desde <= hasta) {
                var Tarifa = {};
                Tarifa.TARIFA = $("#periodo").val();
                Tarifa.RANGO = +desde;
                Tarifa.PROVEEDOR = vProveedor;
                Tarifa.SERVICIO = vServicio;
                Tarifa.Tipo_Acomodacion = $("#tipoacomodacion").val();
                Tarifa.Tipo_Servicio = $("#tiposervicio").val();
                Tarifa.Tipo_Pasajero = $("#tipopasajero").val();
                Tarifa.Precio = $("#neto").val();
                desde++
                lstTarifas.push(Tarifa);
            };

            $.ajax({
                type: 'POST',
                url: '/Tarifa/GuardarTarifa',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(lstTarifas)
            })
            .done(function (data) {
                showSuccessMessage('Se ha guardado el tarifario');
                setTimeout(function () {
                    window.location = '/Tarifa/TarifaProveedor?Servicio=' + vServicio + '&Proveedor=' + vProveedor;
                }, 2000);
            })
            .fail(function () {
                showErrorMessage('No se pudo guardar el tarifario. Inténtelo de nuevo.');
                enableAllComponents(true);
            });
        }
       

        if (vdesc_servicio.trim() == "HOTEL")
        {        
            debugger;
           
            var data = {
                eTarifa: {
            TARIFA : $("#periodo").val(),
            PROVEEDOR : vProveedor,
            SERVICIO : vServicio,
            Tipo_Acomodacion : $("#tipoacomodacion").val(),
            Tipo_Servicio : $("#tiposervicio").val(),
            Tipo_Pasajero: $("#tipopasajero").val(),
            Tipo_Hab: $("#tipohab").val(),
            Precio : $("#neto").val()
   
             }
             };

            $.ajax({
                type: 'POST',
                url: '/Tarifa/GuardarTarifaHTL',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            })
            .done(function (data) {
                showSuccessMessage('Se ha guardado el tarifario');
                setTimeout(function () {
                    window.location = '/Tarifa/TarifaProveedor?Servicio=' + vServicio + '&Proveedor=' + vProveedor;
                }, 2000);
            })
            .fail(function () {
                showErrorMessage('No se pudo guardar el tarifario. Inténtelo de nuevo.');
                enableAllComponents(true);
            });


        }

    }

 
    function onClickRegistrarPeriodo(e) {
        e.preventDefault();

        var Proveedor = $("#proveedor").val();
        var Servicio = $("#servicio").val();

        window.location = '/Periodo/Index?Servicio=' + Servicio + '&Proveedor=' + Proveedor;
        //window.location = '/Tarifa/TarifaProveedor?Servicio=' + item["SERVICIO"] + '&Proveedor=' + item["PROVEEDOR"];
    }


    function onClickRegresar(e) {
        e.preventDefault();
         var Proveedor = $("#proveedor").val();
        window.location = '/Servicios/ServicioProveedor?Proveedor=' + Proveedor;
        //window.location = '/Tarifa/TarifaProveedor?Servicio=' + item["SERVICIO"] + '&Proveedor=' + item["PROVEEDOR"];
    }

    function onClickRegistrarTarifaDetalle(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;

        //var Tarifa = item.TARIFA;
        //var Proveedor = item.PROVEEDOR;

        window.location = '/TarifaDetalle/NuevaTarifaDetalle?Proveedor=' + item.PROVEEDOR + '&Tarifa=' + item.TARIFA;

    }

    function onClickListarServiciotarifa(e) {
        e.preventDefault();
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;

        var Tarifa = item.TARIFA;
        var Proveedor = item.PROVEEDOR;

        window.location = '/TarifaDetalleServicio/Index?Proveedor=' + item.PROVEEDOR + '&Tarifa=' + item.TARIFA;
    }


    //*Eliminar TARIFA*//
    function onClickEliminarTarifa(e) {
        e.preventDefault();
        debugger;
        var item = grid.row($(this).parents('tr')).data();
        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
        debugger;
        //var Servicio = item.SERVICIO;

        debugger;
        $.ajax({
            type: 'POST',
            url: '/Tarifa/EliminarTarifa',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Tarifa: item.TARIFA, Proveedor: item.PROVEEDOR, Rango: item.RANGO, Tipo_Pasajero: item.TIPO_PASAJERO }),
        })
        .done(function (data) {
            showSuccessMessage('Se ha eliminado la tarifa');
            setTimeout(function () {
                window.location = '/Tarifa/TarifaProveedor?Servicio=' + vServicio + '&Proveedor=' + vProveedor;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo borrar el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });

    }
  
    


    if (vdesc_servicio.trim() == "TERRESTRE") {        

        //*LISTA TARIFA*//
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
                        template.find('#tarifa').html(columns[0].data);
                        template.find('#nombre').html(columns[1].data);
                        template.find('#fechavalidez').html(columns[2].data);
                        template.find('#fechainivigencia').html(columns[3].data);

                        //setTextColor(template, '#descripcion', columns[1].data);

                        return template;
                    }
                }
            },

            ajax: {
                method: 'GET',
                //url: '/Tarifa/ListadoTarifa?Proveedor=' + vProveedor + '&Servicio=' + vServicio + '&Tarifa=' + vTarifa,
                url: '/Tarifa/ListadoTarifa',
                dataType: 'json',
                dataSrc: '',
                data: function (items) {
                    var filtro = {
                        Proveedor: vProveedor,
                        Servicio: vServicio,
                        Tarifa: $.trim($('#periodo').val())                        
                    };
                    return filtro;
                }
            },

            columns: [
        {
            title: 'TARIFA',
            data: 'TARIFA',
            width: 70,
            className: 'not-mobile',
            visible: true,

        },

        {
            title: 'PROVEEDOR',
            data: 'PROVEEDOR',
            width: 50,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'SERVICIO',
            data: 'SERVICIO',
            width: 100,
            className: 'not-mobile',
            visible: false,
        },
        {
            title: 'TIPO_ACOMODACION',
            data: 'TIPO_ACOMODACION',
            width: 40,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'TIPO ACOMODACION',
            data: 'DESCR_TIPO_ACOMODACION',
            width: 40,
            className: 'not-mobile'
        },

        {
            title: 'TIPO_PASAJERO',
            data: 'TIPO_PASAJERO',
            width: 40,
            className: 'not-mobile',
            visible: true,
        },
        {
            title: 'RANGO',
            data: 'RANGO',
            width: 50,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'PRECIO',
            data: 'PRECIO',
            width: 40,
            className: 'not-mobile',
            visible: true,
        },

          {
              data: null,
              width: 80,
              className: 'dt-body-center not-mobile',
              render: function (data, type, row, meta) {
                  var content = [];

                  var EliminarTarifa = '<button class="btn btn-danger btn-EliminarTarifa" title="Eliminar Tarifa"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';

                  content.push(EliminarTarifa);
                  //content.push(eliminar);

                  return content.join('&nbsp;&nbsp;');
              }
          },



            ]
        });

    };

    if (vdesc_servicio.trim() == "HOTEL") {

        //*LISTA TARIFA*//
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
                        template.find('#tarifa').html(columns[0].data);
                        template.find('#servicio').html(columns[1].data);
                        template.find('#tiposervicio').html(columns[4].data);
                        template.find('#habitacion').html(columns[5].data);
                        template.find('#pasajero').html(columns[6].data);

                        template.find('#acomodacion').html(columns[8].data);                        
                        template.find('#precio').html(columns[10].data);
                        


                        //setTextColor(template, '#descripcion', columns[1].data);

                        return template;
                    }
                }
            },

            ajax: {
                method: 'GET',
                //url: '/Tarifa/ListadoTarifa?Proveedor=' + vProveedor + '&Servicio=' + vServicio + '&Tarifa=' + vTarifa,
                url: '/Tarifa/ListadoTarifaHoteles',
                dataType: 'json',
                dataSrc: '',
                data: function (items) {
                    var filtro = {
                        Proveedor: vProveedor,
                        Servicio: vServicio,
                        Tarifa: $.trim($('#periodo').val())                        
                    };
                    return filtro;
                }
            },

            columns: [

        {
            title: '#',
            data: null,
            width: 10,
            defaultContent: '',            
            orderable: false
        },

        {
            title: 'TARIFA',
            data: 'TARIFA',
            width: 70,
            className: 'not-mobile',
            visible: true,

        },

        {
            title: 'SERVICIO',
            data: 'SERVICIO',
            width: 100,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'PROVEEDOR',
            data: 'PROVEEDOR',
            width: 50,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TIPO_HAB',
            data: 'TIPO_HAB',
            width: 40,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TIPO_SERVICIO',
            data: 'DESCRIPCION',
            width: 40,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'HABITACION',
            data: 'DESCR_TIPO_HABITACION',
            width: 40,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'PASAJERO',
            data: 'TIPO_PASAJERO',
            width: 50,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TIPO_ACOMODACION',
            data: 'TIPO_ACOMODACION',
            width: 40,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'ACOMODACION',
            data: 'DESCR_TIPO_ACOMODACION',
            width: 40,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TIPO SERVICIO',
            data: 'TIPO_SERVICIO',
            width: 40,
            className: 'not-mobile',
            visible: false,
        },

        {
            title: 'PRECIO',
            data: 'PRECIO',
            width: 40,
            className: 'not-mobile',
            visible: true,
        },
 
          {
              data: null,
              width: 80,
              className: 'dt-body-center not-mobile',
              render: function (data, type, row, meta) {
                  var content = [];

                  var EliminarTarifa = '<button class="btn btn-danger btn-EliminarTarifa" title="Eliminar Tarifa"><i class="glyphicon glyphicon-trash" aria-hidden="true"></i></button>';

                  content.push(EliminarTarifa);
                  //content.push(eliminar);

                  return content.join('&nbsp;&nbsp;');
              }
          },

            ],

            columnDefs: [{
                sortable: false,
                class: "index",
                targets: 0
            }],

            order: [[1, 'asc']],
            fixedColumns: true
        });

        grid.on('order.dt search.dt', function (e, dt, type, indexes) {
            //var items = dt.rows({ selected: true }).data().toArray();

            grid.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });

        }).draw();
    };


    //$('#rangitohasta').on('change', function () {

    function onClickActualizarTarifaHoteles(e) {

        var lstTarifas = new Array();
        var desde = $('#rangitode').val();
        var hasta = $('#rangitohasta').val();
        var precio = $('#precio_rango').val();        

        $("#resultados TBODY TR").each(function () {
            var row = $(this);

            if (vdesc_servicio.trim() == "TERRESTRE") {

                var index = row.find("TD").eq(3).html();
            }

            if (vdesc_servicio.trim() == "AEREO") {

                var index = row.find("TD").eq(3).html();
            }

            if (vdesc_servicio.trim() == "HOTEL") {

                var index = row.find("TD").eq(0).html();
            }


            //var index = row.find("TD").eq(0).html();
         
            

            if (index >= desde && index <= hasta) {
                var lstTarifa = {};
                debugger;

                if (vdesc_servicio.trim() == "TERRESTRE" || vdesc_servicio.trim() == "AEREO") {

                    lstTarifa.TARIFA = row.find("TD").eq(0).html();
                    lstTarifa.TIPO_ACOMODACION = row.find("TD").eq(1).html();
                    lstTarifa.RANGO = row.find("TD").eq(3).html();
                    lstTarifa.PRECIO = precio;
                    lstTarifa.PROVEEDOR = vProveedor
                    lstTarifa.SERVICIO = vServicio
                    lstTarifa.TIPO_SERVICIO = vdesc_servicio
                    lstTarifas.push(lstTarifa);
                }

                if (vdesc_servicio.trim() == "HOTEL") {

                    lstTarifa.TARIFA = row.find("TD").eq(1).html();
                    lstTarifa.SERVICIO = row.find("TD").eq(2).html();
                    lstTarifa.PROVEEDOR = row.find("TD").eq(3).html();
                    lstTarifa.TIPO_HAB = row.find("TD").eq(4).html();
                    lstTarifa.PRECIO = precio;
                    lstTarifas.push(lstTarifa);
                }


                //lstTarifa.TARIFA = row.find("TD").eq(1).html();
                //lstTarifa.SERVICIO = row.find("TD").eq(2).html();
                //lstTarifa.PROVEEDOR = row.find("TD").eq(3).html();
                //lstTarifa.TIPO_HAB = row.find("TD").eq(4).html();
                //lstTarifa.PRECIO = precio;                
                //lstTarifas.push(lstTarifa);
            }
        });

        $('#myModal_Precio').modal('hide');
        $.ajax({
            type: 'POST',
            url: '/Tarifa/ActualizarRangoHoteles',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lstTarifas)
        })
    .done(function (data) {
        debugger;
        showSuccessMessage('Se ha actualizado el precio con exito');
        setTimeout(function () {
            //window.location = '/Servicios/ServicioProveedor?proveedor=' + Proveedor;
            window.location = '/Tarifa/TarifaProveedor?Servicio=' + vServicio + '&Proveedor=' + vProveedor;
        }, 2000);

    })
    .fail(function () {
        showErrorMessage('No se pudo guardar.');
        enableAllComponents(true);
    });

    };


    $('.modal').on('click', 'button.btn-UpdatePrice', onClickActualizarTarifaHoteles);

    $('.form-horizontal').on('click', 'button.btn-Regresar', onClickRegresar);
    window.onClickRegresar = onClickRegresar;

    $('#resultados tbody').on('click', 'button.btn-EliminarTarifa', onClickEliminarTarifa);
    window.onClickEliminarTarifa = onClickEliminarTarifa;

    $('#resultados tbody').on('click', 'button.RegistrarTarifDetalle', onClickRegistrarTarifaDetalle);
    window.onClickRegistrarTarifaDetalle = onClickRegistrarTarifaDetalle;


    $('#resultados tbody').on('click', 'button.ListarServiciotarifa', onClickListarServiciotarifa);
    window.onClickListarServiciotarifa = onClickListarServiciotarifa;

    $('.form-horizontal').on('click', 'button.RegistrarTarifa', onClickRegistrarTarifa);
    window.onClickRegistrarTarifa = onClickRegistrarTarifa;

    $('.form-horizontal').on('click', 'button.RegistrarPeriodo', onClickRegistrarPeriodo);
    window.onClickRegistrarPeriodo = onClickRegistrarPeriodo;


    $('#periodo').change(function () {
        grid.ajax.reload();
    })

    function soloNumeros(e) {
        var key = window.Event ? e.which : e.keyCode
        return (key >= 48 && key <= 57)
    }



    debugger;
    /*VALIDAR CAMPOS FORMULARIOS*/
    $("#formulario_tarifa").validate({
        rules:
            {
            descripcion: "required",
            tipo_servicio: {
                required: true
            },
           
            Tipo_Pasajero: "required",
            Tipo_Pasajero: {
                required: true
            },
          
        },
        messages: {
            nombre: "Please enter your name",

            descripcion: "Please selected a descripcion type",
            tipo_servicio: "Please selected a service type",
            pasajero: "Please selected type",
            Tipo_Pasajero: "Please selected type",


           
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


    $('#formulario_tarifa input').on('keyup blur', function () {
        if ($('#formulario_tarifa').valid()) {
            $('button#btn-guardar').prop('disabled', false);
        } else {
            $('button#btn-guardar').prop('disabled', 'disabled');
        }
    });


});