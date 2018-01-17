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
            var cuenta = Session["CUENTA"] as Cuenta;
            var ObtenerCliente = Fachada.ObtenerEditarCliente(Cliente);
            var modelo = new ClienteViewModels();
            modelo.TipoDocumentos = Fachada.ObtenerTipoDocumento();            
            modelo.Paises = Fachada.ObtenerPaises();
            {                
                modelo.CLIENTE = ObtenerCliente.CLIENTE;
                modelo.NOMBRE = ObtenerCliente.NOMBRE;
                modelo.PATERNO = ObtenerCliente.PATERNO;
                modelo.MATERNO = ObtenerCliente.MATERNO;
                modelo.DOCUMENTO = ObtenerCliente.DOCUMENTO;
                modelo.NUMERO = ObtenerCliente.NUMERO;
                modelo.FEC_NACIMIENTO = ObtenerCliente.FEC_NACIMIENTO;
                modelo.RANGO_EDAD = ObtenerCliente.RANGO_EDAD;
                modelo.ESTADO_CIVIL = ObtenerCliente.ESTADO_CIVIL;
                modelo.GENERO = ObtenerCliente.GENERO;
                modelo.PAIS = ObtenerCliente.PAIS;
                modelo.NOMBRE_PAIS = ObtenerCliente.NOMBRE_PAIS;
                modelo.DEPARTAMENTO = ObtenerCliente.DEPARTAMENTO;
                modelo.DIRECCION = ObtenerCliente.DIRECCION;
                modelo.IDIOMA = ObtenerCliente.IDIOMA;
                modelo.EMAIL = ObtenerCliente.EMAIL;
                modelo.EMAIL_2 = ObtenerCliente.EMAIL_2;
                modelo.EMAIL_3 = ObtenerCliente.EMAIL_3;
                modelo.TELEFONO = ObtenerCliente.TELEFONO;
                modelo.TELEFONO_2 = ObtenerCliente.TELEFONO_2;
                modelo.TELEFONO_3 = ObtenerCliente.TELEFONO_3;
                modelo.NOTAS = ObtenerCliente.NOTAS;
                modelo.ESTADO = ObtenerCliente.ESTADO;

            }
            


            return View(modelo);
        }

        [HttpPost]
        public void GuardarCliente(Cliente eCliente)
        {
            var cuenta = Session["CUENTA"] as Cuenta;           

            Fachada.GuardarCliente(eCliente);
        }

        [HttpPost]
        public void ActualizarCliente(Cliente eCliente)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.ActualizarCliente(eCliente);
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