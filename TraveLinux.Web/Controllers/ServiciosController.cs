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
    public class ServiciosController : BaseController
    {
        // GET: Servicios
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NuevoServicio(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var ObtenerProveedor = Fachada.ObtenerEditarProveedor(Proveedor);
            var modelo = new ServicioViewModels();
            {

                modelo.PROVEEDOR = ObtenerProveedor.PROVEEDOR;
                modelo.PROVEEDOR_NOMBRE = ObtenerProveedor.NOMBRE;
            }

            return View(modelo);
        }

        [HttpPost]
        public void GuardarServicio(Servicio eServicio)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarServicio(eServicio);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ServicioProveedor(string Proveedor) {

            var cuenta = Session["CUENTA"] as Cuenta;

            var proveedor = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            if (proveedor == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            var modelo = new ProveedorViewModels()
            {
                PROVEEDOR = proveedor.PROVEEDOR,
                NOMBRE = proveedor.NOMBRE
            };

            return View(modelo);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoServicioxProveedor(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vServicio = Fachada.ListadoServicioxProveedor(Proveedor);

            return Json(vServicio);
        }

    }
}