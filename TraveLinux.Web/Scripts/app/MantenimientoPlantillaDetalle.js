$(function () {

    var Id_Plantilla = $('#id_plantilla').val();

    $('#proveedor').on('change', function () {

        var Proveedor = $(this).val();
        $select = $('#ciudad');
        $.ajax({
            type: 'POST',
            url: '/Plantilla/ListadoCiudadServProveedor',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ Proveedor: Proveedor }),
            success: function (data) {
                // debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option value="' + val.DEPARTAMENTO + '">' + val.NOMBRE + '</option>');

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


    $('#tiposervicio').on('change', function () {

        var Tipo_Servicio = $(this).val();
        var Proveedor = $('#proveedor option:selected').val();
        var Ciudad = $('#ciudad option:selected').val();
        $select = $('#servicio');
        $select1 = $('#tipoacco');
        $.ajax({
            type: 'POST',
            url: '/Plantilla/ListadoServicioxProvPlantilla',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ sProveedor: Proveedor, sTipo_Servicio: Tipo_Servicio, sCiudad: Ciudad }),
            success: function (data) {
                //   debugger;
                if (data.length != 0) {
                    $select.html('');
                    $select.append('<option>-- Seleccione --</option>');
                    $.each(data, function (i, val) {
                        $select.append('<option value="' + val.SERVICIO + '">' + val.NOMBRE + '</option>');

                    })
                    $select.selectpicker('refresh');
                }
                else {
                    //$select.append('<option>No hay Distritos</option>');
                    $select.html('');
                    $select.selectpicker('refresh');


                }


                $.ajax({
                    type: 'POST',
                    url: '/Plantilla/ObtenerListAcomodacionPlantilla',
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ sTipo_Servicio: Tipo_Servicio }),
                    success: function (data) {
                        //   debugger;
                        if (data.length != 0) {
                            $select1.html('');
                            $select1.append('<option>-- Seleccione --</option>');
                            $.each(data, function (i, val) {
                                $select1.append('<option value="' + val.ID_TIPO_ACOM + '">' + val.DESCR_ACOM + '</option>');

                            })
                            $select1.selectpicker('refresh');
                        }
                        else {
                            //$select.append('<option>No hay Distritos</option>');
                            $select1.html('');
                            $select1.selectpicker('refresh');


                        }

                    },
                });


            },
        })
    });

    

    // Guardar Detalle Plantilla

    function onClickRegistrarDetallePlantilla() {

        //var valor = 0;

        //if ($('input#inlineCheckbox1').is(':checked')) {
        //    valor = 1
        //}
        //else {
        //    valor = 0
        //}
        //debugger;
        var data = {
            ePlantillaDetalle: {
                Id_Plantilla: $('#id_plantilla').val(),
                Servicio: $('#servicio').val(),
                Proveedor: $('#proveedor').val(),
                Tipo_Servicio: $('#tiposervicio').val(),
                Tipo_Acomodacion: $('#tipoacco').val(),
                Dia: $('#dia').val(),
                Cant_Adt: $('#num_adt').val(),
                Cant_Chd: $('#num_chd').val()



                //Estado: $('#tiposervicio').val(),
                // Precio_Total: $('#tiposervicio').val(),

            }
        }


        $.ajax({
            type: 'POST',
            url: '/Plantilla/GuardarPlantillaDetalle',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        })
        .done(function (data) {
            showSuccessMessage('Se ha guardado el detalle de la plantilla');
            setTimeout(function () {
                window.location = '/Plantilla/CrearPlantillaDetalle?Plantilla=' + Id_Plantilla;
            }, 2000);
        })
        .fail(function () {
            showErrorMessage('No se pudo guardar el detalle de la plantillas. Inténtelo de nuevo.');
            enableAllComponents(true);
        });
    }



    $('#btn-guardar-detalle').on('click', onClickRegistrarDetallePlantilla);


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
            url: '/Plantilla/ListadoDetallePlantilla?Plantilla=' + Id_Plantilla,
            dataType: 'json',
            dataSrc: '',
            data: function (items) {
            }
        },

        columns: [
    {
        title: 'ID_PLANTILLA',
        data: 'ID_PLANTILLA',
        width: 125,
        className: 'not-mobile',
        visible: true
    },
    {
        title: 'SERVICIO',
        data: 'NOMBRE_SERVICIO',
        width: 125,
        className: 'not-mobile',
        visible: true
    },
    {
        title: 'PROVEEDOR',
        data: 'NOMBRE_PROVEEDOR',
        width: 150,
        className: 'not-mobile',
        visible: true
    },
    //{
    //    title: 'TIPO_SERVICIO',
    //    data: 'TIPO_SERVICIO',
    //    width: 150,
    //    className: 'not-mobile',
    //    //render: renderTextColor
    //    visible: true,
    //},

    {
        title: 'TIPO_ACOMODACION',
        data: 'NOMBRE_TIPO_ACOMODACION',
        width: 40,
        className: 'not-mobile',
        //render: renderTextColor
        visible: true,
    },

      {
          title: 'DIA',
          data: 'DIA',
          width: 40,
          className: 'not-mobile',
          //render: renderTextColor
          visible: true,
      },

        {
            title: 'CANTIDAD',
            data: 'DIA',
            width: 40,
            className: 'not-mobile',
            //render: renderTextColor
            visible: true,
        },

          {
              title: 'PRECIO',
              data: 'PRECIO_TOTAL',
              width: 40,
              className: 'not-mobile',
              //render: renderTextColor
              visible: true,
          },



        ]

    });





})