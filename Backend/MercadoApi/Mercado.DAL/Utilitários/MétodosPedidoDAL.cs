﻿using Mercado.MOD;
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



                        // Caso contrário, use a comparação exata
                        query += String.Format(" {0} = @{1}", nomePropriedade, nomePropriedade);
                    
                }

            }
            return query;
        }
        public string StringCadastro()
        {
            //loop para pegar o nome de cada propriedade do objeto, inserir elas no query
            string query = "INSERT INTO PedidosTB (";
            Type tipo = typeof(Pedido);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idPedido") { continue; }
                query += String.Format(" {0},", nomePropriedade);
            }

            query = query.TrimEnd(',') + ") VALUES (";
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idPedido") { continue; }
                query += String.Format(" @{0},", nomePropriedade);
            }
            query = query.TrimEnd(',') + ")";
            return query;
        }
    }
}
