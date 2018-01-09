using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System.IO;
using System.Web.Configuration;

namespace TraveLinux.Web.Util
{
    public class TripleDESUtil
    {
        public byte[] IV { get; set; }
        public byte[] Key { get; set; }

        public TripleDESUtil(string strIv, string strKey)
        {
            Key = strKey.Split(new[] { ',' }).Select(s => Convert.ToByte(s, 16))
                                     .ToArray();
            IV = strIv.Split(new[] { ',' }).Select(s => Convert.ToByte(s, 16))
                                     .ToArray();
        }

        public string DesEncriptar(string message)
        {
            string[] temp = message.Split(new[] { ',' }).ToArray();
            List<byte> x1 = new List<byte>();
            foreach (var item in temp)
            {
                x1.Add(Convert.ToByte(item));
            }
            string texto = DesEncriptar(x1.ToArray());

            return texto;
        }
        public string DesEncriptar(byte[] message)
        {
            TripleDES cryptoProvider = new TripleDESCryptoServiceProvider();
            ICryptoTransform cryptoTransform = cryptoProvider.CreateDecryptor(Key, IV);
            MemoryStream memoryStream = new MemoryStream(message);
            CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoTransform, CryptoStreamMode.Read);
            StreamReader sr = new StreamReader(cryptoStream, true);
            string textoLimpio = sr.ReadToEnd();

            return textoLimpio;
        }

        public byte[] Encriptar(string cadenaOrigen)
        {
            UTF8Encoding encoding = new UTF8Encoding();
            byte[] message = encoding.GetBytes(cadenaOrigen);
            TripleDESCryptoServiceProvider criptoProvider = new TripleDESCryptoServiceProvider();


            ICryptoTransform criptoTransform = criptoProvider.CreateEncryptor(Key, IV);
            MemoryStream memoryStream = new MemoryStream();
            CryptoStream cryptoStream = new CryptoStream(memoryStream, criptoTransform, CryptoStreamMode.Write);
            cryptoStream.Write(message, 0, message.Length);
            cryptoStream.FlushFinalBlock();
            byte[] encriptado = memoryStream.ToArray();
            string cadenaEncriptada = encoding.GetString(encriptado);

            return encriptado;
        }

        public static string EncriptarContrasenia(string pass)
        {

            string i = WebConfigurationManager.AppSettings["3DESIV"];
            string k = WebConfigurationManager.AppSettings["3DESKey"];
            TripleDESUtil crypto = new TripleDESUtil(i, k);
            byte[] contraseniaEncriptada = crypto.Encriptar(pass);
            string textoContraseniaEncriptada = string.Empty;
            foreach (byte item in contraseniaEncriptada)
            {
                if (textoContraseniaEncriptada == string.Empty)
                {
                    textoContraseniaEncriptada += item.ToString();
                }
                else
                    textoContraseniaEncriptada += "," + item.ToString();
            }
            string passEncry;
            passEncry = textoContraseniaEncriptada;

            return passEncry;
        }

        public static string DesencriptarContrasenia(string pass)
        {
            if (string.IsNullOrEmpty(pass) || pass == "null")
            {
                return "";
            }
            else
            {
                string i = WebConfigurationManager.AppSettings["3DESIV"];
                string k = WebConfigurationManager.AppSettings["3DESKey"];
                TripleDESUtil descrypto = new TripleDESUtil(i, k);
                string contraseniaDesencriptada = descrypto.DesEncriptar(pass);
                return contraseniaDesencriptada;
            }
        }

    }
}