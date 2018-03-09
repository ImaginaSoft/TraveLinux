using TraveLinux.Web.Models;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace CondorTravel.Web.Filters
{
    public class FiltroValidadorParametros : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var filtros = filterContext.ActionParameters.Values.OfType<IModeloValidable>().ToList();

            foreach (var filtro in filtros)
            {
                if (filtro == null)
                {
                    filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.BadRequest, "No se ha recibido información.");
                    return;
                }

                if (!filtro.Validar())
                {
                    filterContext.Result = new HttpStatusCodeResult(HttpStatusCode.BadRequest, filtro.MensajeError);
                    return;
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }
}