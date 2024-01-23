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
            string query = _MétodosProdutoDAL.StringListagem(produto);
            var lista = connection.Query<Produto>(query, produto) as List<Produto>;
            return lista;
        }
        public bool CadastrarProduto (Produto produto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosProdutoDAL.StringCadastro();
            return connection.Execute(query, produto) > 0;
        }
        public bool AtualizarProduto(Produto produto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosProdutoDAL.StringAtualizar();
            return connection.Execute(query, produto) > 0;
        }
        public bool DeletarProduto(int idProduto)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = @"DELETE FROM ProdutosTB WHERE IdProduto = @idProduto"; ;
            return connection.Execute(query, new { IdProduto = idProduto}) > 0;
        }
    }
}
