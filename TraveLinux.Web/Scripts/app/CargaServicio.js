$(function () {
    debugger;
    var proveedor_codigo = $("input#proveedor_codigo").val();
    var servicio_codigo = $("input#servicio_codigo").val();

    var proveedor_codigo1 = $("input#provicodi").val();
    var servicio_codigo2 = $("input#taricodi").val();


    debugger;
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

                    return template;
                }
            }
        },

        ajax: {
            method: 'GET',
            url: '/CargaServicio/Obtener_ServicioProv?Proveedor=' + 'PROV00017' + '&Servicio=' + 'SERV00037',
            //url: '/TarifaDetalleServicio/Obtener_tarifa_Detalle_servicio?Proveedor=' + proveedor_codigo1,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
  {
      title: 'PROVEEDOR',
      data: 'PROVEEDOR',
      width: 125,
      className: 'not-mobile',
      visible: true
  },

   {
       title: 'SERVICIO',
       data: 'SERVICIO',
       width: 150,
       className: 'not-mobile'
   },

    {
        title: 'NOMBRE',
        data: 'NOMBRE',
        width: 150,
        className: 'not-mobile'
    },

      {
          title: 'DESC_ESP',
          data: 'DESC_ESP',
          width: 200,
          className: 'not-mobile'
      },

      {
          title: 'DESC_INGL',
          data: 'DESC_INGL',
          width: 200,
          className: 'not-mobile'
      },

        {
            title: 'DESC_PORT',
            data: 'DESC_PORT',
            width: 200,
            className: 'not-mobile'
        },

        {
            title: 'DESC_ALE',
            data: 'DESC_ALE',
            width: 200,
            className: 'not-mobile'
        },

         {
             title: 'DESCRIPCION',
             data: 'DESCRIPCION',
             width: 200,
             className: 'not-mobile'
         },

        {
             title: 'TIPO_SERVICIO',
             data: 'TIPO_SERVICIO',
             width: 150,
             className: 'not-mobile'
        },

        {
            title: 'TIPO_PERSONA',
            data: 'TIPO_PERSONA',
            width: 150,
            className: 'not-mobile'
        },


        {
            title: 'DESAYUNO',
            data: 'DESAYUNO',
            width: 150,
            className: 'not-mobile'
        },

            {
                title: 'ALMUERZO',
                data: 'ALMUERZO',
                width: 150,
                className: 'not-mobile'
            },

                {
                    title: 'CENA',
                    data: 'CENA',
                    width: 150,
                    className: 'not-mobile'
                },


        {
             title: 'AEROLINEA',
             data: 'AEROLINEA',
             width: 150,
             className: 'not-mobile'
        },


         {
              title: 'RUTA',
              data: 'RUTA',
              width: 150,
              className: 'not-mobile'
        },


       {
           title: 'RESUMEN',
           data: 'RESUMEN',
           width: 500,
           className: 'not-mobile'
       },
        ]

    });

    $('#btn-guardar').on('click', onClickRegistrarCargaServ);

    function onClickRegistrarCargaServ() {

        var lstServicios = new Array();
        $("#tblCustomers TBODY TR").each(function () {

            var row = $(this);
            var lstServicio = {};

            lstServicio.PROVEEDOR = proveedor_codigo;
            lstServicio.SERVICIO = row.find("TD").eq(0).html();
            lstServicio.NOMBRE = row.find("TD").eq(1).html();
            lstServicio.DESC_ESP = row.find("TD").eq(2).html();
            lstServicio.DESC_INGL = row.find("TD").eq(3).html();
            lstServicio.DESC_PORT = row.find("TD").eq(4).html();
            lstServicio.DESC_ALE = row.find("TD").eq(5).html();
            lstServicio.DESCRIPCION = row.find("TD").eq(6).html();
            lstServicio.TIPO_SERVICIO = row.find("TD").eq(7).html();
            lstServicio.TIPO_PERSONA = row.find("TD").eq(8).html();
            lstServicio.DESAYUNO = row.find("TD").eq(9).html();
            lstServicio.ALMUERZO = row.find("TD").eq(10).html();
            lstServicio.CENA = row.find("TD").eq(11).html();
            lstServicio.AEROLINEA = row.find("TD").eq(12).html();
            lstServicio.RUTA = row.find("TD").eq(13).html();
            lstServicio.RESUMEN = row.find("TD").eq(14).html();
            lstServicios.push(lstServicio);
        });

        debugger;
        //Send the JSON array to Controller using AJAX.
        $.ajax({
            type: 'POST',
            url: '/Mensaje/GuardarServicioCarga',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(lstServicios)
        })
            .done(function (data) {
                debugger;
                showSuccessMessage('Se ha guardado con exito');
                setTimeout(function () {
                    window.location = '/Mensaje/Index?proveedor=' + proveedor_codigo;
                }, 2000);
            })
        .fail(function () {
            showErrorMessage('No se pudo guardar.');
            enableAllComponents(true);
        });
    };


});