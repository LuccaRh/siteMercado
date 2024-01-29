using Mercado.MOD;
using System.Reflection;

namespace Mercado.DAL.Utilitários
{
    public class MétodosDetalhePedidoDAL
    {
        public string StringListagem(DetalhePedido _DetalhePedido)
        {
            //Pega o nome de cada variável do objeto DetalhePedido, verifica se no JSON foi passado algum valor para esta variável
            //Se foi, monta o resto da procura com WHERE e AND
            string query = "SELECT * FROM DetalhesPedidosTB";
            bool filtragem = false;
            PropertyInfo[] propriedades = _DetalhePedido.GetType().GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                var valor = propriedade.GetValue(_DetalhePedido, null);
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
            string query = "INSERT INTO DetalhesPedidosTB (";
            Type tipo = typeof(DetalhePedido);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idDetalhe") { continue; }
                query += String.Format(" {0},", nomePropriedade);
            }

            query = query.TrimEnd(',') + ") VALUES (";
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idDetalhe") { continue; }
                query += String.Format(" @{0},", nomePropriedade);
            }
            query = query.TrimEnd(',') + ")";
            return query;
        }
    }
}
