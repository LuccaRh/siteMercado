using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EndereçoController : ControllerBase
    {
        private readonly EndereçoBLL _EndereçoBLL;
        public EndereçoController()
        {
            _EndereçoBLL = new EndereçoBLL();
        }
        [HttpPost("CadastroEndereço")]
        public IActionResult CadastroEndereço([FromBody] Endereço _Endereço)
        {
            try
            {
                return Ok(_EndereçoBLL.CadastrarEndereço(_Endereço));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ListagemEndereço")]
        public IActionResult ListaEndereço([FromQuery] Endereço _Endereço)
        {
            try
            {
                return Ok(_EndereçoBLL.ListarEndereço(_Endereço));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("AtualizarEndereço")]
        public IActionResult AtualizarEndereço([FromBody] Endereço _Endereço)
        {
            try
            {
                return Ok(_EndereçoBLL.AtualizarEndereço(_Endereço));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DeletarEndereço")]
        public IActionResult DeletarEndereço([FromQuery] int idEndereço)
        {
            try
            {
                return Ok(_EndereçoBLL.DeletarEndereço(idEndereço));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
