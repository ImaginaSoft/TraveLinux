using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Business
{
    public class FachadaNegociosException : Exception
    {
        public FachadaNegociosException(string message) : base(message)
        {

        }

        public FachadaNegociosException(string message, Exception cause) : base(message, cause)
        {

        }
    }
}
