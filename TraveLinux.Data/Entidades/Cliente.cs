using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Data.Entidades
{
    public class Cliente
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
        public string DEPARTAMENTO { get; set; }
        public string DISTRITO { get; set; }
        public string DIRECCION { get; set; }
        public string IDIOMA { get; set; }
        public string EMAIL { get; set; }
        public string EMAIL_2 { get; set; }
        public string EMAIL_3 { get; set; }
        public string TELEFONO { get; set; }
        public string TELEFONO_2 { get; set; }
        public string TELEFONO_3 { get; set; }
        public string ESTADO { get; set; }
        public DateTime? FECHA_REGISTRO { get; set; }
        public string USUARIO_REGISTRO { get; set; }
        public DateTime? FECHA_ULT_MODIF { get; set; }
        public string USUARIO_ULT_MODIF { get; set; }
    }
}
