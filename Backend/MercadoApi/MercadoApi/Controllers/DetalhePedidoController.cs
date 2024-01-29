using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DetalhePedidoController : ControllerBase
    {
        private readonly DetalhePedidoBLL _DetalhePedidoBLL;
        public DetalhePedidoController()
        {
            _DetalhePedidoBLL = new DetalhePedidoBLL();
        }
        [HttpGet("ListagemDetalhePedido")]
        public IActionResult ListaDetalhePedido([FromQuery] DetalhePedido _DetalhePedido)
        {
            try
            {
                return Ok(_DetalhePedidoBLL.ListarDetalhePedido(_DetalhePedido));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("CadastroDetalhePedido")]
        public IActionResult CadastroDetalhePedido([FromBody] DetalhePedido _DetalhePedido)
        {
            try
            {
                return Ok(_DetalhePedidoBLL.CadastrarDetalhePedido(_DetalhePedido));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
