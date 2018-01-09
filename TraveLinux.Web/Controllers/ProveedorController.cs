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
    [Autorizar(Perfil.Administrador)]
    public class ProveedorController : BaseController
    {
        // GET: Proveedor

        public ActionResult Index() {

            return View();
        }

        public ActionResult NuevoProveedor()
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var modelo = new MantenimientoUsuariosViewModel();            
            modelo.Paises = Fachada.ObtenerPaises();
            return View(modelo);
        }

        [HttpPost]
        public void GuardarProveedor(Proveedor eProveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarProveedor(eProveedor);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoProveedor()
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vProveedor = Fachada.ObtenerListaProveedor();

            return Json(vProveedor);
        }
    }
}