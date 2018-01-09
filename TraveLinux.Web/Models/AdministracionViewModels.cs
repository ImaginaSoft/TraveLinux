using System.Collections.Generic;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class MantenimientoUsuariosViewModel
    {
        public IEnumerable<Cuenta> Proveedores { get; set; }
        public IEnumerable<TipoDocumento> TipoDocumentos { get; set; }
        public IEnumerable<Cuenta> Usuarios { get; set; }

        public IEnumerable<Cuenta> Perfil { get; set; }

        public IEnumerable<Cuenta> Empleados { get; set; }
        public IEnumerable<Pais> Paises { get; set; }
    }
}