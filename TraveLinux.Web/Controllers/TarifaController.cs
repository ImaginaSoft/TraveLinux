using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;
using System.Web.Configuration;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    [Autorizar(Perfil.Administrador)]
    public class TarifaController : BaseController
    {
        [Autorizar(Perfil.Administrador)]        
        public ActionResult TarifaProveedor(string Proveedor)
        {
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

        public ActionResult NuevaTarifa(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var proveedor = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            if (proveedor == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            var modelo = new ProveedorViewModels();
            modelo.Temporada = Fachada.ObtenerTemporadas();

            {
                modelo.PROVEEDOR = proveedor.PROVEEDOR;
                modelo.NOMBRE = proveedor.NOMBRE;
            };
            return View(modelo);
        }

        public void GuardarTarifa(Tarifa eTarifa)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarTarifa(eTarifa);
        }

        public ActionResult ListadoTarifa(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vTarifa = Fachada.ObtenerListaTarifa(Proveedor);

            return Json(vTarifa);
        }

        public ActionResult ListadoFechasXTemporada(string Temporada)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vTemporada = Fachada.ListadoFechasXTemporada(Temporada);

            return Json(vTemporada);
        }
    }
}