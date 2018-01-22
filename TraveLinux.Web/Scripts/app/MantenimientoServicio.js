$(function () {
    var Proveedor = $("#proveedor").val();

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
        visible: false,
    },

    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 25,
        className: 'not-mobile'
    },

    {
        title: 'TIPO',
        data: 'TIPO',
        width: 25,
        className: 'not-mobile',
        visible: true,
    },
    {
        title: 'VALORXSERVICIO',
        data: 'VALORXSERVICIO',
        width: 25,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'DURACION',
        data: 'DURACION',
        width: 25,
        className: 'not-mobile',
        visible: true,
    },

    {
        title: 'TURNO',
        data: 'TURNO',
        width: 25,
        className: 'not-mobile',
        visible: true,
    },

    //{
    //    title: 'ESTADO_CIVIL',
    //    data: 'ESTADO_CIVIL',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'GENERO',
    //    data: 'GENERO',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'PAIS',
    //    data: 'PAIS',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'DEPARTAMENTO',
    //    data: 'DEPARTAMENTO',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'DIRECCION',
    //    data: 'DIRECCION',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'IDIOMA',
    //    data: 'IDIOMA',
    //    width: 70,
    //    className: 'not-mobile',
    //    visible: true,

    //},

    //{
    //    title: 'EMAIL',
    //    data: 'EMAIL',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: true,
    //},

    //{
    //    title: 'EMAIL_2',
    //    data: 'EMAIL_2',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'EMAIL_3',
    //    data: 'EMAIL_3',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'TELEFONO',
    //    data: 'TELEFONO',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'TELEFONO_2',
    //    data: 'TELEFONO_2',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'TELEFONO_3',
    //    data: 'TELEFONO_3',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'NOTAS',
    //    data: 'NOTAS',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'ESTADO',
    //    data: 'ESTADO',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},
    //{
    //    title: 'FECHA_REGISTRO',
    //    data: 'FECHA_REGISTRO',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'USUARIO_REGISTRO',
    //    data: 'USUARIO_REGISTRO',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'FECHA_ULT_MODIF',
    //    data: 'FECHA_ULT_MODIF',
    //    width: 150,
    //    className: 'not-mobile',
    //    visible: false,
    //},

    //{
    //    title: 'USUARIO_ULT_MODIF',
    //    data: 'USUARIO_ULT_MODIF',
    //    width: 125,
    //    className: 'not-mobile',
    //    visible: false,
    //},


    //{
    //    data: null,
    //    width: 80,
    //    className: 'dt-body-center not-mobile',
    //    render: function (data, type, row, meta) {
    //        var content = [];

    //        //var eliminar = '<button class="btn btn-danger Eliminar" title="Eliminar Cliente"><i class="glyphicon glyphicon-remove"></i></button>';

    //        content.push(editar);
    //        //content.push(eliminar);

    //        return content.join('&nbsp;&nbsp;');
    //    }
    //},

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
        window.location = '/Servicios/EditarServicio?Servicio=' + items[0]["Servicio"];
    });




    // Guardar servicio

    function onClickRegistrarServicio(e) {
        e.preventDefault();        
        window.location = '/Servicios/NuevoServicio?Proveedor=' + Proveedor;
    }

    function onClickGuardarServicio() {

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
                Nombre: $('#nombre').val(),
                Tipo: $('#tproveedor').val(),
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
                Tipo_Servicio: $('#tiposervicio').val(),
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
                window.location = '/Proveedor/Index';
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el servicio. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }

    $('.form-horizontal').on('click', 'button.RegistrarServicio', onClickRegistrarServicio);
    window.onClickRegistrarServicio = onClickRegistrarServicio;


    $('#btn-guardar').on('click', onClickGuardarServicio);
});