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
        IEnumerable<Cliente> ObtenerListaCliente(string Estado);
        IEnumerable<Tarifa> ObtenerTarifHotel();
        IEnumerable<Tarifa> ObtenerTariTerAer();
        IEnumerable<Tarifa> ObtenerListaTarifa(Int32 Proveedor, string Servicio, string Tarifa);
        IEnumerable<Tarifa> ObtenerListaTarifaHoteles(Int32 Proveedor, string Servicio, string Tarifa);
        IEnumerable<Pais> ObtenerPaises();
        IEnumerable<Temporada> ObtenerTemporadas();
        IEnumerable<Proveedor> ObtenerListaProveedor(string Estado);
        IEnumerable<Tarifa_Detalle> ObtenerTarifaDetalle(int Proveedor, string Tarifa);
        IEnumerable<Servicio> ListadoServicioxProveedor(string Proveedor);
        IEnumerable<Periodo> ListadoPeriodo(string Proveedor, string Servicio);
        IEnumerable<Periodo> ListaFechasPeriodo(string Servicio, Int32 Proveedor);
        IEnumerable<Tarifa_Detalle> ObtenerTarifProvDetalle(int Proveedor, string Tarifa);
        IEnumerable<Proveedor> ObtenerProveedor(string sProveedor);
        Proveedor ObtenerEditarProveedor(int sProveedor);
        Cliente ObtenerEditarCliente(string sCliente);
        Servicio ObtenerEditarServicio(string sServicio, Int32 sProveedor);
        IEnumerable<TipoServicio> ObtenerListAcomodacion(string TipoServicio);
        List<Departamentos> ListadoDepartamento(string sPais);
        Temporada ListadoFechasXTemporada(string Temporada);
        void GuardarMonedas(Moneda eMoneda);
        void GuardarProveedor(Proveedor eProveedor);
        void ActualizarProveedor(Proveedor eProveedor);
        void EliminarProveedor(Int32 Proveedor);
        void EliminarServicio(string Servicio, Int32 Proveedor);
        void ActualizarCliente(Cliente eCliente);
        void ActualizarServicio(Servicio eServicio);
        void GuardarCliente(Cliente eCliente);
        void GuardarServicio(Servicio eServicio);
        void GuardarTarifa(List<Tarifa> eTarifa);
        void ActualizarRangoHoteles(List<Tarifa> lstTarifas);
        void GuardarPeriodo(Periodo ePeriodo);
        void Copiar_Temporal_ServicioHotel(int iProveedor);
        void GuardarPeriodoCap_Lista_Detalle(List<Tarifa_Detalle> lsttarifa, int validado);
        void GuardarPeriodoCap_Lista_Detalle_Hoteles(List<Tarifa_Detalle> lsttarifa, int validado);
        void GuardarTarifa_Lista_Detalle_Hoteles(List<Tarifa_Detalle> lsttarifa, int validado);
        void GuardarTarifa_Lista_Detalle(List<Tarifa_Detalle> lsttarifa, int validado);
        IEnumerable<Servicio> ObtenerServicioProv(string Proveedor, string Servicio);
        //Tarifa ValidarRango(Int32 Rango);
        //void ValidarRango(Tarifa  eTarifa);
        Tarifa ValidarRango(Tarifa eTarifa);
        void GuardarServicio_Lista_Detalle(List<Servicio> lstServCarg);
        void GuardarPlantilla(Plantilla ePlantilla);
        IEnumerable<Plantilla> ObtenerListaPlantilla(string Estado);
        IEnumerable<Plantilla> ObtenerPlantilla(string Plantilla);
        IEnumerable<Proveedor> ObtenerProveedorPlantilla();
        List<Departamentos> ListadoCiudadServProveedor(string sProveedor);
        List<Servicio> ListadoServicioxProvPlantilla(string sProveedor, string sTipo_Servicio, string sCiudad);
        List<TipoServicio> ObtenerListAcomodacionPlantilla(string sTipoServicio);
        void GuardarPlantillaDetalle(PlantillaDetalle ePlantillaDetalle);
        IEnumerable<PlantillaDetalle> ListadoDetallePlantilla(string Proveedor);
        void Guardar_Carga_Hotel_Temporal(List<Tarifa> usersList);

        void Guardar_Carga_TerAer_Temporal(List<Tarifa> usersList);

        void Eliminar_TablaTemporal();
        void Eliminar_Tabla_Temporal_Hotel();
        void EliminarTarifa(string Tarifa, Int32 Proveedor, string Rango, string Tipo_Pasajero);
        Proveedor ValidarRuc(Proveedor eProveedor);
        void EliminarCliente(string Cliente);
    }
}
