using Mercado.MOD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Mercado.DAL.Utilitários
{
    public class MétodosPedidoDAL
    {
        public string StringListagem(Pedido _Pedido)
        {
            //Pega o nome de cada variável do objeto Pedido, verifica se no JSON foi passado algum valor para esta variável
            //Se foi, monta o resto da procura com WHERE e AND
            string query = "SELECT * FROM PedidosTB";
            bool filtragem = false;
            PropertyInfo[] propriedades = _Pedido.GetType().GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                var valor = propriedade.GetValue(_Pedido, null);
                string nomePropriedade = propriedade.Name;
                if (valor != null)
                {
                    if (filtragem)
                    {
                        query += " AND";
                    }
                    else
                    {
                        query += " WHERE";
                        filtragem = true;
                    }

                    if (propriedade.PropertyType == typeof(string))
                    {
                        // Se a propriedade for uma string, use LIKE para correspondência parcial 
                        query += String.Format(" {0} LIKE '%{1}%'", nomePropriedade, valor);
                    }
                    else
                    {
                        // Caso contrário, use a comparação exata
                        query += String.Format(" {0} = @{1}", nomePropriedade, nomePropriedade);
                    }
                }

            }
            return query;
        }
    }
}
