using System.Data;
using Microsoft.Data.SqlClient;
namespace Mercado.DAL.Utilitários
{
    public class BdConnection
    {
        public IDbConnection AbrirConexao()
        {
            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("en-US");
            System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("en-US");

            string nomeDoServidor = "Lucca-Notebook";
            string nomeDoBancoDeDados = "siteMercadoDB";

            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            builder.DataSource = nomeDoServidor;
            builder.InitialCatalog = nomeDoBancoDeDados;
            builder.IntegratedSecurity = true; // Use a autenticação do Windows
            builder.TrustServerCertificate = true;

            SqlConnection connection = new SqlConnection(builder.ConnectionString);
            connection.Open();

            return connection;
        }
    }
}
