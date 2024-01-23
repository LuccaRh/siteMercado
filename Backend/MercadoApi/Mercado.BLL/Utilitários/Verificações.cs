using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Mercado.BLL.Utilitários
{
    public class Verificações
    {
        public void Senha(string senha)
        {
            // Verificar comprimento mínimo
            if (senha.Length < 8)
            {
                string erro = "A senha deve ter pelo menos 8 caracteres.";
                throw new Exception(erro);
            }

            // Verificar presença de pelo menos uma letra maiúscula
            if (!senha.Any(char.IsUpper))
            {
                string erro = "A senha deve conter pelo menos uma letra maiúscula.";
                throw new Exception(erro);
            }

            // Verificar presença de pelo menos um dígito
            if (!senha.Any(char.IsDigit))
            {
                string erro = "A senha deve conter pelo menos um dígito.";
                throw new Exception(erro);
            }

            // Verificar presença de pelo menos um caractere especial
            if (!Regex.IsMatch(senha, @"[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]"))
            {
                string erro = "A senha deve conter pelo menos um caractere especial.";
                throw new Exception(erro);
            }

        }
    }
}
