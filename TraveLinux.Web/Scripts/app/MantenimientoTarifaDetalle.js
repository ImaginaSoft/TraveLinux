$(function () {

    var vTIPO_SERVICIO = $('#tservicio').val();

    debugger;
    //$('#btn-guardarCargaHot').prop("disabled", true);

    var lstTarifas = new Array();
    $("#tblCustomers TBODY TR").each(function () {
        debugger;
        var row = $(this);
        var tarifa = {};

        tarifa.EXISTE = row.find("TD").eq(10).html();

        if (tarifa.EXISTE == '1') {
            $('#btn-guardarCargaHot').prop("disabled", false);
        }
        lstTarifas.push(tarifa);
    });


    $(":file").filestyle({ buttonName: "btn-warning" });
    $(":file").filestyle({ iconName: "glyphicon glyphicon-inbox" });
    $(":file").filestyle({ buttonBefore: true });
    $(":file").filestyle({ buttonText: "Import Excel" });


    $('#triggers').change(function () {
        $('#form_hoteles').submit();
    });

    $('#triggers_1').change(function () {
        $('#form_teraer').submit();
    });


    var Proveedor = $("input#proveedor").val();
    
    /*CARGA DINAMICO*/

    //$('#Tservicio').on('change', function () {

    //    var TServicio = $(this).val();
        
    //    if (TServicio == "TER" || TServicio == "AER") {

    //        $('#GrillaHot').hide();
    //        $('#GrillaTer_Aer').show();
    //        if (TServicio == "TER") {
    //            $("#btn-guardarCarga").html('Save Terrestre');
    //        }

    //        if (TServicio == "AER") {
    //            $("#btn-guardarCarga").html('Save Aereo');
    //        }
    //    }

    //   else if (TServicio == "HOT") {

    //        $('#GrillaTer_Aer').hide();
    //        $('#GrillaHot').show();
    //        $("#btn-guardarCargaHot").html('Save Hotel');
    //    }

    //    else {
    //        $('#GrillaTer_Aer').hide();
    //        $('#GrillaHot').hide();
    //    }
    //});

    function renderTextColor(data, type, row, meta) {
        //var text = data.toLowerCase();
        var template = $('<span>');

        if (data == '1') {
            template.append('<i class="fa fa-check-circle" id="aspita" aria-hidden="true" value="1"></i>');
        }
        else {
            template.append('<i class="fa fa-times-circle" id="equis" aria-hidden="true"value="0" ></i>');
        }
        return $('<div>').append(template).html();

    }

    function ValidateExtension() {
        var allowedFiles = [".xls", ".xlsx"];
        var fileUpload = document.getElementById("fileUpload");
        var lblError = document.getElementById("lblError");
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if (!regex.test(fileUpload.value.toLowerCase())) {
            lblError.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
            return false;
        }
        lblError.innerHTML = "";
        return true;
    }


    function onClickGuardarCargaTarifa() {

        var lstTarifas = new Array();
        $("#resultados TBODY TR").each(function () {
            debugger;
            var row = $(this);
            var tarifa = {};


            debugger;
            if (tarifa.EXISTE = row.find("TD").eq(10).html() == 1) {
                tarifa.PROVEEDOR = Proveedor;
                tarifa.DESCRIPCION = row.find("TD").eq(0).html();
                tarifa.TIPO_SERVICIO = row.find("TD").eq(1).html();
                tarifa.FECHA_INICIO = row.find("TD").eq(2).html();
                tarifa.FECHA_FIN = row.find("TD").eq(3).html();
                tarifa.TIPO_PERSONA = row.find("TD").eq(4).html();
                tarifa.RANGO_PAX = row.find("TD").eq(5).html();
                tarifa.PRECIO = row.find("TD").eq(6).html(); /*CODIGO GENERADO*/
                //tarifa.PRECIO = parseFloat(row.find("TD").eq(6).html());
                tarifa.TIPO_SERVICIO_2 = row.find("TD").eq(7).html();
                tarifa.PERIODO = row.find("TD").eq(8).html();
                lstTarifas.push(tarifa);                
            };

            alert(lstTarifas.length);
        });
        
        
        $.ajax({
            type: 'POST',
            url: '/TarifaDetalle/GuardarTarifaCarga',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lstTarifas)
        })
            .done(function (data) {
                debugger;
                showSuccessMessage('Se ha guardado con exito');
                setTimeout(function () {
                    window.location = '/Servicios/ServicioProveedor?Proveedor=' + Proveedor;
                }, 2000);
            })
        .fail(function () {
            showErrorMessage('No se pudo guardar.');
            enableAllComponents(true);
        });
    };




    function onClickGuardarCargaTarifaHoteles() {
        debugger;
        var lstTarifas = new Array();
        $("#resultados TBODY TR").each(function () {
            debugger;
            var row = $(this);
            var tarifa = {};            
            


            if (tarifa.EXISTE = row.find("TD").eq(11).html() == 1) {
                tarifa.PROVEEDOR = Proveedor;
                tarifa.DESCRIPCION = row.find("TD").eq(0).html();
                tarifa.FECHA_INICIO = row.find("TD").eq(1).html();
                tarifa.FECHA_FIN = row.find("TD").eq(2).html();
                tarifa.TIPO_PERSONA = row.find("TD").eq(3).html();
                tarifa.TIPO_SERVICIO = row.find("TD").eq(4).html();
                tarifa.SGL_ROOM = parseFloat(row.find("TD").eq(5).html());
                tarifa.DWL_ROOM = parseFloat(row.find("TD").eq(6).html());
                tarifa.TPL_ROOM = parseFloat(row.find("TD").eq(7).html());
                tarifa.CDL_ROOM = parseFloat(row.find("TD").eq(8).html());
                tarifa.PERIODO = row.find("TD").eq(9).html();                

                //alert(tarifa.SGL_ROOM + ' ' + tarifa.DWL_ROOM);

                lstTarifas.push(tarifa);
            }
        });


        $.ajax({
            type: 'POST',
            url: '/TarifaHoteles/GuardarTarifaCargaHoteles',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lstTarifas)
        })
            .done(function (data) {
                debugger;
                showSuccessMessage('Se ha guardado con exito');
                setTimeout(function () {
                    window.location = '/Servicios/ServicioProveedor?Proveedor=' + Proveedor;
                }, 2000);
            })
        .fail(function () {
            showErrorMessage('No se pudo guardar.');
            enableAllComponents(true);
        });
    };
    

    debugger;

    if (vTIPO_SERVICIO == "TERAER") {
        var grid = $('#resultados').DataTable({
            scrollX: true,
            paging: true,
            responsive: true,
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

                        template.find('#nombre').html(columns[1].data);
                        template.find('#alias').html(columns[2].data);

                        template.find('#ruc').html(columns[9].data);
                        template.find('#paginaweb').html(columns[8].data);


                        template.find('#pais').html(columns[5].data);
                        template.find('#ciudad').html(columns[6].data);
                        template.find('#idioma').html(columns[10].data);
                        setTextColor(template, '#estado', columns[11].data);


                        return template;
                    }
                }
            },

            ajax: {
                method: 'GET',
                url: '/TarifaDetalle/Carga_TerAer_Temporal',
                dataType: 'json',
                data: '{}',
                dataSrc: '',
                //success: function (data) {
                //    for (var i = 0; i < data.length; i++) {
                //        alert(response.DINAMICO[i]);
                //    }
                //},

            },
            columns: [
        {
            title: 'NOMBRE',
            data: 'DESCRIPCION',
            width: 70,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'SERVICIO',
            data: 'TIPO_SERVICIO',
            width: 70,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'INICIO',
            data: 'FECHA_INICIO_S',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'FINAL',
            data: 'FECHA_FINAL_S',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'PERSONA',
            data: 'TIPO_PERSONA',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'RANGO',
            data: 'RANGO',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'PRECIO',
            data: 'PRECIO',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },


        {
            title: 'ACOMODACION',
            data: 'TIPO_ACOMODACION',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TEMPOR',
            data: 'TEMPORADA',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'EXISTE SERVICIO',
            data: 'DINAMICO',
            width: 20,
            className: 'not-mobile',
            render: renderTextColor,
            visible: true,
        },

        {
            title: 'EXISTE',
            data: 'DINAMICO',
            width: 20,
            className: 'not-mobile',
            visible: true,
        },

        //{
        //    data: null,
        //    width: 80,
        //    className: 'dt-body-center not-mobile',
        //    render: function (data, type, row, meta) {
        //        var content = [];


        //        var SeleccionarOpcion = '<a class="btn btn-warning btn-SeleccionarOpcion data-toggle="modal" data-target="#myModal" title="tools"><i class="fa fa-cogs"></i></a>';
        //        var CrearServicio = '<button class="btn btn-primary btn-VerServicio" title="view service"><i class="fa fa-eye-slash"></i></button>';
        //        //var CrearTarifa = '<button class="btn btn-danger btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';


        //        content.push(CrearServicio);
        //        content.push(SeleccionarOpcion);

        //        return content.join('&nbsp;&nbsp;');
        //    }
        //},

            ],

        });
    }

    if (vTIPO_SERVICIO == "HOTEL") {
        var grid = $('#resultados').DataTable({
            scrollX: true,
            paging: true,
            responsive: true,
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

                        template.find('#nombre').html(columns[1].data);
                        template.find('#alias').html(columns[2].data);

                        template.find('#ruc').html(columns[9].data);
                        template.find('#paginaweb').html(columns[8].data);


                        template.find('#pais').html(columns[5].data);
                        template.find('#ciudad').html(columns[6].data);
                        template.find('#idioma').html(columns[10].data);
                        setTextColor(template, '#estado', columns[11].data);


                        return template;
                    }
                }
            },

            ajax: {
                method: 'GET',
                url: '/TarifaHoteles/Carga_TarifaHotel_Temporal',
                dataType: 'json',
                data: '{}',
                dataSrc: '',
                //success: function (data) {
                //    for (var i = 0; i < data.length; i++) {
                //        alert(response.DINAMICO[i]);
                //    }
                //},

            },
            columns: [
        {
            title: 'NOMBRE',
            data: 'DESCRIPCION',
            width: 70,
            className: 'not-mobile',
            visible: true,
        },
        {
            title: 'INICIO',
            data: 'FECHA_INICIO_S',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'FINAL',
            data: 'FECHA_FINAL_S',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'PERSONA',
            data: 'TIPO_PERSONA',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'SERVICIO',
            data: 'TIPO_SERVICIO',
            width: 30,
            className: 'not-mobile',
            visible: true,
        },
        {
            title: 'SGL',
            data: 'SGL_ROOM',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'DWL',
            data: 'DWL_ROOM',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'TPL',
            data: 'TPL_ROOM',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'CDL',
            data: 'CDL_ROOM',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },
        {
            title: 'TEMPOR',
            data: 'TEMPORADA',
            width: 10,
            className: 'not-mobile',
            visible: true,
        },

        {
            title: 'EXISTE SERVICIO',
            data: 'DINAMICO',
            width: 20,
            className: 'not-mobile',
            render: renderTextColor,
            visible: true,
        },

        {
            title: 'EXISTE',
            data: 'DINAMICO',
            width: 20,
            className: 'not-mobile',
            visible: true,
        },

        //{
        //    data: null,
        //    width: 80,
        //    className: 'dt-body-center not-mobile',
        //    render: function (data, type, row, meta) {
        //        var content = [];


        //        var SeleccionarOpcion = '<a class="btn btn-warning btn-SeleccionarOpcion data-toggle="modal" data-target="#myModal" title="tools"><i class="fa fa-cogs"></i></a>';
        //        var CrearServicio = '<button class="btn btn-primary btn-VerServicio" title="view service"><i class="fa fa-eye-slash"></i></button>';
        //        //var CrearTarifa = '<button class="btn btn-danger btn-VerTarifa" title="Ver Tarifa"><i class="fa fa-file-text-o"></i></button>';


        //        content.push(CrearServicio);
        //        content.push(SeleccionarOpcion);

        //        return content.join('&nbsp;&nbsp;');
        //    }
        //},

            ],

        });
    }






   



    $('#btn-guardarCarga').on('click', onClickGuardarCargaTarifa);  
 
    $('#btn-guardarCargaHot').on('click', onClickGuardarCargaTarifaHoteles);
 


    });



























