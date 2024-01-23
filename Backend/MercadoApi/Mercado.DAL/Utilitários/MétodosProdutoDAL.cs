using Mercado.MOD;
using System.Reflection;

namespace Mercado.DAL.Utilitários
{
    public class MétodosProdutoDAL
    {
        //Monta string para lista de items, utilizando um filtro de busca com base no JSON passado
        public string StringListagem(Produto produto)
        {
            //Pega o nome de cada variável do objeto produto, verifica se no JSON foi passado algum valor para esta variável
            //Se foi, monta o resto da procura com WHERE e AND
            string query = "SELECT * FROM ProdutosTB";
            bool filtragem = false;
            PropertyInfo[] propriedades = produto.GetType().GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                var valor = propriedade.GetValue(produto, null);
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idProduto") { continue; }
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
        public string StringCadastro()
        {
            //loop para pegar o nome de cada propriedade do objeto, inserir elas no query
            string query = "INSERT INTO ProdutosTB (";
            Type tipo = typeof(Produto);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idProduto") { continue; }
                query += String.Format(" {0},", nomePropriedade);
            }

            query = query.TrimEnd(',') + ") VALUES (";
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idProduto") { continue; }
                query += String.Format(" @{0},", nomePropriedade);
            }
            query = query.TrimEnd(',') + ")";
            return query;
        }
        public string StringAtualizar()
        {
            string query = @"UPDATE ProdutosTB SET";
            Type tipo = typeof(Produto);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idProduto") { continue; }
                //Se não quiser mudar a propriedade, o valor foi mandado como null, logo o ISNULL detecta isso e 
                //seta a propriedade como ela já estava
                query += String.Format(" {0} = ISNULL(@{1},{2}),", nomePropriedade, nomePropriedade, nomePropriedade);
            }
            query = query.TrimEnd(',');
            query += " WHERE IdProduto = @idProduto;";
            return query;
        }
    }
}
