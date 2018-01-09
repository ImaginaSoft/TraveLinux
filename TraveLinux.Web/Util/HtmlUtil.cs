using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;
using System.Web.Mvc;

namespace TraveLinux.Web.Util
{
    public static class HtmlUtil
    {
        public static bool Autorizar(this HtmlHelper helper, params Perfil[] perfiles)
        {
            return AutorizarUtil.Autorizar(helper.ViewContext.HttpContext.Session, perfiles);
        }
    }
}