//    var grid = $('#resultados').DataTable({
//        scrollX: true,
//        paging: true,
//        processing: true,
//        ordering: false,
//        deferLoading: 0,
//        responsive: {
//            details: {
//                type: 'column',
//                display: $.fn.dataTable.Responsive.display.childRowImmediate,
//                renderer: function (api, index, columns) {
//                    $('div#resultados_wrapper .dataTables_scrollHead').hide();

//                    var row = $(api.row(index).node());
//                    row.hide();

//                    var html = $('#responsive-template').html();
//                    var a = document.getElementById('yourlinkId'); //or grab it by tagname etc


//                    //var template = $(html);
//                    //template.find('#moneda').html(columns[0].data);
//                    //template.find('#descripcion').html(columns[1].data);
//                    //template.find('#valor').html(columns[2].data);
//                    //template.find('#estado').html(columns[3].data);

//                    //setTextColor(template, '#descripcion', columns[1].data);

//                    return template;
//                }
//            }
//        },

//        ajax: {
//            method: 'GET',
//            //url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + 'PROV00011' + '&Tarifa=' + 'TAR00014',
//            url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + proveedor_codigo1 + '&Tarifa=' + tarifa_codigo2,
//            dataType: 'json',
//            dataSrc: '',
//            data: function (items) {
//            }
//        },

