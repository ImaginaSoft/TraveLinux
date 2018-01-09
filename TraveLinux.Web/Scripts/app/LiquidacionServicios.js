$(function () {

    $('#getCodeModal').on('hidden.bs.modal', function (e) {
        $(this).find('#notas').val('')
    })

    function onClickGuardar() {

        var modal = $('#getCodeModal');
        var xxx = grid.rows({ selected: true }).data().toArray();
        var Proveedor = $('#xxx-modal-title3').html();
        var File = $('#xxx-modal-title').html();
        var SubFile = $('#xxx-modal-title1').html();
        var Consecutivo = $('#xxx-modal-title2').html();

        var Notas = modal.find('#notas').val().trim();

        modal.modal('hide');

        $.ajax({
            type: 'POST',
            url: '/Liquidaciones/Guardar_XXXX',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Proveedor: Proveedor, File: File, SubFile: SubFile, Consecutivo: Consecutivo, Notas: Notas })
        })

 //.done(function (data) {
 //    showSuccessMessage('Se ha Actualizado');    
 //       setTimeout(function () {      
 //           window.location.reload = '/Liquidaciones/Index';
 //           ajax.realead();
 //       }, 2000);
 //   })
 //   .fail(function () {
 //       showErrorMessage('No se pudo Actualizar.');

 //          });     

        .done(function (data) {
            showSuccessMessage('Se ha Actualizado');
            //grid.ajax.reload();

            grid.ajax.reload(null, false);

        })
        .fail(function () {
            showErrorMessage('No se pudo Actualizar')
        });

    };


    function setTextColor(template, id, data) {
        var text = data.toLowerCase();
        if (text.indexOf('liquidado') >= 0) {
            template.find(id).css('color', 'blue').html(data);
        } else if (text.indexOf('por liquidar') >= 0) {
            template.find(id).css('color', 'green').html(data);
        } else if (text.indexOf('por completar') >= 0) {
            template.find(id).css('color', 'red').html(data);

        } else {
            template.find(id).css('color', 'red').html(data);
        }
    }

    function renderTextColor(data, type, row, meta) {
        var text = data.toLowerCase();
        var template = $('<span>');
        if (text.indexOf('liquidado') >= 0) {
            template.css('color', 'blue').html(data);
        } else if (text.indexOf('por liquidar') >= 0) {
            template.css('color', 'green').html(data);
        } else if (text.indexOf('por completar') >= 0) {
            template.html($('<a>')
                   .attr('href', '/servicios/index/' + row.File)
                   .text(data)
                   .wrap('<div></div>')
                   .parent()
                   .html());
        } else {
            template.css('color', 'red').html(data);
        }
        return $('<div>').append(template).html();
    }

   
    $('#fecha-inicial').datetimepicker({
        locale: 'es',
        //date: moment().startOf('month').toDate(),
        //defaultDate: "01/01/2016",        
        icons: {
            time: 'fa fa-time',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        }
    });

    $('#fecha-final').datetimepicker({
        locale: 'es',
        //date: moment().endOf('month').toDate(),
        icons: {
            time: 'fa fa-time',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        }
    });

    
    var grid = $('#resultados').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Liquidar',
                action: function (e, dt, node, config) {
                    var rows = dt.rows({ selected: true }).data().toArray();

                    if (rows.length == 0) {
                        showErrorMessage('Debe de seleccionar al menos un servicio para liquidar');
                        return;
                    }

                    var modal = $('#liquidacion-modal');

                    modal.find('#liquidacion-modal-title').html('Liquidación de ' + rows.length + ' servicio(s)');
                    modal.find('#liquidacion-modal-recibo').val('');
                    modal.find('#liquidacion-modal-tipo').unbind('change').bind('change', onChangeTipoDocumento);
                    modal.find('#liquidacion-modal-tipo')[0].selectedIndex = 0;
                    modal.find('#liquidacion-modal-retencion').prop('checked', false);
                    modal.find('#liquidacion-modal-retencion').unbind('change').bind('change', function () {
                        var tipo = modal.find('#liquSSSidacion-modal-tipo').val();
                        var porcentaje = window.porcentaje;
                        if ($(this).is(':checked')) {
                            calcularVaSlores(tipo, porcentaje, true);
                        } else {
                            calcularValores(tipo, porcentaje, false);
                        }
                    });

                    modal.find('#liquidacion-modal-aceptar').unbind('click').bind('click', onClickLiquidar);

                    modal.modal('show');

                    onChangeTipoDocumento();

                }
            }
        ],

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
                    template.find('#fecha').html(columns[1].data);
                    template.find('#file').html(columns[2].data);
                    template.find('#servicio').html(columns[3].data);

                    if (columns[4].data.toLowerCase().indexOf('liquidado') >= 0 || columns[4].data.toLowerCase().indexOf('por completar') >= 0) {
                        template.find('input[type=checkbox]').remove();
                    } else {
                        template.find('input[type=checkbox]').change(function () {
                            if ($(this).is(':checked')) {
                                api.row(':eq(' + index + ')').select();
                            } else {
                                api.row(':eq(' + index + ')').deselect();
                            }
                        });
                    }
                   

                    setTextColor(template, '#estado', columns[4].data);

                    template.find('#no-recibo').html(columns[5].data);
                    template.find('#tarifa').html(columns[6].data);
                    template.find('#modal').html(columns[9].data);
                    template.find('#notas2').html(columns[7].data.substring(0, 80));

                    return template;
                }
            }
        },
        ajax: {
            method: 'GET',
            url: '/Liquidaciones/ObtenerLiquidaciones',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
                var filtro = {
                    FechaInicial: $('#fecha-inicial').data('DateTimePicker').date(),
                    FechaFinal: $('#fecha-final').data('DateTimePicker').date(),
                    File: $.trim($('#file').val()),
                    Estado: $.trim($('#estado').val())
                };

                if (filtro.FechaInicial) {
                    filtro.FechaInicial = filtro.FechaInicial.format('YYYY-MM-DD');
                }

                if (filtro.FechaFinal) {
                    filtro.FechaFinal = filtro.FechaFinal.format('YYYY-MM-DD');
                }

                if (filtro.File.length == 0) {
                    filtro.File = null;
                }

                if (filtro.Estado.length == 0) {
                    filtro.Estado = null;
                }

                return filtro;
            }
        },
        select: {
            style: 'multi',
            selector: 'td.por-liquidar:first-child'
        },
        rowCallback: function (row, data, index) {
            if (data.EstadoLiquidacion.toLowerCase() === 'liquidado' || data.EstadoLiquidacion.toLowerCase() === 'por completar') {
                $(row).find('.select-checkbox').removeClass('select-checkbox');
            } else {
                $(row).find('.select-checkbox').addClass('por-liquidar');
            }
        },
        columns: [
            {
                className: 'select-checkbox not-mobile',
                width: 30,
                render: function (data, type, row, meta) {
                    return '';
                }
            },
            {
                title: 'Fecha',
                data: 'HoraServicio',
                width: 125,
                className: 'not-mobile'
            },
            {
                title: 'File',
                width: 125,
                className: 'not-mobile',
                render: function (data, type, row, meta) {
                    return row.File + '-' + row.SubFile;
                }
            },
            {
                title: 'Servicio',
                data: 'NomServicio',
                width: 150,
                className: 'not-mobile'
            },
            {
                title: 'Estado',
                data: 'EstadoLiquidacion',
                width: 120,
                className: 'not-mobile',
                render: renderTextColor
            },
            {
                title: 'No. de Recibo',
                data: 'Comprobante',
                width: 90,
                className: 'not-mobile',
                render: function (data, type, row, meta) {
                    return row.TipoComprobante + ' ' + row.Comprobante;
                }
            },
            {
                title: 'Tarifa',
                data: 'Tarifa',
                width: 100,
                className: 'not-mobile',
                render: function (data, type, row, meta) {
                    return (row.MonedaTarifa || '') + ' ' + row.Tarifa.toFixed(2);
                }

            },

            {
                title: 'Notas',
                data: 'Notas',
                width: 100,
                className: 'not-mobile',
                visible: false,
                render: function (data, type, row, meta) {
                    $('#notas').html((row.Notas));
                    return (row.Notas);
                }
            },

            {
                title: 'Texto',
                data: 'Notas',
                width: 100,
                className: 'not-mobile',
                visible: false,
                render: function (data, type, row, meta) {
                    $('#notas').html((row.Notas));
                    //var Notas = row.Notas.substring(0, 20);

                    //var DecodeNotas = decodeHtml(Notas);
                    //return (DecodeNotas);

                    return (row.Notas.substring(0, 20));
                }
            },

        {
            //title: 'View Modal',
            data: null,
            width: 15,
            className: 'dt-body-center not-mobile',
            render: function (data, type, row, meta) {                
                var content = [];
                var p = "'" + data.Notas + "'";
                var botton = '<button  class="btn btn-default model-View" id="prev"  type = "button"  onclick="PassVal(' + 1 + data.Proveedor + ',' + row.File + ',' + row.SubFile + ',' + row.Consecutivo + ',' + p + ')" type = "button" data-toggle="modal" data-target="#getCodeModal")><i class="fa fa-file-text-o"></button>'               

                content.push(botton);
                
                return content.join('&nbsp;&nbsp;');
            }
        },      
      ]
    });

    




