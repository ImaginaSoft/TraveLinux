using System;
using TraveLinux.Data.Entidades;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TraveLinux.Data;

namespace TraveLinux.Business
{
    public class FachadaNegocios : IFachadaNegocios
    {
        public string ConnectionString { get; private set; }
        public FachadaNegocios(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public void GuardarCliente(Cliente eCliente)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarCliente(eCliente);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el cliente", e);
            }
        }
        public IEnumerable<TipoDocumento> ObtenerTipoDocumento()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var tdocumentos = datos.ObtenerTipoDocumento();
                return tdocumentos;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los Tipos de documentos", e);
            }
        }
        public IEnumerable<Moneda> ObtenerMonedas()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var monedas = datos.ObtenerMonedas();
                return monedas;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener las monedas", e);
            }
        }
        public IEnumerable<Cliente> ObtenerListaCliente()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var cliente = datos.ObtenerListaCliente();
                return cliente;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los clientes", e);
            }
        }
        public IEnumerable<Proveedor> ObtenerListaProveedor(string Estado)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var proveedor = datos.ObtenerListaProveedor(Estado);
                return proveedor;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los proveedores", e);
            }
        }


        public IEnumerable<Tarifa_Detalle> ObtenerTarifaDetalle(int Proveedor, string Tarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var TarifDetalle = datos.ObtenerTarifaDetalle(Proveedor, Tarifa);
                return TarifDetalle;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el detalle tarifa", e);
            }
        }

        public IEnumerable<Tarifa_Detalle> ObtenerTarifProvDetalle(int Proveedor, string Tarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var TarifDetalle = datos.ObtenerTarifProvDetalle(Proveedor, Tarifa);
                return TarifDetalle;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el detalle tarifa", e);
            }
        }

        public IEnumerable<Tarifa> ObtenerListaTarifa(Int32 Proveedor, string Servicio, string Tarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var tarifa = datos.ObtenerListaTarifa(Proveedor, Servicio, Tarifa);
                return tarifa;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los proveedores", e);
            }
        }


        public IEnumerable<Tarifa> ObtenerListaTarifaHoteles(Int32 Proveedor, string Servicio, string Tarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var tarifa = datos.ObtenerListaTarifaHoteles(Proveedor, Servicio, Tarifa);
                return tarifa;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los proveedores", e);
            }
        }

        public IEnumerable<Servicio> ListadoServicioxProveedor(string Proveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var servicio = datos.ListadoServicioxProveedor(Proveedor);
                return servicio;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los servicios", e);
            }
        }

        public IEnumerable<Periodo> ListadoPeriodo(string Proveedor, string Servicio)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var periodo = datos.ListadoPeriodo(Proveedor, Servicio);
                return periodo;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los periodos", e);
            }
        }
        public IEnumerable<Periodo> ListaFechasPeriodo(string Servicio, Int32 Proveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var periodo = datos.ListaFechasPeriodo(Servicio, Proveedor);
                return periodo;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo listar las fechas de periodos", e);
            }
        }
        public void GuardarMonedas(Moneda eMoneda)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarMoneda(eMoneda);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar la moneda", e);
            }
        }

        public void GuardarProveedor(Proveedor eProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarProveedor(eProveedor);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el proveedor", e);
            }
        }

        public void ActualizarProveedor(Proveedor eProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.ActualizarProveedor(eProveedor);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo actualizar el proveedor", e);
            }
        }

        public void EliminarProveedor(Int32 Proveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.EliminarProveedor(Proveedor);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo eliminar el proveedor", e);
            }
        }

        public void EliminarServicio(string Servicio, Int32 Proveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.EliminarServicio(Servicio, Proveedor);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo eliminar el servicio", e);
            }
        }

        public void EliminarTarifa(string Tarifa, Int32 Proveedor, string Rango, string Tipo_Pasajero)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.EliminarTarifa(Tarifa, Proveedor, Rango, Tipo_Pasajero);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo eliminar la tarifa", e);
            }
        }

        public void GuardarServicio(Servicio eServicio)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarServicio(eServicio);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el servicio", e);
            }
        }

        public void GuardarTarifa(Tarifa eTarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarTarifa(eTarifa);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar la tarifa", e);
            }
        }

        public void GuardarPeriodo(Periodo ePeriodo)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarPeriodo(ePeriodo);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el periodo", e);
            }
        }

        public IEnumerable<Pais> ObtenerPaises()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var paises = datos.ObtenerPaises();
                return paises;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los paises", e);
            }
        }

        public IEnumerable<Temporada> ObtenerTemporadas()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var temporada = datos.ObtenerTemporadas();
                return temporada;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener las temporadas", e);
            }
        }

        public List<Departamentos> ListadoDepartamento(string Pais)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var departamento = datos.ListadoDepartamento(Pais);
                return departamento;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los departamento", e);
            }
        }

        public Temporada ListadoFechasXTemporada(string Temporada)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var temporada = datos.ListadoFechasXTemporada(Temporada);
                return temporada;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener lAS fechas", e);
            }
        }

        public IEnumerable<Proveedor> ObtenerProveedor(string sProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var proveedor = datos.ObtenerProveedor(sProveedor);
                return proveedor;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el proveedor", e);
            }
        }

        public Proveedor ObtenerEditarProveedor(int sProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var proveedor = datos.ObtenerEditarProveedor(sProveedor);
                return proveedor;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el proveedor", e);
            }
        }

        public Cliente ObtenerEditarCliente(string sCliente)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var cliente = datos.ObtenerEditarCliente(sCliente);
                return cliente;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el cliente", e);
            }
        }

        public Servicio ObtenerEditarServicio(string sServicio, Int32 sProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var servicio = datos.ObtenerEditarServicio(sServicio, sProveedor);
                return servicio;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener el cliente", e);
            }
        }

        public IEnumerable<TipoServicio> ObtenerListAcomodacion(string TipoServicio)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var servicio = datos.ObtenerListAcomodacion(TipoServicio);
                return servicio;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener lista acomodacion", e);
            }
        }

        public void ActualizarCliente(Cliente eCliente)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.ActualizarCliente(eCliente);

            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo actualizar el cliente", e);
            }
        }

        public void ActualizarServicio(Servicio eServicio)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.ActualizarServicio(eServicio);

            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo actualizar el servicio", e);
            }
        }

        public void GuardarPeriodoCap_Lista_Detalle(List<Tarifa_Detalle> lsttarifa, int validado)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarPeriodoCap_Lista_Detalle(lsttarifa, validado);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }

        public void GuardarPeriodoCap_Lista_Detalle_Hoteles(List<Tarifa_Detalle> lsttarifa, int validado)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarPeriodoCap_Lista_Detalle_Hoteles(lsttarifa, validado);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio Hoteles", e);
            }
        }



        public void GuardarTarifa_Lista_Detalle_Hoteles(List<Tarifa_Detalle> lsttarifa, int validado)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarTarifa_Lista_Detalle_Hoteles(lsttarifa, validado);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }

        public void GuardarTarifa_Lista_Detalle(List<Tarifa_Detalle> lsttarifa, int validado)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarTarifa_Lista_Detalle(lsttarifa, validado);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }


        public void Copiar_Temporal_ServicioHotel(int iProveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.Copiar_Temporal_ServicioHotel(iProveedor);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }


        public void GuardarTarifa(List<Tarifa> lsttarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarTarifa(lsttarifa);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar la tarifa", e);
            }
        }


        public void ActualizarRangoHoteles(List<Tarifa> lsttarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.ActualizarRangoHoteles(lsttarifa);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar precio", e);
            }
        }

        public IEnumerable<Servicio> ObtenerServicioProv(string Proveedor, string Servicio)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var servicio = datos.ListadoServicioxProveedor(Proveedor);
                return servicio;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los servicios", e);
            }
        }


        //public void ValidarRango(Tarifa eTarifa)
        //{
        //    try
        //    {
        //        var datos = new AccesoDatos(ConnectionString);
        //        datos.ValidarRango(eTarifa);

        //    }
        //    catch (Exception e)
        //    {
        //        throw new FachadaNegociosException("No se pudo actualizar el servicio", e);
        //    }
        //}

        public Tarifa ValidarRango(Tarifa eTarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var Tarifa = datos.ValidarRango(eTarifa);
                return Tarifa;

            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo actualizar el servicio", e);
            }
        }


        //public Tarifa ValidarRango(Int32 Rango)
        //{
        //    try
        //    {
        //        var datos = new AccesoDatos(ConnectionString);
        //        var Tarifa = datos.ValidarRango(Rango);
        //        return Tarifa;
        //    }
        //    catch (Exception e)
        //    {
        //        throw new FachadaNegociosException("No se pudo obtener los servicios", e);
        //    }
        //}

        public void GuardarServicio_Lista_Detalle(List<Servicio> lstServCarg)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarServicio_Lista_Detalle(lstServCarg);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }

        public void Eliminar_TablaTemporal()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.Eliminar_TablaTemporal();
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("");
            }
        }


        public void GuardarPlantilla(Plantilla ePlantilla)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarPlantilla(ePlantilla);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar la plantilla", e);
            }
        }





    }
}
