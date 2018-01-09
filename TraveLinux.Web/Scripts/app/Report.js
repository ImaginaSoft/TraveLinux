/// <reference path="ReporteServicios.js" />
$(function () {

    $('#fecha-inicial, #fecha-final').datetimepicker({
        locale: 'es',
        icons: {
            time: 'fa fa-time',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove',
        },
    });


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

                    var template = $(html);
                    template.find('#File').html(columns[0].data);
                    template.find('#SubFile').html(columns[1].data);
                    template.find('#InicioFile').html(columns[2].data);
                    template.find('#FinFile').html(columns[3].data);
                    template.find('#UnidadNegocio').html(columns[4].data);
                    template.find('#Sucursal').html(columns[5].data);
                    template.find('#Consecutivo').html(columns[6].data);
                    template.find('#Nombre').html(columns[7].data);
                    template.find('#ApPaterno').html(columns[8].data);
                    template.find('#ApMaterno').html(columns[9].data);
                    template.find('#Nacionalidad').html(columns[10].data);
                    template.find('#Pasaporte').html(columns[11].data);
                    template.find('#FechaExpPasaporte').html(columns[12].data);
                    template.find('#PaisEmipPasaporte').html(columns[13].data);
                    template.find('#Sexo').html(columns[14].data);
                    template.find('#FechaNacimiento').html(columns[15].data);
                    template.find('#Edad').html(columns[16].data);
                    template.find('#Notas').html(columns[17].data);

                    return template;
                }
            }
        },
        ajax: {
            method: 'GET',
            url: '/ReporPDF/ObtenerPasajeros',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
                var filtro = {
                    FechaInicial: $('#fecha-inicial').data('DateTimePicker').date(),
                    FechaFinal: $('#fecha-final').data('DateTimePicker').date(),
                    File: $.trim($('#file').val()),
                    subfile: $.trim($('#subfile').val()),
                };

                if (filtro.FechaInicial) {
                    filtro.FechaInicial = filtro.FechaInicial.format('YYYY-MM-DD');
                    //filtro.FechaInicial = filtro.FechaInicial.format('DD-MM-YYYY');
                }

                if (filtro.FechaFinal) {
                    filtro.FechaFinal = filtro.FechaFinal.format('YYYY-MM-DD');
                }

                return filtro;
            }
        },
        columns: [

             {
                 title: 'File',
                 data: 'File',
                 width: 50,
                 className: 'not-mobile',
                 visible: false,
             },

            {
                title: 'SubFile',
                data: 'SubFile',
                width: 50,
                className: 'not-mobile',
                visible: false,
            },
            {
                title: 'Begin File',
                data: 'InicioFile',
                width: 125,
                className: 'not-mobile',
                visible: false
            },
            {
                title: 'End File',
                data: 'FinFile',
                width: 125,
                className: 'not-mobile',
                visible: false
            },
            {
                title: 'Business',
                data: 'UnidadNegocio',
                width: 100,
                className: 'not-mobile',
                visible: false
            },

            {
                title: 'Sucursal',
                data: 'Sucursal',
                width: 100,
                className: 'not-mobile',
                visible: false
            },

            {
                title: 'Consecutivo',
                data: 'Consecutivo',
                width: 100,
                className: 'not-mobile',
                visible: false

            },

            {
                title: 'Nombre',
                data: 'Nombre',
                width: 100,
                className: 'not-mobile'
            },

            {
                title: 'Apellido paterno',
                data: 'ApPaterno',
                width: 100,
                className: 'not-mobile'

            },

            {
                title: 'Apellido materno',
                data: 'ApMaterno',
                width: 100,
                className: 'not-mobile',
            },

            {
                title: 'Nacionality',
                data: 'Nacionalidad',
                width: 100,
                className: 'not-mobile',
                visible: false
            },

            {
                title: 'Pasaporte',
                data: 'Pasaporte',
                width: 100,
                className: 'not-mobile',
            },

            {
                title: 'Exp pasaporte',
                data: 'FechaExpPasaporte',
                width: 100,
                className: 'not-mobile',
                //render: function (data, type, row, meta) {

                //    var rowvalue = row["FechaExpPasaporte"];


                //    if (rowvalue = 0) {
                //        return ("");
                //    }
                //    else {
                //        return (moment(rowvalue).format("DD/MM/YYYY"));
                //    }                

            },

            {
                title: 'País Emision Pasaporte',
                data: 'PaisEmipPasaporte',
                width: 100,
                className: 'not-mobile',
            },

            {
                title: 'Sex',
                data: 'Sexo',
                width: 100,
                className: 'not-mobile',
                visible: false
            },

            {
                title: 'Fec nac',
                data: 'FechaNacimiento',
                width: 100,
                className: 'not-mobile',

            },

            {
                title: 'Age',
                data: 'Edad',
                width: 40,
                className: 'not-mobile',
                visible: false
            },

            {
                title: 'Notes',
                data: 'Notas',
                width: 100,
                className: 'not-mobile',
                visible: false
            },


            {
                data: null,
                width: 80,
                className: 'dt-body-center not-mobile',
                render: function (data, type, row, meta) {

                    //MODAL 
                    var content = [];


                    var pfecha = data.FechaNacimiento;

                    var pFile = "'" + data.File + "'"; var pSubFile = "'" + data.SubFile + "'"; var pInicioFile = "'" + data.InicioFile + "'";
                    var pFinFile = "'" + data.FinFile + "'"; var pUnidadNegocio = "'" + data.UnidadNegocio + "'"; var pSucursal = "'" + data.Sucursal + "'";
                    var pConsecutivo = "'" + data.Consecutivo + "'"; var pNombre = "'" + data.Nombre + "'"; var pApPaterno = "'" + data.ApPaterno + "'";
                    var pApMaterno = "'" + data.ApMaterno + "'"; var pNacionalidad = "'" + data.Nacionalidad + "'"; var pPasaporte = "'" + data.Pasaporte + "'";
                    var pFechaExpPasaporte = "'" + data.FechaExpPasaporte + "'"; var pPaisEmipPasaporte = "'" + data.PaisEmipPasaporte + "'"; var pSexo = "'" + data.Sexo + "'";
                    var pFechaNacimiento = "'" + data.FechaNacimiento + "'"; var pEdad = "'" + data.Edad + "'"; var pNotas = "'" + data.Notas + "'";

                    /* var botton = '<button  id = "btndetalle" class="btn btn-default model-View" type = "button"  onclick="PassVal(' + pFile + ',' + pSubFile + ',' + pInicioFile + ',' + pFinFile + ',' + pUnidadNegocio + ',' + pSucursal + ',' + pConsecutivo + ',' + pNombre + ',' + pApPaterno + ',' + pApMaterno + ',' + pNacionalidad + ',' + pPasaporte + ',' + pFechaExpPasaporte + ',' + pPaisEmipPasaporte + ',' + pSexo + ',' + pFechaNacimiento + ',' + pEdad + ',' + pNotas + ')" type = "button" data-toggle="modal" data-target="#getCodeModal")><i class="fa fa-file-text-o"></button>'*/

                    var botton = '<button class="btn btn-default model-View" type = "button" onclick="openWin()"></button>'

                    //var botton = '<button class="btn btn-default model-View" type = "button" onclick="llamarVistaParcial();"></button>'



                    content.push(botton);
                    return content.join('&nbsp;&nbsp;');
                }
            }
        ]
    });

    $('#buscar').click(function () {
        grid.ajax.reload();

    });
});