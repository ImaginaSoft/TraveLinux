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
        public string SERVICIO { get; set; }
        public Int32 PROVEEDOR { get; set; }
        public string PROVEEDOR_NOMBRE { get; set; }
        public string NOMBRE { get; set; }
        public DateTime? FECHA_COMENZAR { get; set; }
        public string TEMPORADA { get; set; }
        public DateTime? FECHA_INICIO { get; set; }
        public DateTime? FECHA_FINAL { get; set; }
        public string DESCRIPCION { get; set; }
        public string NOTAS { get; set; }
        public string ESTADO { get; set; }
        public Int32 RANGO { get; set; }
        public int DINAMICO { get; set; }
        public int PRECIO { get; set; }
        public string TIPO_ACOMODACION { get; set; }
        public string TIPO_SERVICIO { get; set; }
        public string DESCR_TIPO_ACOMODACION { get; set; }
        public string TIPO_PASAJERO { get; set; }
        public DateTime? FECHA_REGISTRO { get; set; }
        public string USUARIO_REGISTRO { get; set; }
        public DateTime? FECHA_ULT_MODIF { get; set; }
        public string USUARIO_ULT_MODIF { get; set; }
    }
}
