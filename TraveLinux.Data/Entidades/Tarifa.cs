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
        public string DESDE { get; set; }
        public string ESTADO { get; set; }
        public Int32 RANGO { get; set; }
        public int DINAMICO { get; set; }
        public decimal  PRECIO { get; set; }
        public string TIPO_ACOMODACION { get; set; }
        public string TIPO_HAB { get; set; }
        public string TIPO_SERVICIO { get; set; }
        public string TIPO_PERSONA { get; set; }
        public Int32 PERIODO { get; set; }
        public string DESCR_TIPO_ACOMODACION { get; set; }
        public string DESCR_TIPO_HABITACION { get; set; }
        public string TIPO_PASAJERO { get; set; }
        public DateTime? FECHA_REGISTRO { get; set; }
        public string USUARIO_REGISTRO { get; set; }
        public DateTime? FECHA_ULT_MODIF { get; set; }
        public string USUARIO_ULT_MODIF { get; set; }

        public string FECHA_INICIO_S { get; set; }
        public string FECHA_FINAL_S { get; set; }


        public Int32 RANGO_PAX { get; set; }
        public string TIPO_SERVICIO_ABREV { get; set; }

        public string TEMPORADA_S { get; set; }
        public string SGL_ROOM_S { get; set; }
        public string DWL_ROOM_S { get; set; }
        public string TPL_ROOM_S { get; set; }
        public string CDL_ROOM_S { get; set; }
        public decimal SGL_ROOM { get; set; }
        public decimal DWL_ROOM { get; set; }
        public decimal TPL_ROOM { get; set; }
        public decimal CDL_ROOM { get; set; }

        public string VALIDACION { get; set; }
        
  
    }
}
