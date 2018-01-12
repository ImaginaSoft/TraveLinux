using System;
using System.Collections.Generic;
using TraveLinux.Data.Entidades;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TraveLinux.Business
{
    public interface IFachadaNegocios
    {

        IEnumerable<TipoDocumento> ObtenerTipoDocumento();

        IEnumerable<Moneda> ObtenerMonedas();
        IEnumerable<Cliente> ObtenerListaCliente();

        IEnumerable<Tarifa> ObtenerListaTarifa(string Proveedor);

        IEnumerable<Pais> ObtenerPaises();
        IEnumerable<Proveedor> ObtenerListaProveedor();
        IEnumerable<Tarifa_Detalle> ObtenerTarifaDetalle(string Proveedor, string Tarifa);
        IEnumerable<Tarifa_Detalle> ObtenerTarifProvDetalle(string Proveedor, string Tarifa);
        IEnumerable<Proveedor> ObtenerProveedor(string sProveedor);
        Proveedor ObtenerEditarProveedor(string sProveedor);
        List<Departamentos> ListadoDepartamento(string sPais);
        void GuardarMonedas(Moneda eMoneda);
        void GuardarProveedor(Proveedor eProveedor);
        void ActualizarProveedor(Proveedor eProveedor);
        void GuardarCliente(Cliente eCliente);
        void GuardarServicio(Servicio eServicio);
        void GuardarTarifa(Tarifa eTarifa);
        void GuardarTarifa_Lista_Detalle(List<Tarifa_Detalle> lsttarifa);
    }
}