//        columns: [
//    {
//        title: 'PROVEEDOR',
//        data: 'PROVEEDOR',
//        width: 125,
//        className: 'not-mobile',
//        visible: false
//    },
//    {
//        title: 'TARIFA',
//        data: 'TARIFA',
//        width: 125,
//        className: 'not-mobile',
//        visible: false
//    },
//    {
//        title: 'SERVICIO',
//        data: 'SERVICIO',
//        width: 150,
//        className: 'not-mobile'
//    },
//    {
//        title: 'DESCRIPCION',
//        data: 'DESCRIPCION',
//        width: 150,
//        className: 'not-mobile'
//    },
//    {
//        title: 'RANGO_DEL',
//        data: 'RANGO_DEL',
//        width: 150,
//        className: 'not-mobile'
//    },
//    {
//        title: 'RANGO_AL',
//        data: 'RANGO_AL',
//        width: 150,
//        className: 'not-mobile'
//    },
//    {
//        title: 'PRECIO',
//        data: 'PRECIO',
//        width: 150,
//        className: 'not-mobile'

//    },
//        ],
//        select: {
//        style:    'os',
//        selector: 'td:first-child'
//},
//    });




//    $('#btn-guardar').on('click', onClickRegistrarTarifa);

//    function onClickRegistrarTarifa() {

