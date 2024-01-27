using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoBLL _PedidoBLL;
        public PedidoController()
        {
            _PedidoBLL = new PedidoBLL();
        }
        [HttpGet("ListagemPedido")]
        public IActionResult ListaPedido([FromQuery] Pedido _Pedido)
        {
            try
            {
                return Ok(_PedidoBLL.ListarPedido(_Pedido));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
