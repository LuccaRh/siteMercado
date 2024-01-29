using Mercado.DAL;
using Mercado.MOD;

namespace Mercado.BLL
{
    public class DetalhePedidoBLL
    {
        private readonly DetalhePedidoDAL _DetalhePedidoDAL;
        public DetalhePedidoBLL()
        {
            _DetalhePedidoDAL = new DetalhePedidoDAL();
        }
        public List<DetalhePedido> ListarDetalhePedido(DetalhePedido _DetalhePedido)
        {
            return _DetalhePedidoDAL.ListarDetalhePedido(_DetalhePedido);
        }
        public DetalhePedido CadastrarDetalhePedido(DetalhePedido DetalhePedido)
        {
            if (!_DetalhePedidoDAL.CadastrarDetalhePedido(DetalhePedido))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return DetalhePedido;
        }
    }
}
