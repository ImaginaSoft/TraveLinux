using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Data.Entidades
{
    public class Servicio
    {
        public string SERVICIO { get; set; }
        public Int32 PROVEEDOR { get; set; }
        public string PROVEEDOR_NOMBRE { get; set; }
        public string NOMBRE { get; set; }
        public string TIPO { get; set; }
        public string VALORXSERVICIO { get; set; }
        public string VALOR { get; set; }
        public string DURACION { get; set; }        
        public string TURNO { get; set; }
        public string DESAYUNO { get; set; }
        public string ALMUERZO { get; set; }
        public string CENA { get; set; }        
        public string AEROLINEA { get; set; }
        public string BOX_LUNCH { get; set; }
        public string RUTA { get; set; }
        public string DESCRIPCION { get; set; }
        public string TIPO_SERVICIO { get; set; }
        public string TIPO_PERSONA { get; set; }
        public string DESC_ESP { get; set; }
        public string DESC_INGL { get; set; }
        public string DESC_PORT { get; set; }
        public string DESC_ALE { get; set;}
        public string CIUDAD { get; set; }
        public DateTime HORA { get; set; }
        public DateTime HORA_FIN { get; set; }
        public DateTime INICIO_SERVICIO { get; set; }  
        public string VISTA_CLIENTE { get; set; }
        public string VISTA_PROVEEDOR { get; set; }
        public string PRECIO_OBLIGATORIO { get; set; }
        public string PRECIO { get; set; }
        public string RANGO_PAX { get; set; }
        public string TIPO_SERVICIO_ABREV { get; set; }
        public string FECHA_FIN { get; set; }
        public string FECHA_INI { get; set; }
        public string ESTADO { get; set; }
        public string USUARIO_REGISTRO { get; set; }

    }
}
