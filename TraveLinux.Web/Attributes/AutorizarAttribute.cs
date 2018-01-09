using TraveLinux.Data.Entidades;
using TraveLinux.Web.Util;
using System.Net;
using System.Text;
using System.Web.Mvc;
using System.Web.Routing;

namespace TraveLinux.Web.Attributes
{
    public class AutorizarAttribute : FilterAttribute, IAuthorizationFilter
    {
        private Perfil[] perfiles;

        public AutorizarAttribute(params Perfil[] perfiles)
        {
            this.perfiles = perfiles;
        }

        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if (!AutorizarUtil.Autorizar(filterContext.HttpContext.Session, perfiles))
            {
                var code = (int)HttpStatusCode.Forbidden;
                var description = "No tiene permisos para ejecutar esta acción.";

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
                        { "Controller", "Error" },
                        { "Action", "Index" },
                        { "e", code }
                    });
                }

                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.StatusCode = code;
                filterContext.HttpContext.Response.StatusDescription = description;
            }
        }
    }
}