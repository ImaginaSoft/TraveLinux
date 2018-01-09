$(function () {


    //var myJsVariable = '@ViewBag.Message'

    //alert(myJsVariable);

    //$.getJSON('@Url.Action("Login")', function(error) {

    //    alert(error);
    
    //});


    //var url = "/Usuarios/Login";
    //$.get(url, { error: msj }, function (data) {
    //    alert(msj);
    //});
        //$("#btnGet").click(function(){
        //    $.post("/Usuarios/Login",
        //        //{ name: $("#txtName").val() },
        //        function (response) {
        //            //alert("Hello: " + response.Name + " .\nCurrent Date and Time: " + response.DateTime);
        //            $("#error").css("display","inblock");
        //        }
        //     );
        //});

//    var url = "/Usuarios/Login";
//    $.get(url, { error: msj }, function (data) {
//        alert(msj);
//    });

        
//    //$.post("/Usuarios/Login",
//    //            { error },
//    //            function (response) {
//    //                alert(error);
//    //            }
//    //         );
       
    

////    var PerfilAdmin = "Administrador";
////    var maxlen = 50;
////    //var tperfilvali = document.getElementById('validarTPerfil')

////    $("#prov").hide();
////    $("#validarTPerfil").hide();

   

////    $("#usuario").blur(function () {

////        var countoption = $('#prov option').size();
////        var Nombre = document.getElementById("usuario").value;
////        usuario.length <= 50;

////        $.ajax({

////            type: 'POST',            
////            url: '/Usuarios/ValidarPerfil_XXX',
////            contentType: 'application/json; charset=utf-8',                         
////            data: JSON.stringify({ Nombre: Nombre })
////        })
        
////        var url = "/Usuarios/ValidarPerfil_XXX";

////        var PerfilLog = "";

////        $.getJSON(url, { Nombre: Nombre }, function (data) {
                 
////                if (data.Perfil.length == 1) {

////                    $.each(data, function (i, value) {
////                        $('#prov').empty()
                        
////                        $.each(data.Perfil, function (key, value) {
////                            $('#prov')

////                                .append($("<option></option>")
////                                             .attr("value", value.PerfilLog.substr(0, 2))                                
////                                             .text(value.PerfilLog));
////                        });
////                        $("#prov").css("margin-bottom", "10px").hide();
////                    });
                    
////                    if (Nombre == PerfilAdmin.substr(0, 5)) {
////                        $('#prov').hide();
////                    }
////                }


////                else if (data.Perfil.length > 1) {

////                    $.each(data, function (i, value) {
////                        $('#prov').empty()

////                        $.each(data.Perfil, function (key, value) {
////                            $('#prov')

////                                .append($("<option></option>")
////                                             .attr("value", value.PerfilLog.substr(0, 2))
////                                             .text(value.PerfilLog));
////                        });
////                        $("#prov").css("margin-bottom", "10px").show();                       
                        
////                    });

////                    if (Nombre == PerfilAdmin.substr(0, 5)) {
////                        $('#prov').hide();
////                    }
////                }

////                else {
////                    $("#prov").hide();
////                }
////            })
////       });

    });


