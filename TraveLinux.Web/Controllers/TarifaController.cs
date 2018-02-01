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
        public ActionResult TarifaProveedor(string Servicio, Int32 Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;            

            var servprov = Fachada.ObtenerEditarServicio(Servicio, Proveedor);

            if (servprov == null )
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            var modelo = new ServicioViewModels();
            modelo.Fechas = Fachada.ListaFechasPeriodo(Servicio, Proveedor);            
            {
                modelo.PROVEEDOR = servprov.PROVEEDOR;                
                modelo.PROVEEDOR_NOMBRE = servprov.PROVEEDOR_NOMBRE;
                modelo.SERVICIO = servprov.SERVICIO;
                modelo.NOMBRE = servprov.NOMBRE;
                modelo.TIPO_SERVICIO = servprov.TIPO_SERVICIO;
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

        //public void GuardarTarifa(Tarifa eTarifa)
        //{
        //    var cuenta = Session["CUENTA"] as Cuenta;

        //    Fachada.GuardarTarifa(eTarifa);
        //}

        [HttpPost]
        public void GuardarTarifa(List<Tarifa> lstTarifas)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarTarifa(lstTarifas);
        }

        //public ActionResult ListadoTarifa(string Proveedor , string Servicio, string Tarifa)
        public ActionResult ListadoTarifa(TarifaDetalleViewModels filtro)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vTarifa = Fachada.ObtenerListaTarifa(filtro.PROVEEDOR, filtro.SERVICIO, filtro.TARIFA);

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
