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
    public class PeriodoController : BaseController
    {
        // GET: Temporada
        public ActionResult Index(string Servicio, Int32 Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            //var proveedor = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            var servprov = Fachada.ObtenerEditarServicio(Servicio, Proveedor);

            if (servprov == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            var modelo = new ServicioViewModels()
            {
                PROVEEDOR = servprov.PROVEEDOR,
                PROVEEDOR_NOMBRE = servprov.PROVEEDOR_NOMBRE,
                SERVICIO = servprov.SERVICIO,
                NOMBRE = servprov.NOMBRE,
                TIPO_SERVICIO = servprov.TIPO_SERVICIO,
                DESCR_TIPO_SERVICIO = servprov.DESCR_TIPO_SERVICIO,
            };

            return View(modelo);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoPeriodo(string Proveedor,string Servicio)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vPeriodo = Fachada.ListadoPeriodo(Proveedor, Servicio);

            return Json(vPeriodo);
        }

        [HttpPost]
        public void GuardarPeriodo(Periodo ePeriodo)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarPeriodo(ePeriodo);
        }
    }   
}