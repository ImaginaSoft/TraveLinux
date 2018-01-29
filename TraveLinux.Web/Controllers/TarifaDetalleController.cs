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
        public ActionResult NuevaTarifaDetalle(int Proveedor, HttpPostedFileBase postedFile)
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
                            usersList.Add(user);
                        }
                    }
                }
            }
            return View(usersList);
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

        //[Autorizar(Perfil.Administrador)]
        //public ActionResult NuevaTarifaDetalle(string Proveedor, string Tarifa)
        //{
        //    var cuenta = Session["CUENTA"] as Cuenta;

        //    //var vCliente = Fachada.ObtenerTarifProvDetalle(Proveedor, Tarifa, null);

        //    //var TarifDetalle = Fachada.ObtenerTarifaDetalle(Proveedor, Tarifa).FirstOrDefault();

        //    //if (TarifDetalle == null)
        //    //{
        //    //    return HttpNotFound("No se encontró el detalle solicitado");
        //    //}

        //    //var modelo = new ProveedorViewModels()
        //    //{
        //    //    PROVEEDOR = TarifDetalle.PROVEEDOR,
        //    //    PROVEEDOR_NOMBRE = TarifDetalle.PROVEEDOR_NOMBRE,
        //    //    TARIFA = TarifDetalle.TARIFA,
        //    //    TARIFA_NOMBRE = TarifDetalle.TARIFA_NOMBRE
        //    //};

        //    //ViewBag.Proveedor = TarifDetalle.PROVEEDOR;
        //    //ViewBag.Proveedor_Nombre = TarifDetalle.PROVEEDOR_NOMBRE;
        //    //ViewBag.Tarifa = TarifDetalle.TARIFA;
        //    //ViewBag.Tarifa_Nombre = TarifDetalle.TARIFA_NOMBRE;

        //   return Json(vCliente);
        //}

        [HttpPost]
        public void GuardarTarifaDetalle(List<Tarifa_Detalle> lsttarifa)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            Fachada.GuardarTarifa_Lista_Detalle(lsttarifa);
        }

        public void GuardarTarifaCarga(List<Tarifa_Detalle> lstTarifas)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarTarifa_Lista_Detalle(lstTarifas);
        }
        
        public ActionResult Obtener_tarifa_Detalle_Prov(int Proveedor, string Tarifa)
        {
            var vCliente = Fachada.ObtenerTarifProvDetalle(Proveedor, Tarifa);
            return View(vCliente);
        }
    }
}