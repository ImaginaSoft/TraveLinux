using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using OfficeOpenXml;
using System.Web.Routing;

namespace TraveLinux.Web.Controllers
{
    public class TarifaHotelesController : BaseController
    {
        // GET: TarifaHoteles
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Carga_TarifaHotel_Temporal()
        {
            var cuenta = Session["CUENTA"] as Cuenta;            

            var vTarifaHotel = Fachada.ObtenerTarifHotel();

            return Json(vTarifaHotel);
        }

        public ActionResult CargaTarifaHotel(int Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            //Fachada.Eliminar_Tabla_Temporal_Hotel();

            var TarifDetalle = Fachada.ObtenerEditarProveedor(Proveedor);

            
            if (TarifDetalle == null)
            {
                return HttpNotFound("No se encontró el detalle solicitado");
            }

            ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
            ViewBag.Proveedor_Nombre = TarifDetalle.NOMBRE;
            ViewBag.Tipo_Servicio = "HOTEL";

            return View();
        }

        [HttpPost]
        public ActionResult CargaTarifaHotel(int Proveedor, string TipoServicio, HttpPostedFileBase postedFile)
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
                                user.PROVEEDOR = Proveedor;
                                user.DESCRIPCION = workSheet.Cells[rowIterator, 1].Value == null ? string.Empty : workSheet.Cells[rowIterator, 1].Value.ToString();
                                user.FECHA_INICIO_S = workSheet.Cells[rowIterator, 2].Value == null ? string.Empty : workSheet.Cells[rowIterator, 2].Value.ToString();
                                user.FECHA_FINAL_S = workSheet.Cells[rowIterator, 3].Value == null ? string.Empty : workSheet.Cells[rowIterator, 3].Value.ToString();
                                user.TIPO_PERSONA = workSheet.Cells[rowIterator, 4].Value == null ? string.Empty : workSheet.Cells[rowIterator, 4].Value.ToString();
                                user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 5].Value == null ? string.Empty : workSheet.Cells[rowIterator, 5].Value.ToString();

                                user.SGL_ROOM = workSheet.Cells[rowIterator, 6].Value == null ? 0 : Convert.ToDecimal(workSheet.Cells[rowIterator, 6].Value.ToString());
                                user.DWL_ROOM = workSheet.Cells[rowIterator, 7].Value == null ? 0 : Convert.ToDecimal(workSheet.Cells[rowIterator, 7].Value.ToString());
                                user.TPL_ROOM = workSheet.Cells[rowIterator, 8].Value == null ? 0 : Convert.ToDecimal(workSheet.Cells[rowIterator, 8].Value.ToString());
                                user.CDL_ROOM = workSheet.Cells[rowIterator, 9].Value == null ? 0 : Convert.ToDecimal(workSheet.Cells[rowIterator, 9].Value.ToString());
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

            //return View();
            //return RedirectToAction("ActionOrViewName", "ControllerName");
            //return RedirectToAction("CargaTarifaHotel?=" + Proveedor, "TarifaHoteles");
            return RedirectToAction("CargaTarifaHotel", new RouteValueDictionary(new { controller = "TarifaHoteles", action = "CargaTarifaHotel", Proveedor = Proveedor }));
            //return RedirectToAction("Carga_TarifaHotel_Temporal", new RouteValueDictionary(new { controller = "TarifaHoteles", action = "Carga_TarifaHotel_Temporal"}));
        }

        [HttpPost]
        public void GuardarTarifaCargaHoteles(List<Tarifa_Detalle> lstTarifas)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            
            List<Tarifa_Detalle> copyLista = lstTarifas.ToList();

            List<Tarifa_Detalle> myDistinctList = copyLista.GroupBy(Periodo => Periodo.PERIODO).Select(g => g.First()).ToList();

            Fachada.GuardarPeriodoCap_Lista_Detalle_Hoteles(myDistinctList, 1);

            Fachada.GuardarTarifa_Lista_Detalle_Hoteles(lstTarifas, 0);

            Fachada.Copiar_Temporal_ServicioHotel(0);

            Fachada.Eliminar_Tabla_Temporal_Hotel();

        }
    }
}