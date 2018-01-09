$(function () {
    //$("#usuario").select2({ containerCssClass: "myFont" });
    $("#usuario").select2();
    function onClickRegistroServicio(e) {
        e.preventDefault();

        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }

        window.location = '/Reportes/Servicios?file=' + item.File + '&proveedor=' + item.Proveedor + '&consecutivo=' + item.Consecutivo + '&subfile=' + item.SubFile;
    }

    //debugger
    //function onClickReporte(e) {
    //    e.preventDefault();

    //    alert("hola");
    //}


    function onClickRegistroTamPass(e) {
        e.preventDefault();

        var item = grid.row($(this).parents('tr')).data();

        if (!item) {
            item = grid.row($(e.target).parents('tr').prev()).data();
        }

        window.location = '/Reportes/TamPass?file=' + item.File + '&subfile=' + item.SubFile + '&consecutivo=' + item.Consecutivo;
    }

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

    

    function setTextColor(template, id, data) {
        var text = data.toLowerCase();
        if (text.indexOf('no aplicable') >= 0) {
            template.find(id).css('color', 'green').html(data);
        } else if (text.indexOf('conforme') >= 0) {
            template.find(id).css('color', 'green').html(data);
        } else if (text.indexOf('pendiente') >= 0) {
            template.find(id).css('color', 'red').html(data);
        } else {
            template.find(id).css('color', 'red').html(data);
        }
    }

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
                    template.find('#fecha').html(columns[0].data);
                    template.find('#file').html(columns[1].data);
                    template.find('#servicio').html(columns[2].data);

                    setTextColor(template, '#reporte-servicio', columns[3].data);
                    setTextColor(template, '#tam-pass', columns[4].data);
                    setTextColor(template, '#encuestas', columns[5].data);

                    debugger;
                                        
                    template.find('#Reporte').html('<a class = "FormatearPDF" href="/Tarifario/DetailReport?Proveedor=' + columns[8].data + '&amp;File=' + columns[6].data + '&amp;Subfile=' + columns[7].data + '" target="_blank"><img src ="../../Content/img/icono.png"></a>')

                    //var reporte = '<button class="btn btn-default"><i class="fa fa-file-text-o"></i></button>';

                    template.find('#Reporte').html()

                    if (!(columns[4].data.toLowerCase().indexOf('conforme') >= 0 || columns[4].data.toLowerCase().indexOf('pendiente') >= 0)) {
                        template.find('.registro-tam-pass').hide();
                    }

                    return template;
                }
            }
        },
        ajax: {
            method: 'GET',
            url: '/Servicios/ObtenerServiciosAsociados',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
                var filtro = {
                    FechaInicial: $('#fecha-inicial').data('DateTimePicker').date(),
                    FechaFinal: $('#fecha-final').data('DateTimePicker').date(),
                    File: $.trim($('#file').val()),
                    Usuario: $.trim($('#usuario').val())
                };

                if (filtro.FechaInicial) {
                    filtro.FechaInicial = filtro.FechaInicial.format('YYYY-MM-DD');
                }

                if (filtro.FechaFinal) {
                    filtro.FechaFinal = filtro.FechaFinal.format('YYYY-MM-DD');
                }

                return filtro;
            }
        },
        columns: [
            {
                title: 'Fecha',
                data: 'HoraServicio',
                width: 125,
                className: 'not-mobile'
            },
            {
                title: 'File',
                data: 'File2',
                width: 125,
                className: 'not-mobile'
            },
            {
                title: 'Servicios',
                data: 'NombreServicio',
                width: 150,
                className: 'not-mobile'
            },
            {
                title: 'Reporte de Servicios',
                data: 'EstadoReporteServicios',
                width: 120,
                className: 'not-mobile',
                render: renderTextColor
            },
            {
                title: 'TAM/PASS',
                data: 'EstadoTamPass',
                width: 100,
                className: 'not-mobile',
                render: renderTextColor
            },
            {
                title: 'Encuestas',
                data: 'EstadoEncuestas',
                width: 100,
                className: 'not-mobile',
                render: renderTextColor
            },

            {
                title: 'File',
                data: 'File',
                visible: false,
            },

            {
                title: 'SubFile',
                data: 'SubFile',
                visible: false,                
            },

            {
                title: 'Proveedor',
                data: 'Proveedor',
                visible: false,
            },

            {
                data: null,
                width: 80,
                className: 'dt-body-center not-mobile',
                render: function (data, type, row, meta) {
                    var content = [];

                    var servicios = '<button class="btn btn-default rep-serv" title="Ingresar Reporte de Servicios"><i class="fa fa-file-text-o"></i></button>';
                    var tampass = '<button class="btn btn-default tam-pass" title="Ingresar Fotos TAM/PASS"><i class="fa fa-camera"></i></button>';
                    
                    content.push(servicios);

                    if (row.EstadoTamPass.toLowerCase().indexOf('conforme') >= 0 || row.EstadoTamPass.toLowerCase().indexOf('pendiente') >= 0) {
                        content.push(tampass);
                    }

                    return content.join('&nbsp;&nbsp;');
                }
            },

            {
                data: null,
                width: 15,
                className: 'dt-body-center not-mobile',
                render: function (data, type, row, meta) {
                    
                    var content = [];
                    var vProveedor = + 1 + data.Proveedor
                    var xProveedor = vProveedor.toString();
                    var Proveedor = xProveedor.substring(1);                    
                    
                    var result = '<a href="/Tarifario/DetailReport?proveedor=' + Proveedor + '&amp;file=' + data.File + '&amp;SubFile=' + data.SubFile + '" target="_blank">PDF</a>'
                    //var result = '<a href="/Tarifario/DetailReport?SubFile=' + data.Proveedor + '&amp;file=' + data.File + '&amp;proveedor=' + Proveedor + '" target="_blank">PDF</a>'                   
                    content.push(result);
                    return content.join('&nbsp;&nbsp;');               

                }
            },           
        ]
    });


        
    var max_chars = 250;

        $('#notas').html(max_chars);
        var chars = $(this).val().length;  
        
    $('#buscar').click(function () {
        grid.ajax.reload();
    });

    $('#resultados tbody').on('click', 'button.rep-serv', onClickRegistroServicio);
    
    $('#resultados tbody').on('click', 'button.tam-pass', onClickRegistroTamPass);

    window.onClickRegistroServicio = onClickRegistroServicio;
    window.onClickRegistroTamPass = onClickRegistroTamPass;    

});