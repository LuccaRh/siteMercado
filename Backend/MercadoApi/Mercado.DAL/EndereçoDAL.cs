using Dapper;
using Mercado.DAL.Utilitários;
using Mercado.MOD;

namespace Mercado.DAL
{
    public class EndereçoDAL
    {
        public readonly MétodosEndereçoDAL _MétodosEndereçoDAL;
        public EndereçoDAL()
        {
            _MétodosEndereçoDAL = new MétodosEndereçoDAL();
        }
        public List<Endereço> ListarEndereço(Endereço endereço)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosEndereçoDAL.StringListagem(endereço);
            var lista = connection.Query<Endereço>(query, endereço) as List<Endereço>;
            return lista;
        }
        public bool CadastrarEndereço(Endereço Endereço)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosEndereçoDAL.StringCadastro();
            return connection.Execute(query, Endereço) > 0;
        }
        public bool AtualizarEndereço(Endereço Endereço)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosEndereçoDAL.StringAtualizar();
            return connection.Execute(query, Endereço) > 0;
        }
        public bool DeletarEndereço(int idEndereço)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = @"DELETE FROM EndereçosTB WHERE IdEndereço = @idEndereço"; ;
            return connection.Execute(query, new { IdEndereço = idEndereço }) > 0;
        }
    }
}
