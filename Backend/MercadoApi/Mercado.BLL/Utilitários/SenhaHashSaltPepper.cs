﻿using System.Text;
using System.Security.Cryptography;

namespace Mercado.BLL.Utilitários
{
    internal class SenhaHashSaltPepper
    {
        string pepper = "RV";
        public static string ByteArrayToHexString(byte[] ba)
        {
            StringBuilder hex = new StringBuilder(ba.Length * 2);
            foreach (byte b in ba)
                hex.AppendFormat("{0:x2}", b);
            return hex.ToString();
        }

        public string CreateSalt(int size)
        {
            var rng = new RNGCryptoServiceProvider();
            var buff = new byte[size];
            rng.GetBytes(buff);
            return Convert.ToBase64String(buff);
        }
        public string GenerateSHA256Hash(string senha, string salt)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(senha + salt + pepper);
            SHA256Managed sha256hashstring = new SHA256Managed(); 
            byte[] hash = sha256hashstring.ComputeHash(bytes);
            return ByteArrayToHexString(hash);
        }
        public bool VerifyPassword(string senhaParaConferir, string salt, string senhaHashedGuardada)
        {
            string senhaParaConferirHashed = GenerateSHA256Hash(senhaParaConferir, salt);
            return senhaParaConferirHashed == senhaHashedGuardada;
        }
    }
}
