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


        public ActionResult CrearPlantillaDetalle()
        {
            return View();
        }

        public ActionResult BuscarPlantilla(){
            return View();
        }

        [HttpPost]
        public void GuardarPlantilla(Plantilla ePlantilla)  {

            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarPlantilla(ePlantilla);


        }


	}
}