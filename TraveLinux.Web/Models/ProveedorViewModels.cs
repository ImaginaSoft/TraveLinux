using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class ProveedorViewModels
    {
        public string PROVEEDOR { get; set; }
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

        public IEnumerable<Pais> Paises { get; set; }

    }
}