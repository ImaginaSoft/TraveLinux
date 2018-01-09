using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;

namespace TraveLinux.Web.Controllers
{
    [Autorizar(Perfil.Administrador)]
    public class MonedaController : BaseController
    {
        // GET: Moneda
        public ActionResult Index() {


            return View();
        }

        public ActionResult ObtenerMonedas()
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var monedas = Fachada.ObtenerMonedas();

            return Json(monedas);
        }
        public void GuardarMonedas(Moneda eMoneda)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarMonedas(eMoneda);
            
        }
    }
}