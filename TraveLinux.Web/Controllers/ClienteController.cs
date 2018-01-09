using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;
using System.Web.Mvc;
using TraveLinux.Web.Models;
using TraveLinux.Web.Attributes;

namespace TraveLinux.Web.Controllers
{
    [Autorizar(Perfil.Administrador)]
    public class ClienteController : BaseController
    {
        // GET: Cliente
        public ActionResult Index()
        {
            //var modelo = new MantenimientoUsuariosViewModel();
            //modelo.TipoDocumentos = Fachada.ObtenerTipoDocumento();
            //return View(modelo);

            //var modelo = new ();
            //modelo.TipoDocumentos = Fachada.ObtenerListaCliente();
            //return View(modelo);
            return View();
        }
        [Autorizar(Perfil.Administrador)]
        public ActionResult EditarCliente(string Cliente)
        {
            //var modelo = new MantenimientoUsuariosViewModel();
            //modelo.TipoDocumentos = Fachada.ObtenerTipoDocumento();
            //return View(modelo);

            //var modelo = new ();
            //modelo.TipoDocumentos = Fachada.ObtenerListaCliente();
            //return View(modelo);
            return View();
        }

        [HttpPost]
        public void GuardarCliente(Cliente eCliente)
        {
            var cuenta = Session["CUENTA"] as Cuenta;           

            Fachada.GuardarCliente(eCliente);
        }
        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoCliente()
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vCliente = Fachada.ObtenerListaCliente();
           
            return Json(vCliente);
           

        }
        [Autorizar(Perfil.Administrador)]
        public ActionResult NuevoCliente()
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var modelo = new MantenimientoUsuariosViewModel();
            modelo.TipoDocumentos = Fachada.ObtenerTipoDocumento();
            modelo.Paises = Fachada.ObtenerPaises();
            return View(modelo);
        }

        public ActionResult ListadoDepartamento(string Pais)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var departamento = Fachada.ListadoDepartamento(Pais);

            return Json(departamento);


        }


    }
}