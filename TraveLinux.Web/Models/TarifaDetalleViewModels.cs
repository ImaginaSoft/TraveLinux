using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TraveLinux.Web.Models
{
    public class TarifaDetalleViewModels
    {
        public string PROVEEDOR { get; set; }
        public string TARIFA { get; set; }
        public string SERVICIO { get; set; }        
        public string DESCRIPCION { get; set; }
        public string RANGO_DEL { get; set; }
        public string RANGO_AL { get; set; }
        public string PRECIO { get; set; }
        public string DETALLE { get; set; }
    }
}