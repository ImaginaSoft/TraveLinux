using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TraveLinux.Data.Entidades;
using TraveLinux.Web.Attributes;
using TraveLinux.Web.Models;

namespace TraveLinux.Web.Controllers
{
    public class ServiciosController : BaseController
    {
        // GET: Servicios
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NuevoServicio(int Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var ObtenerProveedor = Fachada.ObtenerEditarProveedor(Proveedor);
            var modelo = new ServicioViewModels();
            modelo.Paises = Fachada.ObtenerPaises();
            {
                modelo.PROVEEDOR = ObtenerProveedor.PROVEEDOR;
                modelo.PROVEEDOR_NOMBRE = ObtenerProveedor.NOMBRE;
            }

            return View(modelo);
        }

        public ActionResult EditarServicio(string Servicio, Int32 Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var ObtenerServicio = Fachada.ObtenerEditarServicio(Servicio, Proveedor);
            var modelo = new ServicioViewModels();
            {
                modelo.PROVEEDOR = ObtenerServicio.PROVEEDOR;
                modelo.PROVEEDOR_NOMBRE = ObtenerServicio.PROVEEDOR_NOMBRE;
                modelo.SERVICIO = ObtenerServicio.SERVICIO;
                modelo.NOMBRE = ObtenerServicio.NOMBRE;
                modelo.TIPO = ObtenerServicio.TIPO;
                modelo.VALORXSERVICIO = ObtenerServicio.VALORXSERVICIO;
                modelo.VALOR = ObtenerServicio.VALOR;
                modelo.DURACION = ObtenerServicio.DURACION;
                modelo.TURNO = ObtenerServicio.TURNO;
                modelo.DESAYUNO = ObtenerServicio.DESAYUNO;
                modelo.ALMUERZO = ObtenerServicio.ALMUERZO;
                modelo.CENA = ObtenerServicio.CENA;
                modelo.AEROLINEA = ObtenerServicio.AEROLINEA;
                modelo.BOX_LUNCH = ObtenerServicio.BOX_LUNCH;
                modelo.RUTA = ObtenerServicio.RUTA;
                modelo.DESCRIPCION = ObtenerServicio.DESCRIPCION;
                modelo.TIPO_SERVICIO = ObtenerServicio.TIPO_SERVICIO;
                modelo.TIPO_PERSONA = ObtenerServicio.TIPO_PERSONA;
                modelo.DESC_ESP = ObtenerServicio.DESC_ESP;
                modelo.DESC_INGL = ObtenerServicio.DESC_INGL;
                modelo.DESC_PORT = ObtenerServicio.DESC_PORT;
                modelo.DESC_ALE = ObtenerServicio.DESC_ALE;
                modelo.ESTADO = ObtenerServicio.ESTADO;
                modelo.HORA = ObtenerServicio.HORA.ToString("HH:mm");
                modelo.HORA_FIN = ObtenerServicio.HORA_FIN.ToString("HH:mm");
                modelo.CIUDAD = ObtenerServicio.CIUDAD;
                modelo.CIUDAD_NOMBRE = ObtenerServicio.CIUDAD_NOMBRE;
                modelo.PAIS = ObtenerServicio.PAIS;
                modelo.PAIS_NOMBRE = ObtenerServicio.PAIS_NOMBRE;
                modelo.Paises = Fachada.ObtenerPaises();
                modelo.VISTA_CLIENTE = ObtenerServicio.VISTA_CLIENTE;
                modelo.VISTA_PROVEEDOR = ObtenerServicio.VISTA_PROVEEDOR;
                modelo.PRECIO_OBLIGATORIO = ObtenerServicio.PRECIO_OBLIGATORIO;


            }


            return View(modelo);
        }

