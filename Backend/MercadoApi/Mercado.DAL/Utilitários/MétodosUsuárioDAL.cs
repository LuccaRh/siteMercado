using Mercado.MOD;
using System.Reflection;

namespace Mercado.DAL.Utilitários
{
    public class MétodosUsuárioDAL
    {
        public string StringCadastro()
        {
            //loop para pegar o nome de cada propriedade do objeto, inserir elas no query
            string query = "INSERT INTO UsuáriosTB (";
            Type tipo = typeof(Usuário);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idUsuário") { continue; }
                query += String.Format(" {0},", nomePropriedade);
            }

            query = query.TrimEnd(',') + ") VALUES (";
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idUsuário") { continue; }
                query += String.Format(" @{0},", nomePropriedade);
            }
            query = query.TrimEnd(',') + ")";
            return query;
        }
        public string StringAtualizar()
        {
            string query = @"UPDATE UsuáriosTB SET";
            Type tipo = typeof(Usuário);
            PropertyInfo[] propriedades = tipo.GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                string nomePropriedade = propriedade.Name;
                if (nomePropriedade == "idUsuário") { continue; }
                query += String.Format(" {0} = ISNULL(@{1},{2}),", nomePropriedade, nomePropriedade, nomePropriedade);
            }
            query = query.TrimEnd(',');
            query += " WHERE IdUsuário = @idUsuário;";
            return query;
        }
        public string StringListagem(Usuário usuário)
        {
            //Pega o nome de cada variável do objeto Usuário, verifica se no JSON foi passado algum valor para esta variável
            //Se foi, monta o resto da procura com WHERE e AND
            string query = "SELECT IdUsuário, Email, Nome, Cargo FROM UsuáriosTB;"; //Não pegar senha e salt
            bool filtragem = false;
            PropertyInfo[] propriedades = usuário.GetType().GetProperties();
            foreach (PropertyInfo propriedade in propriedades)
            {
                var valor = propriedade.GetValue(usuário, null);
                string nomePropriedade = propriedade.Name;

                //Pular se propriedades forem idUsuário, Senha e Salt
                HashSet<string> propriedadesIndesejadas = new HashSet<string> { "idUsuário", "senha", "salt" };
                if (propriedadesIndesejadas.Contains(nomePropriedade)) { continue; }

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