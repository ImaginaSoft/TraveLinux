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
        IEnumerable<Tarifa> ObtenerListaTarifa(string Proveedor, string Servicio);
        IEnumerable<Pais> ObtenerPaises();
        IEnumerable<Temporada> ObtenerTemporadas();
        IEnumerable<Proveedor> ObtenerListaProveedor();
        IEnumerable<Tarifa_Detalle> ObtenerTarifaDetalle(int Proveedor, string Tarifa);
        IEnumerable<Servicio> ListadoServicioxProveedor(string Proveedor);
        IEnumerable<Periodo> ListadoPeriodo(string Proveedor, string Servicio);
        IEnumerable<Periodo> ListaFechasPeriodo(string Servicio, string Proveedor);
        IEnumerable<Tarifa_Detalle> ObtenerTarifProvDetalle(int Proveedor, string Tarifa);
        IEnumerable<Proveedor> ObtenerProveedor(string sProveedor);
        Proveedor ObtenerEditarProveedor(int sProveedor);
        Cliente ObtenerEditarCliente(string sCliente);
        Servicio ObtenerEditarServicio(string sServicio, string sProveedor);
        List<Departamentos> ListadoDepartamento(string sPais);
        Temporada ListadoFechasXTemporada(string Temporada);
        void GuardarMonedas(Moneda eMoneda);
        void GuardarProveedor(Proveedor eProveedor);
        void ActualizarProveedor(Proveedor eProveedor);
        void ActualizarCliente(Cliente eCliente);
        void ActualizarServicio(Servicio eServicio);
        void GuardarCliente(Cliente eCliente);
        void GuardarServicio(Servicio eServicio);
        void GuardarTarifa(List<Tarifa> eTarifa);
        void GuardarPeriodo(Periodo ePeriodo);
        void GuardarPeriodoCap_Lista_Detalle(List<Tarifa_Detalle> lsttarifa, int validado);
        void GuardarTarifa_Lista_Detalle(List<Tarifa_Detalle> lsttarifa,int validado);
        IEnumerable<Servicio> ObtenerServicioProv(string Proveedor, string Servicio);
        void GuardarServicio_Lista_Detalle(List<Servicio> lstServCarg);
        


    }
}
