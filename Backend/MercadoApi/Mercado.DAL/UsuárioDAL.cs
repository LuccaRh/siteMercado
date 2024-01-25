using Dapper;
using Mercado.DAL.Utilitários;
using Mercado.MOD;

namespace Mercado.DAL
{
    public class UsuárioDAL
    {
        public readonly MétodosUsuárioDAL _MétodosUsuárioDAL;
        public UsuárioDAL()
        {
            _MétodosUsuárioDAL = new MétodosUsuárioDAL();
        }
        public bool CadastrarUsuário(Usuário usuario)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosUsuárioDAL.StringCadastro();
            return connection.Execute(query, usuario) > 0;
        }
        public bool AtualizarUsuário(Usuário usuario)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosUsuárioDAL.StringAtualizar();
            return connection.Execute(query, usuario) > 0;
        }
        public Usuário LoginUsuário(Usuário usuario)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = "SELECT * FROM UsuáriosTB WHERE Nome = @nome;";
            return connection.QueryFirstOrDefault<Usuário>(query, usuario);
        }
        public bool DeletarUsuário(int idUsuário)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = @"DELETE FROM UsuáriosTB WHERE IdUsuário = @idUsuário"; 
            return connection.Execute(query, new { IdUsuário = idUsuário }) > 0;
        }
        public List<Usuário> ListarUsuário(Usuário usuário)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosUsuárioDAL.StringListagem(usuário);
            var lista = connection.Query<Usuário>(query, usuário) as List<Usuário>;
            return lista;
        }
    }
}
