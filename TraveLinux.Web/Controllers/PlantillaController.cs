using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    public class PlantillaController : BaseController
    {
        //
        // GET: /Plantilla/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CrearPlantilla() 
        {
            return View();
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult CrearPlantillaDetalle(string Plantilla)
        {

            var cuenta = Session["CUENTA"] as Cuenta;


            var plantilla = Fachada.ObtenerPlantilla(Plantilla).FirstOrDefault();

            if( plantilla == null){

                 return HttpNotFound("No se encontró la plantilla solicitada");

            }

            var modelo = new PlantillaViewModels();


            modelo.Proveedores = Fachada.ObtenerProveedorPlantilla();

            {
                modelo.ID_PLANTILLA = plantilla.ID_PLANTILLA;

            }

            ViewBag.contador=0;

            return View(modelo);
        }

        public ActionResult BuscarPlantilla(){
            return View();
        }

        [HttpPost]
        public void GuardarPlantilla(Plantilla ePlantilla)  {

            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarPlantilla(ePlantilla);

        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoPlantilla(PlantillaViewModels Filtro)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vPlantilla = Fachada.ObtenerListaPlantilla(Filtro.ESTADO);

            return Json(vPlantilla);
        }


        public ActionResult ListadoCiudadServProveedor(string Proveedor)
        {

            var cuenta = Session["CUENTA"] as Cuenta;
            var ciudad = Fachada.ListadoCiudadServProveedor(Proveedor);

            return Json(ciudad);


        }


        public ActionResult ListadoServicioxProvPlantilla(string sProveedor, string sTipo_Servicio, string sCiudad)
        {

            var cuenta = Session["CUENTA"] as Cuenta;
            var servicio = Fachada.ListadoServicioxProvPlantilla(sProveedor, sTipo_Servicio, sCiudad);

            return Json(servicio);


        }


	}
}