grid.on('select', function (e, dt, type, indexes) {
    var items = dt.rows({ selected: true }).data().toArray();
    var currencies = items.map(function (item) { return item.MonedaTarifa; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
    if (currencies.length > 1) {
        showErrorMessage('Solo puedes seleccionar registros con la misma moneda');
        dt.rows(indexes).deselect();
    }
});

$('#buscar').click(function () {
    grid.ajax.reload();
});

function calcularValores(tipo, porcentaje, mostrar) {
    $('#liquidacion-modal-retencion-val').html('Aplica retención ' + (porcentaje * 100) + '%');
    $('#liquidacion-modal-retencion-lbl').html('Retención ' + (porcentaje * 100) + '%');

    if (!mostrar) {
        porcentaje = 0;
    }

    var xxx = grid.rows({ selected: true }).data().toArray();

    var subtotal = xxx.map(function (item) { return item.Tarifa }).reduce(function (prev, curr) { return prev + curr; }, 0);

    var retencion = subtotal * porcentaje;

    var total = subtotal - retencion;

    var moneda = xxx[0].MonedaTarifa;

    $('#liquidacion-modal-sub-total').html(moneda + ' ' + subtotal.toFixed(2));
    $('#liquidacion-modal-retencion-txt').html(moneda + ' ' + retencion.toFixed(2));
    $('#liquidacion-modal-total').html(moneda + ' ' + total.toFixed(2));

    $('#fila-checkbox').show();

    if (tipo !== 'RHP') {
        $('#fila-checkbox, #fila-sub-total, #fila-retencion').hide();
    } else if (!mostrar) {
        $('#fila-sub-total, #fila-retencion').hide();
    } else {
        $('#fila-sub-total, #fila-retencion').show();
    }
}

function onChangeTipoDocumento() {
    $('#liquidacion-modal-retencion').prop('checked', false);

    var tipo = $('#liquidacion-modal-tipo').val();

    if (tipo !== 'RHP') {
        calcularValores(tipo, 0, false);
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/Liquidaciones/ObtenerRetenciones'
    })
    .done(function (data) {
        var porcentaje = data['RHP'];
        window.porcentaje = porcentaje;
        calcularValores(tipo, porcentaje, false);
    })
    .fail(function () {
        showErrorMessage('No se pudo obtener el porcentaje de retención')
    });
}

function onClickLiquidar() {

    var modal = $('#liquidacion-modal');
    var xxx = grid.rows({ selected: true }).data().toArray();

    var recibo = $.trim(modal.find('#liquidacion-modal-recibo').val());
    var tipo = modal.find('#liquidacion-modal-tipo').val();
    var retencion = modal.find('#liquidacion-modal-retencion').is(':checked');

    modal.modal('hide');

    $.ajax({
        type: 'POST',
        url: '/Liquidaciones/Liquidar',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ liquidaciones: xxx, recibo: recibo, tipo: tipo, retencion: retencion })
    })
    .done(function (data) {
        showSuccessMessage('Se han liquidado los servicios con éxito');
        grid.ajax.reload();
    })
    .fail(function () {
        showErrorMessage('No se pudo liquidar los servicios')
    });
}

//modal.find('#liquidacion-modal-aceptar').unbind('click').bind('click', onClickLiquidar);
debugger;
    //$('#btn-guardar').click(onClickGuardar);
$('#btn-guardar').unbind('click').bind('click', onClickGuardar);

});