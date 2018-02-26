using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class ServicioViewModels 
    {
        public string SERVICIO { get; set; }
        public int PROVEEDOR { get; set; }
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
        public string DESCR_TIPO_SERVICIO { get; set; }
        public string TIPO_PERSONA { get; set; }
        public string DESC_ESP { get; set; }
        public string DESC_INGL { get; set; }
        public string DESC_PORT { get; set; }
        public string DESC_ALE { get; set; }
        public int PRECIO { get; set; }
        public string RANGO_PAX { get; set; }
        public string TIPO_SERVICIO_ABREV { get; set; }
        public string TARIFA { get; set; }
        public DateTime? FECHA_FIN { get; set; }
        public DateTime? FECHA_INI { get; set; }
        public string FECHA_INI_S { get; set; }
        public string FECHA_FIN_S { get; set; }
        public string ESTADO { get; set; }
        public string USUARIO_REGISTRO { get; set; }
        public IEnumerable<Pais> Paises { get; set; }
        public IEnumerable<Periodo> Fechas { get; set; }
        public IEnumerable<TipoServicio> TipoAcomodacion { get; set; }
        public Int32 TEMPORADA { get; set; }
        public string TEMPORADA_S { get; set; }
        public string HORA { get; set; }
        public string HORA_FIN { get; set; }
        public string CIUDAD { get; set; }
        public string CIUDAD_NOMBRE { get; set; }
        public string PAIS { get; set; }
        public string PAIS_NOMBRE { get; set; }
        public string VISTA_CLIENTE { get; set; }
        public string VISTA_PROVEEDOR { get; set; }
        public string PRECIO_OBLIGATORIO { get; set; }
        public Decimal SGL_ROOM { get; set; }
        public Decimal DWL_ROOM { get; set; }
        public Decimal TPL_ROOM { get; set; }
        public Decimal CDL_ROOM { get; set; }

        public string SGL_ROOM_S { get; set; }
        public string DWL_ROOM_S { get; set; }
        public string TPL_ROOM_S { get; set; }
        public string CDL_ROOM_S { get; set; }

    }
}