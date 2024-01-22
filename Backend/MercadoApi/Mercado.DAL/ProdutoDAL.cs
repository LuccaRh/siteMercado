using Dapper;
using Mercado.DAL.Utilitários;
using Mercado.MOD;

namespace Mercado.DAL
{
    public class ProdutoDAL
    {
        public readonly MétodosProdutoDAL _MétodosProdutoDAL;
        public ProdutoDAL() 
        {
            _MétodosProdutoDAL = new MétodosProdutoDAL();
        }
        public List<Produto> ListarProduto(Produto produto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = "SELECT * FROM siteMercadoDB.dbo.ProdutosTB";
            query = _MétodosProdutoDAL.StringListagem(produto, query);
            var lista = connection.Query<Produto>(query, produto) as List<Produto>;
            return lista;
        }
        public bool CadastrarProduto (Produto produto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosProdutoDAL.StringCadastro();
            connection.Execute(query, produto);
            return true;
        }
        public bool AtualizarProduto(Produto produto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosProdutoDAL.StringAtualizar();
            connection.Execute(query, produto);
            return true;
        }
        public bool DeletarProduto(int idProduto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = @"DELETE FROM ProdutosTB WHERE IdProduto = @idProduto"; ;
            return connection.Execute(query, new { IdProduto = idProduto}) > 0;
        }
    }
}