//        var lsttarifas = new Array();
//        $("#tblCustomers TBODY TR").each(function () {

//            var row = $(this);
//            var lsttarifa = {};            

//            lsttarifa.PROVEEDOR = proveedor_codigo;
//            lsttarifa.TARIFA = tarifa_codigo;
//            lsttarifa.SERVICIO = row.find("TD").eq(0).html();
//            lsttarifa.DESCRIPCION = row.find("TD").eq(1).html();
//            lsttarifa.RANGO_DEL = row.find("TD").eq(2).html();
//            lsttarifa.RANGO_AL = row.find("TD").eq(3).html();
//            lsttarifa.PRECIO = row.find("TD").eq(4).html();
//            lsttarifas.push(lsttarifa);
//        });
//        debugger;
//        //Send the JSON array to Controller using AJAX.
//        $.ajax({
//            type: 'POST',
//            url: '/TarifaDetalle/GuardarTarifaDetalle',
//            contentType: 'application/json; charset=utf-8',
//            data: JSON.stringify(lsttarifas)
//        })
//            .done(function (data) {
//            debugger;
//            showSuccessMessage('Se ha guardado con exito');
//            setTimeout(function () {              
//                window.location = window.location = '/Tarifa/TarifaProveedor?Proveedor=' + proveedor_codigo;
//            }, 2000);
//        })
//        .fail(function () {
//            showErrorMessage('No se pudo guardar.');
//            enableAllComponents(true);
//        });
//    };


//    $("#boton_validar").click(function () {
//        alert("guardando");
//        $("#btn-guardar").trigger("click");
//    });

    

   
//});
