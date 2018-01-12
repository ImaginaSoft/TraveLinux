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
        public IEnumerable<Proveedor> ObtenerListaProveedor()
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var proveedor = datos.ObtenerListaProveedor();
                return proveedor;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los proveedores", e);
            }
        }


        public IEnumerable<Tarifa_Detalle> ObtenerTarifaDetalle(string Proveedor, string Tarifa)
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

        public IEnumerable<Tarifa_Detalle> ObtenerTarifProvDetalle(string Proveedor, string Tarifa)
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

        public IEnumerable<Tarifa> ObtenerListaTarifa(string Proveedor)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                var tarifa = datos.ObtenerListaTarifa(Proveedor);
                return tarifa;
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo obtener los proveedores", e);
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

        public Proveedor ObtenerEditarProveedor(string sProveedor)
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

        public void GuardarTarifa_Lista_Detalle(List<Tarifa_Detalle> lsttarifa)
        {
            try
            {
                var datos = new AccesoDatos(ConnectionString);
                datos.GuardarTarifa_Lista_Detalle(lsttarifa);
            }
            catch (Exception e)
            {
                throw new FachadaNegociosException("No se pudo guardar el detalle servicio", e);
            }
        }
    }
}
