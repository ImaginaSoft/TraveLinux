using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class ClienteViewModels
    {
        public string CLIENTE { get; set; }
        public string NOMBRE { get; set; }
        public string PATERNO { get; set; }
        public string MATERNO { get; set; }
        public string DOCUMENTO { get; set; }
        public string NUMERO { get; set; }
        public DateTime? FEC_NACIMIENTO { get; set; }
        public string ESTADO_CIVIL { get; set; }
        public string GENERO { get; set; }
        public string PAIS { get; set; }
        public string NOMBRE_PAIS { get; set; }
        public string DEPARTAMENTO { get; set; }
        public string RANGO_EDAD { get; set; }
        public string DIRECCION { get; set; }
        public string IDIOMA { get; set; }
        public string EMAIL { get; set; }
        public string EMAIL_2 { get; set; }
        public string EMAIL_3 { get; set; }
        public string TELEFONO { get; set; }
        public string TELEFONO_2 { get; set; }
        public string TELEFONO_3 { get; set; }
        public string ESTADO { get; set; }
        public string NOTAS { get; set; }
        public IEnumerable<Pais> Paises { get; set; }
        public IEnumerable<TipoDocumento> TipoDocumentos { get; set; }
    }
}