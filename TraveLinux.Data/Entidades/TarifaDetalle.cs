using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Data.Entidades
{
    public class Tarifa_Detalle
    {
        public int PROVEEDOR { get; set; }
        public string PROVEEDOR_NOMBRE { get; set; }
        public string TARIFA { get; set; }
        public string TARIFA_NOMBRE { get; set; }
        public string SERVICIO { get; set; }
        public string DESCRIPCION { get; set; }
        public string RANGO_DEL { get; set; }
        public string RANGO_AL { get; set; }        
        public string TIPO_SERVICIO { get; set; }
        public DateTime? FECHA_INICIO { get; set; }
        public DateTime? FECHA_FIN { get; set; }
        public string TIPO_PERSONA { get; set; }
        public string RANGO_PAX { get; set; }
        public Int32 PRECIO { get; set; }
        public string TIPO_SERVICIO_2 { get; set; }
        

    }
}
