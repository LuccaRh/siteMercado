using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoBLL _ProdutoBLL;
        public ProdutoController()
        {
            _ProdutoBLL = new ProdutoBLL();
        }
        [HttpPost("CadastroProduto")]
        public IActionResult CadastroProduto([FromBody] Produto produto)
        {
            try
            {
                return Ok(_ProdutoBLL.CadastrarProduto(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }
        [HttpGet("ListagemProduto")]
        public IActionResult ListaProduto([FromQuery] Produto produto)
        {
            try
            {
                return Ok(_ProdutoBLL.ListarProduto(produto));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
