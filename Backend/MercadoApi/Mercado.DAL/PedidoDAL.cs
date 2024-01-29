using Dapper;
using Mercado.DAL.Utilitários;
using Mercado.MOD;

namespace Mercado.DAL
{
    public class PedidoDAL
    {
        public readonly MétodosPedidoDAL _MétodosPedidoDAL;
        public PedidoDAL()
        {
            _MétodosPedidoDAL = new MétodosPedidoDAL();
        }
        public List<Pedido> ListarPedido(Pedido _Pedido)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosPedidoDAL.StringListagem(_Pedido);
            var lista = connection.Query<Pedido>(query, _Pedido) as List<Pedido>;
            return lista;
        }
        public bool CadastrarPedido(Pedido Pedido)
        {
            using var connection = new BdConnection().AbrirConexao();
            string query = _MétodosPedidoDAL.StringCadastro();
            return connection.Execute(query, Pedido) > 0;
        }
    }
}
