using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using TraveLinux.Web.Models;
using TraveLinux.Business;
using TraveLinux.Web.Util;
using Newtonsoft.Json;
using System.Text;

namespace TraveLinux.Web.Controllers
{
    public class BaseController : Controller
    {
        public IFachadaNegocios Fachada
        {
            get
            {
                var conexion = WebConfigurationManager.ConnectionStrings["TraveLinuxConnection"].ConnectionString;
                var fachada = new FachadaNegocios(conexion);
                return fachada;
            }
        }

        protected string Encriptar(string pass)
        {
            string i = ConfigurationManager.AppSettings["3DESIV"];
            string k = ConfigurationManager.AppSettings["3DESKey"];
            TripleDESUtil crypto = new TripleDESUtil(i, k);
            byte[] contraseniaEncriptada = crypto.Encriptar(pass);
            string textoContraseniaEncriptada = string.Empty;
            foreach (byte item in contraseniaEncriptada)
            {
                if (textoContraseniaEncriptada == string.Empty)
                {
                    textoContraseniaEncriptada += item.ToString();
                }
                else
                    textoContraseniaEncriptada += "," + item.ToString();
            }
            string passEncry;
            passEncry = textoContraseniaEncriptada;

            return passEncry;
        }

        protected new ActionResult Json(object objeto)
        {
            return new ContentResult
            {
                Content = JsonConvert.SerializeObject(objeto, ObtenerConfiguracionJson()),
                ContentEncoding = Encoding.UTF8,
                ContentType = "application/json"
            };
        }

        private static JsonSerializerSettings ObtenerConfiguracionJson()
        {
            var configuracion = new JsonSerializerSettings();
            configuracion.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            configuracion.DateFormatString = "yyyy-MM-dd HH:mm";
            return configuracion;
        }

        public string HoraPeru()
        {
            return DateTime.Now.ToString();
        }

    }
}