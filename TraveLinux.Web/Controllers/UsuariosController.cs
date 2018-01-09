using TraveLinux.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    public class UsuariosController : BaseController
    {

        // GET: Usuario        
        public ActionResult Login()
        {
                       
            return View();
        }

        private bool VerificarAdministrador(string username, string password)
        {
            return VerificarUsuario(new[] { "AdminUsername", "AdminPassword" }, username, password);
        }

        private bool VerificarAnonimo(string username, string password)
        {
            return VerificarUsuario(new[] { "AnonUsername", "AnonPassword" }, username, password);
        }

        private bool VerificarUsuario(string[] keys, string username, string password)
        {
            var storedUsername = WebConfigurationManager.AppSettings[keys[0]];
            storedUsername = storedUsername.ToUpper();
            var storedPassword = WebConfigurationManager.AppSettings[keys[1]];

            password = Encriptar(password);

            return username == storedUsername && password == storedPassword;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(string username, string password, string tperfil)
        {
            var PasswordOriginal = password;            

            username = username.ToUpper();
            password = Encriptar(password);


            if (username == "ADMIN")
            {
                /*var PasswordAdminEncriptado  = Encriptar(PasswordOriginal);*/

                if (VerificarAdministrador(username, PasswordOriginal))
                {
                    Session["CUENTA"] = new Cuenta
                    {
                        Usuario = username,
                        Password = PasswordOriginal,
                        Nombre = "Administrador Del Sistema",
                        Email = "admin@TraveLinux.com",
                        Perfil = Perfil.Administrador
                    };

                    return RedirectToAction("Index", "Inicio");
                }
            }

            if (username == "BDAVID")
            {
                /*var PasswordAdminEncriptado  = Encriptar(PasswordOriginal);*/

                if (VerificarAnonimo(username, PasswordOriginal))
                {
                    Session["CUENTA"] = new Cuenta
                    {
                        Usuario = username,
                        Password = PasswordOriginal,
                        Nombre = "Ejecutivo",
                        Email = "bdavid@TraveLinux.com",
                        Perfil = Perfil.Ejecutivo
                    };

                    return RedirectToAction("Index", "Inicio");
                }
            }


            if (username != "")
            {
                if (username != "ADMIN" || username != "BDAVID")
                {
                    ViewBag.Message = "Error al ingresar Usuario / Password";
                    return View();
                }

            }

            return RedirectToAction("Login", "Usuarios");
        }

        public ActionResult Validar_Usuario()
        {


            return RedirectToAction("Login");
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Login");
        }
    }
}