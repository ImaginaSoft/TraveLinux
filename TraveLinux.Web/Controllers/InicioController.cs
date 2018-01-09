using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;
using System.Web.Mvc;
namespace TraveLinux.Web.Controllers
{
    [Autorizar(Perfil.Administrador, Perfil.Ejecutivo)]
    public class InicioController : BaseController
    {             
        // GET: Inicio
        public ActionResult Index()
        {
            return View();
        }
    }
}