        [HttpPost]
        public void GuardarServicio(Servicio eServicio)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.GuardarServicio(eServicio);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ServicioProveedor(string Proveedor)
        {

            var cuenta = Session["CUENTA"] as Cuenta;

            var proveedor = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            if (proveedor == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            var modelo = new ProveedorViewModels()
            {
                PROVEEDOR = proveedor.PROVEEDOR,
                NOMBRE = proveedor.NOMBRE
            };

            return View(modelo);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult ListadoServicioxProveedor(string Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            var vServicio = Fachada.ListadoServicioxProveedor(Proveedor);

            int icount = vServicio.Count();

            if (icount == 0)
            {
                ViewBag.Contador = 0;
            }

            return Json(vServicio);
        }

        [Autorizar(Perfil.Administrador)]
        public ActionResult CargaServicio(string Proveedor)
        {

            var cuenta = Session["CUENTA"] as Cuenta;

            var modelo = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            if (modelo == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            ViewBag.PROVEEDOR = modelo.PROVEEDOR;
            ViewBag.NOMBRE_PROVEEDOR = modelo.NOMBRE;

            return View();
        }

        [HttpPost]
        public ActionResult CargaServicio(string Proveedor, HttpPostedFileBase postedFile)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            var modelo = Fachada.ObtenerProveedor(Proveedor).FirstOrDefault();

            if (modelo == null)
            {
                return HttpNotFound("No se encontró el proveedor solicitado");
            }

            ViewBag.PROVEEDOR = modelo.PROVEEDOR;
            ViewBag.NOMBRE_PROVEEDOR = modelo.NOMBRE;



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

                        //int count = currentSheet.Count; -- pestañas

                        for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                        {
                            var user = new ProveedorViewModels();
                            //user.SERVICIO = workSheet.Cells[rowIterator, 1].Value.ToString();

                            user.NOMBRE = workSheet.Cells[rowIterator, 1].Value == null ? string.Empty : workSheet.Cells[rowIterator, 1].Value.ToString();
                            user.DESC_ESP = workSheet.Cells[rowIterator, 2].Value == null ? string.Empty : workSheet.Cells[rowIterator, 2].Value.ToString();
                            user.DESC_INGL = workSheet.Cells[rowIterator, 3].Value == null ? string.Empty : workSheet.Cells[rowIterator, 3].Value.ToString();
                            user.DESC_PORT = workSheet.Cells[rowIterator, 4].Value == null ? string.Empty : workSheet.Cells[rowIterator, 4].Value.ToString();
                            user.DESC_ALE = workSheet.Cells[rowIterator, 5].Value == null ? string.Empty : workSheet.Cells[rowIterator, 5].Value.ToString();
                            user.DESCRIPCION = workSheet.Cells[rowIterator, 6].Value == null ? string.Empty : workSheet.Cells[rowIterator, 6].Value.ToString();
                            user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 7].Value == null ? string.Empty : workSheet.Cells[rowIterator, 7].Value.ToString();
                            //user.TIPO_PERSONA = workSheet.Cells[rowIterator, 8].Value == null ? string.Empty : workSheet.Cells[rowIterator, 8].Value.ToString();
                            user.DESAYUNO = workSheet.Cells[rowIterator, 8].Value == null ? string.Empty : workSheet.Cells[rowIterator, 8].Value.ToString();
                            user.ALMUERZO = workSheet.Cells[rowIterator, 9].Value == null ? string.Empty : workSheet.Cells[rowIterator, 9].Value.ToString();
                            user.CENA = workSheet.Cells[rowIterator, 10].Value == null ? string.Empty : workSheet.Cells[rowIterator, 10].Value.ToString();
                            //user.BOX_LUNCH = workSheet.Cells[rowIterator, 9].Value == null ? string.Empty : workSheet.Cells[rowIterator, 9].Value.ToString();
                            //user.AEROLINEA = workSheet.Cells[rowIterator, 10].Value == null ? string.Empty : workSheet.Cells[rowIterator, 10].Value.ToString();
                            //user.RUTA = workSheet.Cells[rowIterator, 11].Value == null ? string.Empty : workSheet.Cells[rowIterator, 11].Value.ToString();
                            user.RESUMEN = workSheet.Cells[rowIterator, 11].Value == null ? string.Empty : workSheet.Cells[rowIterator, 11].Value.ToString();
                            user.INICIO_SERVICIO = workSheet.Cells[rowIterator, 12].Value == null ? string.Empty : workSheet.Cells[rowIterator, 12].Value.ToString();
                            user.FIN_SERVICIO = workSheet.Cells[rowIterator, 13].Value == null ? string.Empty : workSheet.Cells[rowIterator, 13].Value.ToString();
                            user.VISTA_PROVEEDOR = workSheet.Cells[rowIterator, 14].Value == null ? string.Empty : workSheet.Cells[rowIterator, 14].Value.ToString();
                            user.VISTA_CLIENTE = workSheet.Cells[rowIterator, 15].Value == null ? string.Empty : workSheet.Cells[rowIterator, 15].Value.ToString();
                            user.CIUDAD = workSheet.Cells[rowIterator, 16].Value == null ? string.Empty : workSheet.Cells[rowIterator, 16].Value.ToString();                          
                            // string strValue = Worksheets.Cells[2,5].value==null ? string.Empty : Worksheets.Cells[2,5].value.ToString();

                            //user.NOMBRE = workSheet.Cells[rowIterator, 1].Value.ToString();
                            //user.DESC_ESP = workSheet.Cells[rowIterator, 2].Value.ToString();
                            //user.DESC_INGL = workSheet.Cells[rowIterator, 3].Value.ToString();
                            //user.DESC_PORT = workSheet.Cells[rowIterator, 4].Value.ToString();
                            //user.DESC_ALE = workSheet.Cells[rowIterator, 5].Value.ToString();
                            //user.DESCRIPCION = workSheet.Cells[rowIterator, 6].Value.ToString();
                            //user.TIPO_SERVICIO = workSheet.Cells[rowIterator, 7].Value.ToString();
                            //user.TIPO_PERSONA = workSheet.Cells[rowIterator, 8].Value.ToString();
                            //user.BOX_LUNCH = workSheet.Cells[rowIterator, 9].Value.ToString();
                            //user.AEROLINEA = workSheet.Cells[rowIterator, 10].Value.ToString();
                            //user.RUTA = workSheet.Cells[rowIterator, 11].Value.ToString();
                            //user.RESUMEN = workSheet.Cells[rowIterator, 12].Value.ToString();
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

        [HttpPost]
        public void EliminarServicio(string Servicio, Int32 Proveedor)
        {
            var cuenta = Session["CUENTA"] as Cuenta;
            Fachada.EliminarServicio(Servicio, Proveedor);
        }

        public void ActualizarServicio(Servicio eServicio)
        {
            var cuenta = Session["CUENTA"] as Cuenta;

            Fachada.ActualizarServicio(eServicio);
        }
    }
}