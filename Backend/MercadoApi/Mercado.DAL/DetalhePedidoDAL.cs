using Dapper;
using Mercado.DAL.Utilitários;
using Mercado.MOD;

namespace Mercado.DAL
{
    public class DetalhePedidoDAL
    {
        public readonly MétodosDetalhePedidoDAL _MétodosDetalhePedidoDAL;
        public DetalhePedidoDAL()
        {
            _MétodosDetalhePedidoDAL = new MétodosDetalhePedidoDAL();
        }
        public List<DetalhePedido> ListarDetalhePedido(DetalhePedido _DetalhePedido)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosDetalhePedidoDAL.StringListagem(_DetalhePedido);
            var lista = connection.Query<DetalhePedido>(query, _DetalhePedido) as List<DetalhePedido>;
            return lista;
        }
        public bool CadastrarDetalhePedido(DetalhePedido DetalhePedido)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosDetalhePedidoDAL.StringCadastro();
            return connection.Execute(query, DetalhePedido) > 0;
        }
    }
}
