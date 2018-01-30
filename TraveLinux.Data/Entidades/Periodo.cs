using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Data.Entidades
{
    public class Periodo
    {
        public string ID_TARIFA { get; set; }
        public int PROVEEDOR { get; set; }
        public string SERVICIO { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime? FECHA_INICIO { get; set; }
        public DateTime? FECHA_FIN { get; set; }
        public string FECHA { get; set; }
        public string TIPO_SERVICIO { get; set; }
        public string USUARIO_REGISTRO { get; set; }

    }
}
