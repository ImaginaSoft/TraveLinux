using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    public class PeriodoController : BaseController
    {
        // GET: Temporada
        public ActionResult Index(string Servicio, string Proveedor)
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
            };

            return View(modelo);
        }
    }
}