using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TraveLinux.Web.Controllers
{
    public class PlantillaController : Controller
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


	}
}