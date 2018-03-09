using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Web.Models
{
    interface IModeloValidable
    {
        bool Validar();
        string MensajeError { get; set; }
    }
}
