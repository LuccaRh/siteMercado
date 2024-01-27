using Mercado.BLL.Utilitários;
using Mercado.DAL;
using Mercado.MOD;

namespace Mercado.BLL
{
    public class PedidoBLL
    {
        private readonly PedidoDAL _PedidoDAL;
        public PedidoBLL()
        {
            _PedidoDAL = new PedidoDAL();
        }
        public List<Pedido> ListarPedido(Pedido _Pedido)
        {
            return _PedidoDAL.ListarPedido(_Pedido);
        }
    }
}
