using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TraveLinux.Web.Controllers
{
    public class CotizacionController : Controller
    {
        // GET: Cotizacion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ServicioCotizacion()
        {
            return View();
        }
    }
}