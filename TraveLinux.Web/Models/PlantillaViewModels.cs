using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TraveLinux.Data.Entidades;

namespace TraveLinux.Web.Models
{
    public class PlantillaViewModels
    {

        public string ID_PLANTILLA { get; set; }
        public string DESCRIPCION { get; set; }
        public string EJECUTIVA { get; set; }
        public Int32 CANT_CHILD { get; set; }
        public Int32 CANT_ADULT { get; set; }
        public Int32 CANT_PAX { get; set; }
        public string ESTADO { get; set; }
        public DateTime? FECHA_INI { get; set; }
        public Int32 MARKUP { get; set; }
        public IEnumerable<Proveedor> Proveedores { get; set; }

        

    }
}