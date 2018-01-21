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
    public class MensajeController : BaseController
    {
        // GET: Mensaje
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(string Proveedor, string servicio, HttpPostedFileBase postedFile)
        {



            //var cuenta = Session["CUENTA"] as Cuenta;

            //var ServicioProv = Fachada.ObtenerServicioProv("PROV00017", "SERV00037").FirstOrDefault();

            //if (ServicioProv == null)
            //{
            //    return HttpNotFound("No se encontró el detalle solicitado");
            //}


            //ViewBag.Proveedor = ServicioProv.PROVEEDOR;
            //ViewBag.Proveedor_Nombre = ServicioProv.PROVEEDOR_NOMBRE;
            //ViewBag.Servicio = ServicioProv.SERVICIO;
            //ViewBag.Servicio_Nombre = ServicioProv.NOMBRE;



            List<ProveedorViewModels> usersList = new List<ProveedorViewModels>();
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

                        for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                        {
                            var user = new ProveedorViewModels();
                            user.SERVICIO = workSheet.Cells[rowIterator, 1].Value.ToString();
                            user.NOMBRE = workSheet.Cells[rowIterator, 2].Value.ToString();
                            user.DESC_ESP = workSheet.Cells[rowIterator, 3].Value.ToString();
                            user.DESC_INGL = workSheet.Cells[rowIterator, 4].Value.ToString();
                            user.DESC_PORT = workSheet.Cells[rowIterator, 5].Value.ToString();
                            user.DESC_ALE = workSheet.Cells[rowIterator, 6].Value.ToString();
                            user.DESCRIPCION = workSheet.Cells[rowIterator, 7].Value.ToString();
                            user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 8].Value.ToString();
                            user.TIPO_PERSONA = workSheet.Cells[rowIterator, 9].Value.ToString();
                            user.BOX_LUNCH = workSheet.Cells[rowIterator, 10].Value.ToString();
                            user.AEROLINEA = workSheet.Cells[rowIterator, 11].Value.ToString();
                            user.RUTA = workSheet.Cells[rowIterator, 12].Value.ToString();
                            user.RESUMEN = workSheet.Cells[rowIterator, 13].Value.ToString();
                            usersList.Add(user);
                        }
                    }
                }
            }
            return View(usersList);
        }


        [HttpPost]
        public void GuardarServicioCarga(List<Servicio> lstServCarg)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            Fachada.GuardarServicio_Lista_Detalle(lstServCarg);
        }




    }

}
