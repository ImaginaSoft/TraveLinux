$(function () {


    function onClickRegistrarMoneda() {
    var valor = 0;

    if ($('input#estado').is(':checked')) {
        estado = 1
    }
    else {
        estado = 0
    }

    debugger;
    var data = {
        eMoneda: {
            Descripcion: $('#descripcion').val(),
            Valor: $('#valor').val(),
            Estado: estado
        }
    }

    $.ajax({
        type: 'POST',
        url: '/Moneda/GuardarMonedas',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    })
    .done(function (data) {
    showSuccessMessage('Se ha guardado la moneda');
    setTimeout(function () {
        window.location = '/Moneda/Index';
    }, 2000);
    })
    .fail(function () {
    showErrorMessage('No se pudo guardar la moneda. Inténtelo de nuevo.');
    enableAllComponents(true);
    });
}




    function setTextColor(template, id, data) {
        var text = data.toLowerCase();
        if (text.indexOf('DOLARES') == 'DOLARES') {
            template.find(id).css('color', 'green').html(data);
        } else if (text.indexOf('EUROS')) {
            template.find(id).css('color', 'green').html(data);
        }
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
                    template.find('#moneda').html(columns[0].data);
                    template.find('#descripcion').html(columns[1].data);
                    template.find('#valor').html(columns[2].data);
                    template.find('#estado').html(columns[3].data);

                    setTextColor(template, '#descripcion', columns[1].data);

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/Moneda/ObtenerMonedas',
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'MONEDA',
        data: 'MONEDA',
        width: 125,
        className: 'not-mobile'
    },
    {
        title: 'DESCRIPCION',
        data: 'DESCRIPCION',
        width: 125,
        className: 'not-mobile'
        //render: renderTextColor
    },
    {
        title: 'VALOR',
        data: 'VALOR',
        width: 150,
        className: 'not-mobile'
    },
    {
        title: 'ESTADO',
        data: 'ESTADO',
        width: 150,
        className: 'not-mobile',
        //render: renderTextColor
        //visible: false,
    },

    {
        data: null,
        width: 80,
        className: 'dt-body-center not-mobile',
        render: function (data, type, row, meta) {
            var content = [];

            var editar = '<button class="btn btn-success Editar" title="Editar Moneda"><i class="glyphicon glyphicon-pencil"></i></button>';
            var eliminar = '<button class="btn btn-danger Eliminar" title="Eliminar Moneda"><i class="glyphicon glyphicon-remove"></i></button>';

            content.push(editar);
            content.push(eliminar);

            return content.join('&nbsp;&nbsp;');
        }
    },

        ]

    });

debugger;
$('#btn-guardar').on('click', onClickRegistrarMoneda);

});
