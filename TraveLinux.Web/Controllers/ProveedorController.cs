using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Web.Util;
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

        public ActionResult EditarProveedor(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;            
            var ObtenerProveedor = Fachada.ObtenerEditarProveedor(Proveedor);            
            var modelo = new ProveedorViewModels();
            modelo.Paises = Fachada.ObtenerPaises();
            {
                modelo.PROVEEDOR = ObtenerProveedor.PROVEEDOR;
                modelo.PROVEEDOR_NOMBRE = ObtenerProveedor.NOMBRE;
                modelo.ALIAS = ObtenerProveedor.ALIAS ;
                modelo.TPROVEEDOR  = ObtenerProveedor.TPROVEEDOR;
                modelo.TIPO = ObtenerProveedor.TIPO;
                modelo.PAIS  = ObtenerProveedor.PAIS;
                modelo.PAIS_NOMBRE = ObtenerProveedor.NOMBRE_PAIS;
                modelo.CIUDAD = ObtenerProveedor.CIUDAD ;
                modelo.DIRECCION = ObtenerProveedor.DIRECCION;
                modelo.IDIOMA = ObtenerProveedor.IDIOMA;
                modelo.PAGINAWEB = ObtenerProveedor.PAGINAWEB;
                modelo.RUC = ObtenerProveedor.RUC;
                modelo.EMAIL_1 = ObtenerProveedor.EMAIL_1;
                modelo.EMAIL_2 = ObtenerProveedor.EMAIL_2;
                modelo.EMAIL_3 = ObtenerProveedor.EMAIL_3;
                modelo.TELEFONO_1 = ObtenerProveedor.TELEFONO_1;
                modelo.TELEFONO_2 = ObtenerProveedor.TELEFONO_2;
                modelo.TELEFONO_3 = ObtenerProveedor.TELEFONO_3;
                modelo.ESTADO = ObtenerProveedor.ESTADO;
            }
            

            return View(modelo);
        }

        [HttpPost]
        public void GuardarProveedor(Proveedor eProveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarProveedor(eProveedor);
        }

        [HttpPost]
        public void ActualizarProveedor(Proveedor eProveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.ActualizarProveedor(eProveedor);
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