using TraveLinux.Data.Entidades;
using TraveLinux.Web.Controllers;
using System.Net;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;


namespace TraveLinux.Web.Filters
{
    public class FiltroValidadorSesion : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!(filterContext.Controller is UsuariosController))
            {
                var cuenta = filterContext.HttpContext.Session["CUENTA"] as Cuenta;

                if (cuenta == null)
                {
                    var code = (int)HttpStatusCode.Unauthorized;
                    var description = "La sesión ha caducado. Por favor inicie sesión nuevamente.";

                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {
                        filterContext.Result = new JsonResult
                    {
                        ContentType = "application/json",
                            ContentEncoding = Encoding.UTF8,
                            Data = new { Error = true, Descripcion = description },
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                        };
                    }
                    else
                    {
                        filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary {
                            { "Controller", "Usuarios" },
                            { "Action", "Login" }
                        });
                    }

                    filterContext.HttpContext.Response.Clear();
                    filterContext.HttpContext.Response.StatusCode = code;
                    filterContext.HttpContext.Response.StatusDescription = description;
                    return;
                }
                
                filterContext.Controller.ViewBag.Usuario = cuenta.Usuario;
                filterContext.Controller.ViewBag.Nombre = cuenta.Nombre;
                filterContext.Controller.ViewBag.Email = cuenta.Email;
                filterContext.Controller.ViewBag.Rol = cuenta.Rol;
            }
        }
    }
}