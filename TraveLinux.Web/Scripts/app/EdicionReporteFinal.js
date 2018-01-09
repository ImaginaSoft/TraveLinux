$(function () { 
 
    $("#proveedor").select2();
    $("#cliente").select2();
    $("#sucursal").select2({
        minimumResultsForSearch: Infinity
    });
    var filtro = {};

    function createReportRows(reports) {
        var rows = $('#reports').empty();

        for (var i = 0; i < reports.length; i++) {
            var report = reports[i];

            var row = $($('#row-template').html());
            row.find('#row-file').val(report.NroFile);
            row.find('#row-subfile').val(report.SubFile)
            row.find('#row-consecutivo').val(report.Consecutivo);
            row.find('#row-id').html(report.NroFile + '-' + report.SubFile);
            row.find('#row-name').html(moment(report.FechaServicio).format('DD/MM/YYYY') + ' - ' + report.NombreServicio);

            row.find('#row-report')
                .html(report.Reporte)
                .summernote({
                    lang: 'es-ES',
                    height: 200,
                    toolbar: []
                })
                .summernote('disable');
            
            row.find('#row-final-report')
                .html(report.ReporteFinal)
                .summernote({
                    lang: 'es-ES',
                    height: 200
                });
          
            rows.append(row);
        }

        var args = [];

        if (filtro.FechaInicial) {
            args.push('FechaInicial=' + filtro.FechaInicial);
        }

        if (filtro.FechaFinal) {
            args.push('FechaFinal=' + filtro.FechaFinal);
        }

        if (filtro.Sucursal && filtro.Sucursal.length > 0) {
            args.push('Sucursal=' + filtro.Sucursal);
        }

        if (filtro.Proveedor && filtro.Proveedor.length > 0) {
            args.push('Proveedor=' + filtro.Proveedor);
        }

        if (filtro.File && filtro.File.length > 0) {
            args.push('File=' + filtro.File);
        }

        if (filtro.SubFile && filtro.SubFile.length > 0) {
            args.push('SubFile=' + filtro.SubFile);
        }

        var bar = $($('#complete-template').html());
        bar.find('#exportar').attr('href', '/Reportes/GuardarWord?' + args.join('&'));
        bar.find('#guardar').click(onClickSave);
        $('#bar').empty().append(bar);
    }

    function onClickSave(e) {
        e.preventDefault();

        var reports = $('#reports').children()
            .map(function () {
                return {
                    NroFile: $(this).find('#row-file').val(),
                    SubFile: $(this).find('#row-subfile').val(),
                    Consecutivo: $(this).find('#row-consecutivo').val(),
                    ReporteFinal: $(this).find('#row-final-report').summernote('code')
                };
            })
            .get();

        $.ajax({
            method: 'POST',
            url: '/Reportes/GuardarReportesFinales',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(reports)
        })
        .done(function () {
            showSuccessMessage('Se han guardado los cambios con éxito');
        })
        .fail(function () {
            showErrorMessage('No se pudieron guardar los cambios');
        });
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
            close: 'fa fa-remove'
        }
    });

    $('#buscar').click(function (e) {
        e.preventDefault();

        filtro = {
            FechaInicial: $('#fecha-inicial').data('DateTimePicker').date(),
            FechaFinal: $('#fecha-final').data('DateTimePicker').date(),
            Sucursal: $.trim($('#sucursal').val()),
            Proveedor: $.trim($('#proveedor').val()),
            Cliente: $.trim($('#cliente').val()),
            File: $.trim($('#file').val()),
            SubFile: $.trim($('#subfile').val())
        };

        if (filtro.FechaInicial) {
            filtro.FechaInicial = filtro.FechaInicial.format('YYYY-MM-DD');
        }

        if (filtro.FechaFinal) {
            filtro.FechaFinal = filtro.FechaFinal.format('YYYY-MM-DD');
        }

        if (filtro.Sucursal.length == 0) {
            filtro.Sucursal = null;
        }

        if (filtro.Proveedor.length == 0) {
            filtro.Proveedor = null;
        }

        if (filtro.File.length == 0) {
            filtro.File = null;
        }

        if (filtro.SubFile.length == 0) {
            filtro.SubFile = null;
        }

        if((!filtro.FechaInicial  || !filtro.FechaFinal) && !filtro.File)
        {
            showErrorMessage('No ha especificado criterios de busqueda');
            return;
        }
        $.ajax({
            method: 'GET',
            url: '/Reportes/ObtenerReportesProveedores',
            data: filtro
        })
        .done(function (reports) {
            showSuccessMessage('Se ha realizado la consulta con éxito');
            createReportRows(reports);
        })
        .fail(function () {
            showErrorMessage('No se pudo realizar la consulta');
        })
    });

});