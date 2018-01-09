using TraveLinux.Web.Filters;
using System.Web;
using System.Web.Mvc;

namespace TraveLinux.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new FiltroValidadorSesion());
        }
    }
}
