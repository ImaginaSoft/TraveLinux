using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    public class ServiciosController : BaseController
    {
        // GET: Servicios
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NuevoServicio()
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            
            return View();
        }

        [HttpPost]
        public void GuardarServicio(Servicio eServicio)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarServicio(eServicio);
        }

    }
}