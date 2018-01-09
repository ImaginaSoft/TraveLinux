using TraveLinux.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TraveLinux.Web.Util
{
    public static class AutorizarUtil
    {
        public static bool Autorizar(HttpSessionStateBase session, Perfil[] perfiles)
        {
            var cuenta = session["CUENTA"] as Cuenta;

            if (cuenta == null || cuenta.Perfil == Perfil.Ninguno)
            {
                return false;
            }

            return perfiles.Contains(cuenta.Perfil);
        }
    }
}