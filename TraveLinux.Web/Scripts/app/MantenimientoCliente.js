$(function () {

    //document.getElementById("btn-editar").disabled = true;
    var editor;
    $('#fechanacimiento').datetimepicker();

    $("#eliminar_email").hide();
    $("#eliminar_fono").hide();
    var max_fields = 3;
    var x = 1;
    var y = 1;

    $("#mostrar_email").click(function (e) {
        e.preventDefault();
        if ('clicked') {
            if (x < max_fields) {
                x++;
                $("#caja_dinamico").append('<div class="col-xs-12 col-sm-12 col-sm-3" id ="eliminarcajas' + x + '"><p>Email ' + x + ':</p><input class="form-control" id="email' + x + '"placeholder="Enter Email"></div>');

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
                $("#caja_dinamico_2").append('<div class="col-xs-12 col-sm-12 col-md-3" id ="eliminarcajas_2' + y + '"><p>Phone ' + y + ':</p><input class="form-control" id="telefono' + y + '"placeholder="Enter Fono"></div>');

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



    function onClickEditarCliente(e) {
        e.preventDefault();
        debugger;
        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }
    
        //window.location = '/Cliente/EditarCliente?Cliente=' + item.CLIENTE;    
        window.location = '/Cliente/EditarCliente?Cliente=' + item.CLIENTE;
    }


    // Guardar Cliente

function onClickRegistrarCliente() {    

    var valor = 0;

    if($('input#inlineCheckbox1').is(':checked')) {
        valor = 1
    }
    else {
        valor = 0
    }
    debugger;
    var data = {
        eCliente: {
             Nombre : $('#nombre').val(),
             Paterno : $('#paterno').val(),
             Materno: $('#materno').val(),
             Documento: $('#documento').val(),
             Numero: $('#numero').val(),
             Estado: valor,
             Fec_Nacimiento: $('#fechanacimiento').data('DateTimePicker').date(),
             Rango_Edad: $('#rangoedad').val(),
             Estado_Civil: $('#estadocivil').val(),
             Genero: $('#genero').val(),
             Pais: $('#pais').val(),             
             Departamento: $('#departamentos').val(),
             Direccion: $('#direccion').val(),
             Idioma: $('#idioma').val(),
             Email: $('#email1').val(),
             Email_2: $('#email2').val(),
             Email_3: $('#email3').val(),
             Telefono: $('#telefono1').val(),
             Telefono_2: $('#telefono2').val(),
             Telefono_3: $('#telefono3').val(),
             Notas: $('#notas').val(),
             
        }
    }


    $.ajax({
        type: 'POST',
        url: '/Cliente/GuardarCliente',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    })
    .done(function (data) {
        showSuccessMessage('Se ha guardado el Cliente');
        setTimeout(function () {
            window.location = '/Cliente/Index';
        }, 2000);
    })
    .fail(function () {
        showErrorMessage('No se pudo guardar el cliente. Inténtelo de nuevo.');
        enableAllComponents(true);
    });
}


    // Actualizar Cliente
function onClickActualizarCliente() {

    debugger;

    var valor = 0;

    if ($('input#inlineCheckbox1').is(':checked')) {
        valor = 1
    }
    else {
        valor = 0
    }

    var data = {
        eCliente: {
            Cliente: $('#cliente').val(),
            Nombre: $('#nombre').val(),
            Paterno: $('#paterno').val(),
            Materno: $('#materno').val(),
            Documento: $('#documento').val(),
            Numero: $('#numero').val(),
            Estado: valor,
            Fec_Nacimiento: $('#fechanacimiento').data('DateTimePicker').date(),
            Rango_Edad: $('#rangoedad').val(),
            Estado_Civil: $('#estadocivil').val(),
            Genero: $('#genero').val(),
            Pais: $('#pais').val(),
            Departamento: $('#departamentos').val(),
            Direccion: $('#direccion').val(),
            Idioma: $('#idioma').val(),
            Email: $('#email1').val(),
            Email_2: $('#email2').val(),
            Email_3: $('#email3').val(),
            Telefono: $('#telefono1').val(),
            Telefono_2: $('#telefono2').val(),
            Telefono_3: $('#telefono3').val(),
            Notas: $('#notas').val(),
        }
    };

    //if (data.Nombre == null) {
    //    showErrorMessage('Debe ingresar un nombre');
    //    return;
    //}


    $.ajax({
        type: 'POST',
        url: '/cliente/ActualizarCliente',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    })
    .done(function (data) {
        showSuccessMessage('Se ha actualizado el cliente');
        setTimeout(function () {
            window.location = '/Cliente/Index';
        }, 2000);
    })
    .fail(function () {
        showErrorMessage('No se pudo actualizar el cliente. Inténtelo de nuevo.');
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
        url: '/Cliente/ListadoCliente',
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
    title: 'CLIENTE',
    data: 'CLIENTE',
    width: 125,
    className: 'not-mobile',
    visible: false,
},
{
    title: 'NOMBRE',
    data: 'NOMBRE',
    width: 50,
    className: 'not-mobile'    
},

{
    title: 'PATERNO',
    data: 'PATERNO',
    width: 70,
    className: 'not-mobile'
},

{
    title: 'MATERNO',
    data: 'MATERNO',
    width: 70,
    className: 'not-mobile'    
},

{
    title: 'DOCUMENTO',
    data: 'DOCUMENTO',
    width: 125,
    className: 'not-mobile',
    visible: false,
},
{
    title: 'NUMERO',
    data: 'NUMERO',
    width: 70,
    className: 'not-mobile'
},

{
    title: 'FEC_NACIMIENTO',
    data: 'FEC_NACIMIENTO',
    width: 150,
    className: 'not-mobile',
    visible : false
},

{
    title: 'RANGOS_EDAD',
    data: 'RANGO_EDAD',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'ESTADO_CIVIL',
    data: 'ESTADO_CIVIL',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'GENERO',
    data: 'GENERO',
    width: 125,
    className: 'not-mobile',
    visible: false,
},
{
    title: 'PAIS',
    data: 'PAIS',
    width: 125,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'DEPARTAMENTO',
    data: 'DEPARTAMENTO',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'DIRECCION',
    data: 'DIRECCION',
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
    title: 'EMAIL',
    data: 'EMAIL',
    width: 150,
    className: 'not-mobile',
    visible: true,
},

{
    title: 'EMAIL_2',
    data: 'EMAIL_2',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'EMAIL_3',
    data: 'EMAIL_3',
    width: 125,
    className: 'not-mobile',
    visible: false,
},
{
    title: 'TELEFONO',
    data: 'TELEFONO',
    width: 125,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'TELEFONO_2',
    data: 'TELEFONO_2',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'TELEFONO_3',
    data: 'TELEFONO_3',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'NOTAS',
    data: 'NOTAS',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'ESTADO',
    data: 'ESTADO',
    width: 125,
    className: 'not-mobile',
    visible: false,
},
{
    title: 'FECHA_REGISTRO',
    data: 'FECHA_REGISTRO',
    width: 125,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'USUARIO_REGISTRO',
    data: 'USUARIO_REGISTRO',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'FECHA_ULT_MODIF',
    data: 'FECHA_ULT_MODIF',
    width: 150,
    className: 'not-mobile',
    visible: false,
},

{
    title: 'USUARIO_ULT_MODIF',
    data: 'USUARIO_ULT_MODIF',
    width: 125,
    className: 'not-mobile',
    visible: false,
},


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
    style:    'os',
    selector: 'td:first-child'
    },
});

grid.on('select', function (e, dt, type, indexes) {    
    var items = dt.rows({ selected: true }).data().toArray();
    window.location = '/Cliente/EditarCliente?Cliente=' + items[0]["CLIENTE"];
    });
$('#btn-guardar').on('click', onClickRegistrarCliente);
$('#btn-actualizar').on('click', onClickActualizarCliente);

});