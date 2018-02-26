using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;
using TraveLinux.Web.Models;
using OfficeOpenXml;


namespace TraveLinux.Web.Controllers
{    
    public class TarifaDetalleController : BaseController
    {
        [Autorizar(Perfil.Administrador)]
        // GET: TarifaDetalle
        public ActionResult index() 
        {
            return View();
        }
      
        [HttpPost]
        public ActionResult NuevaTarifaDetalle(int Proveedor, string TipoServicio,HttpPostedFileBase postedFile)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var TarifDetalle = Fachada.ObtenerEditarProveedor(Proveedor);

            if (TarifDetalle == null)
            {
                return HttpNotFound("No se encontró el detalle solicitado");
            }

            ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
            ViewBag.Proveedor_Nombre = TarifDetalle.NOMBRE;

            List<ServicioViewModels> usersList = new List<ServicioViewModels>();
            if (Request != null)
            {
                HttpPostedFileBase file = Request.Files["UploadedFile"];
                if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = file.FileName;
                    string fileContentType = file.ContentType;
                    byte[] fileBytes = new byte[file.ContentLength];
                    var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));

                    using (var package = new ExcelPackage(file.InputStream))
                    {
                        var currentSheet = package.Workbook.Worksheets;
                        var workSheet = currentSheet.First();
                        var noOfCol = workSheet.Dimension.End.Column;
                        var noOfRow = workSheet.Dimension.End.Row;                        


                        if (TipoServicio == "TerAer")
                        {


                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                var user = new ServicioViewModels();

                                user.DESCRIPCION = workSheet.Cells[rowIterator, 1].Value.ToString();
                                user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 2].Value.ToString();
                                user.FECHA_INI = Convert.ToDateTime(workSheet.Cells[rowIterator, 3].Value.ToString());
                                user.FECHA_FIN = Convert.ToDateTime(workSheet.Cells[rowIterator, 4].Value.ToString());
                                user.TIPO_PERSONA = workSheet.Cells[rowIterator, 5].Value.ToString();
                                user.RANGO_PAX = workSheet.Cells[rowIterator, 6].Value.ToString();
                                user.PRECIO = Convert.ToInt32(workSheet.Cells[rowIterator, 7].Value.ToString());
                                user.TIPO_SERVICIO_ABREV = workSheet.Cells[rowIterator, 8].Value.ToString();
                                user.TEMPORADA = Convert.ToInt32(workSheet.Cells[rowIterator, 9].Value.ToString());



                                usersList.Add(user);
                            }
                        }

                        if (TipoServicio == "Hoteles")
                        {
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                var user = new ServicioViewModels();
                       
                                user.DESCRIPCION = workSheet.Cells[rowIterator, 1].Value.ToString();
                                user.FECHA_INI = Convert.ToDateTime(workSheet.Cells[rowIterator, 2].Value.ToString());
                                user.FECHA_FIN = Convert.ToDateTime(workSheet.Cells[rowIterator, 3].Value.ToString());
                                user.TIPO_PERSONA = workSheet.Cells[rowIterator, 4].Value.ToString();
                                user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 5].Value.ToString();
                                user.SGL_ROOM = Convert.ToDecimal(workSheet.Cells[rowIterator, 6].Value.ToString());
                                user.DWL_ROOM = Convert.ToDecimal(workSheet.Cells[rowIterator, 7].Value.ToString());
                                user.TPL_ROOM = Convert.ToDecimal(workSheet.Cells[rowIterator, 8].Value.ToString());
                                user.CDL_ROOM = Convert.ToDecimal(workSheet.Cells[rowIterator, 9].Value.ToString());
                                user.TEMPORADA = Convert.ToInt32(workSheet.Cells[rowIterator, 10].Value.ToString());
                                usersList.Add(user);
                            }
                        }
                    }
                }
            }

            //List<ServicioViewModels> copy = usersList.ToList();

            return View(usersList);
        }

        [HttpPost]
        public ActionResult NuevaTarifaDetalleHotel(int Proveedor, string TipoServicio, HttpPostedFileBase postedFile)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var TarifDetalle = Fachada.ObtenerEditarProveedor(Proveedor);

            if (TarifDetalle == null)
            {
                return HttpNotFound("No se encontró el detalle solicitado");
            }

            ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
            ViewBag.Proveedor_Nombre = TarifDetalle.NOMBRE;

            List<Tarifa> usersList = new List<Tarifa>();
            if (Request != null)
            {
                HttpPostedFileBase file = Request.Files["UploadedFile"];
                if ((file != null) && (file.ContentLength > 0) && !string.IsNullOrEmpty(file.FileName))
                {
                    string fileName = file.FileName;
                    string fileContentType = file.ContentType;
                    byte[] fileBytes = new byte[file.ContentLength];
                    var data = file.InputStream.Read(fileBytes, 0, Convert.ToInt32(file.ContentLength));

                    using (var package = new ExcelPackage(file.InputStream))
                    {
                        var currentSheet = package.Workbook.Worksheets;
                        var workSheet = currentSheet.First();
                        var noOfCol = workSheet.Dimension.End.Column;
                        var noOfRow = workSheet.Dimension.End.Row;


                        if (TipoServicio == "Hoteles")
                        {
                            for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                            {
                                var user = new Tarifa();
                                user.DESCRIPCION = workSheet.Cells[rowIterator, 1].Value == null ? string.Empty : workSheet.Cells[rowIterator, 1].Value.ToString();
                                user.FECHA_INICIO_S = workSheet.Cells[rowIterator, 2].Value == null ? string.Empty : workSheet.Cells[rowIterator, 2].Value.ToString();
                                user.FECHA_FINAL_S = workSheet.Cells[rowIterator, 3].Value == null ? string.Empty : workSheet.Cells[rowIterator, 3].Value.ToString();
                                user.TIPO_PERSONA = workSheet.Cells[rowIterator, 4].Value == null ? string.Empty : workSheet.Cells[rowIterator, 4].Value.ToString();
                                user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 5].Value == null ? string.Empty : workSheet.Cells[rowIterator, 5].Value.ToString();
                                user.SGL_ROOM_S = workSheet.Cells[rowIterator, 6].Value == null ? string.Empty : workSheet.Cells[rowIterator, 6].Value.ToString();
                                user.DWL_ROOM_S = workSheet.Cells[rowIterator, 7].Value == null ? string.Empty : workSheet.Cells[rowIterator, 7].Value.ToString();
                                user.TPL_ROOM_S = workSheet.Cells[rowIterator, 8].Value == null ? string.Empty : workSheet.Cells[rowIterator, 8].Value.ToString();
                                user.CDL_ROOM_S = workSheet.Cells[rowIterator, 9].Value == null ? string.Empty : workSheet.Cells[rowIterator, 9].Value.ToString();
                                user.TEMPORADA_S = workSheet.Cells[rowIterator, 10].Value == null ? string.Empty : workSheet.Cells[rowIterator, 10].Value.ToString();
                                
                                if (user.TEMPORADA_S != string.Empty)
                                {                             
                                    usersList.Add(user);
                                }                             
                            }                            
                            
                            Fachada.Guardar_Carga_Hotel_Temporal(usersList);
                        }
                    }
                }
            }           

            return View();
        }

        public ActionResult NuevaTarifaDetalle(int Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            
            var TarifDetalle = Fachada.ObtenerEditarProveedor(Proveedor);

            if (TarifDetalle == null)
            {
                return HttpNotFound("No se encontró el detalle solicitado");
            }

            //var modelo = new ProveedorViewModels()
            //{
            //    PROVEEDOR = TarifDetalle.PROVEEDOR,
            //    PROVEEDOR_NOMBRE = TarifDetalle.PROVEEDOR_NOMBRE,
            //    TARIFA = TarifDetalle.TARIFA,
            //    TARIFA_NOMBRE = TarifDetalle.TARIFA_NOMBRE
            //};

            ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
            ViewBag.Proveedor_Nombre = TarifDetalle.NOMBRE;            

            return View();
        }


        public ActionResult NuevaTarifaDetalleHotel(int Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var TarifDetalle = Fachada.ObtenerEditarProveedor(Proveedor);

            if (TarifDetalle == null)
            {
                return HttpNotFound("No se encontró el detalle solicitado");
            }

            //var modelo = new ProveedorViewModels()
            //{
            //    PROVEEDOR = TarifDetalle.PROVEEDOR,
            //    PROVEEDOR_NOMBRE = TarifDetalle.PROVEEDOR_NOMBRE,
            //    TARIFA = TarifDetalle.TARIFA,
            //    TARIFA_NOMBRE = TarifDetalle.TARIFA_NOMBRE
            //};

            ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
            ViewBag.Proveedor_Nombre = TarifDetalle.NOMBRE;

            return View();

            //var vTarifaHotel = Fachada.ObtenerTarifHotel();

            //return Json(vTarifaHotel);
        }

        //[HttpPost]
        //public ActionResult NuevaTarifaDetalleHotel(int Proveedor, string TipoServicio, HttpPostedFileBase postedFile)
        //{
        //    {
        //        var cuenta = Session["CUENTA"] as Cuenta;

        //        var vCliente = Fachada.ObtenerTarifProvDetalle(Proveedor, Tarifa, null);

        //        var TarifDetalle = Fachada.ObtenerTarifaDetalle(Proveedor, Tarifa).FirstOrDefault();

        //        if (TarifDetalle == null)
        //        {
        //            return HttpNotFound("No se encontró el detalle solicitado");
        //        }

        //        var modelo = new ProveedorViewModels()
        //        {
        //            PROVEEDOR = TarifDetalle.PROVEEDOR,
        //            PROVEEDOR_NOMBRE = TarifDetalle.PROVEEDOR_NOMBRE,
        //            TARIFA = TarifDetalle.TARIFA,
        //            TARIFA_NOMBRE = TarifDetalle.TARIFA_NOMBRE
        //        };

        //        ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
        //        ViewBag.Proveedor_Nombre = TarifDetalle.PROVEEDOR_NOMBRE;
        //        ViewBag.Tarifa = TarifDetalle.TARIFA;
        //        ViewBag.Tarifa_Nombre = TarifDetalle.TARIFA_NOMBRE;

        //        return Json(vCliente);
        //    }
        //}

        [HttpPost]
        public void GuardarTarifaDetalle(List<Tarifa_Detalle> lsttarifa)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            //Fachada.GuardarTarifa_Lista_Detalle(lsttarifa);
        }

        [HttpPost]
        public void GuardarTarifaCarga(List<Tarifa_Detalle> lstTarifas)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            List<Tarifa_Detalle> copyLista = lstTarifas.ToList();

            List<Tarifa_Detalle> myDistinctList = copyLista.GroupBy(Periodo => Periodo.PERIODO).Select(g => g.First()).ToList();

            Fachada.GuardarPeriodoCap_Lista_Detalle(myDistinctList, 1);

            Fachada.GuardarTarifa_Lista_Detalle(lstTarifas, 0);

            Fachada.Eliminar_TablaTemporal();
        }
 

        public ActionResult Obtener_tarifa_Detalle_Prov(int Proveedor, string Tarifa)
        {
            var vCliente = Fachada.ObtenerTarifProvDetalle(Proveedor, Tarifa);
            return View(vCliente);
        }
    }
}

