using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Data.Entidades
{
    public class Tarifa
    {
        public string TARIFA { get; set; }
        public string PROVEEDOR { get; set; }
        public string PROVEEDOR_NOMBRE { get; set; }
        public string NOMBRE { get; set; }
        public DateTime? FECHA_COMENZAR { get; set; }
        public DateTime? FECHA_INICIO { get; set; }
        public DateTime? FECHA_FINAL { get; set; }
        public string NOTAS { get; set; }
        public string ESTADO { get; set; }
        public int DINAMICO { get; set; }
        public DateTime? FECHA_REGISTRO { get; set; }
        public string USUARIO_REGISTRO { get; set; }
        public DateTime? FECHA_ULT_MODIF { get; set; }
        public string USUARIO_ULT_MODIF { get; set; }
    }
}
