using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class ProveedorViewModels
    {
        public int PROVEEDOR { get; set; }
        public string PROVEEDOR_NOMBRE { get; set; }        
        public string TARIFA { get; set; }
        public string TARIFA_NOMBRE { get; set; }
        public string NOMBRE { get; set; }
        public string ALIAS { get; set; }
        public string TPROVEEDOR { get; set; }
        public string TIPO { get; set; }
        public string PAIS { get; set; }
        public string PAIS_NOMBRE { get; set; }
        public string CIUDAD { get; set; }
        public string DIRECCION { get; set; }
        public string PAGINAWEB { get; set; }
        public string RUC { get; set; }
        public string IDIOMA { get; set; }
        public string ESTADO { get; set; }
        public string USUARIO_REGISTRO { get; set; }


        public string SERVICIO { get; set; }
        public string DESCRIPCION { get; set; }
        public string RANGO_DEL { get; set; }
        public string RANGO_AL { get; set; }
        public string PRECIO { get; set; }

        public string EMAIL_1 { get; set; }
        public string EMAIL_2 { get; set; }
        public string EMAIL_3 { get; set; }

        public string TELEFONO_1 { get; set; }
        public string TELEFONO_2 { get; set; }
        public string TELEFONO_3 { get; set; }

        public string NOMBRE_CONTACTO_1 { get; set; }
        public string NOMBRE_CONTACTO_2 { get; set; }
        public string NOMBRE_CONTACTO_3 { get; set; }

        public string POSICION_CONTACTO_1 { get; set; }
        public string POSICION_CONTACTO_2 { get; set; }
        public string POSICION_CONTACTO_3 { get; set; }

        public string TELEFONO_CONTACTO_1 { get; set; }
        public string TELEFONO_CONTACTO_2 { get; set; }
        public string TELEFONO_CONTACTO_3 { get; set; }

        public string NOMBRE_SERV { get; set; }
        public string DESCRIPCION_NOM { get; set; }       
        public string DESC_ESP { get; set; }
        public string DESC_INGL { get; set; }
        public string DESC_PORT { get; set; }
        public string DESC_ALE { get; set; }
        public string TIPO_SERVICIO { get; set; }
        public string TIPO_PERSONA { get; set; }

        public string DESAYUNO { get; set; }
        public string ALMUERZO { get; set; }
        public string CENA { get; set; }


        public string AEROLINEA { get; set; }
        public string RUTA { get; set; }
        public string RESUMEN { get; set; }
       


        public IEnumerable<Pais> Paises { get; set; }

        public IEnumerable<Temporada> Temporada { get; set; }



    }
}