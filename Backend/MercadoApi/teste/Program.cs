using System;
using Microsoft.Data.SqlClient;

try
{
    // Substitua "Lucca-Notebook" pelo nome correto do seu servidor
    string nomeDoServidor = "Lucca-Notebook";
    string nomeDoBancoDeDados = "siteMercadoDB"; // Substitua pelo nome real do seu banco de dados

    SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
    builder.DataSource = nomeDoServidor;
    builder.InitialCatalog = nomeDoBancoDeDados;
    builder.IntegratedSecurity = true; // Use a autenticação do Windows
    builder.TrustServerCertificate = true;

    using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
    {
        connection.Open();
        Console.WriteLine("Conexão bem-sucedida!");

        // Exibir o nome do servidor e do banco de dados
        Console.WriteLine($"Nome do Servidor: {nomeDoServidor}");
        Console.WriteLine($"Nome do Banco de Dados: {nomeDoBancoDeDados}");

        // Selecionar dados da tabela ProdutosTB
        using (SqlCommand command = connection.CreateCommand())
        {
            command.CommandText = "SELECT * FROM ProdutosTB";

            // Ler os dados resultantes
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    // Exibir os dados (substitua pelos campos reais da tabela)
                    Console.WriteLine($"ID: {reader["IdProduto"]}, Nome: {reader["Nome"]}, Valor: {reader["Valor"]}");
                }
            }
        }
    }
}
catch (SqlException ex)
{
    Console.WriteLine($"Erro: {ex.Message}");
}
