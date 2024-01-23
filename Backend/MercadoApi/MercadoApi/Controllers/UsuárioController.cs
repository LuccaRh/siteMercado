using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuárioController : ControllerBase
    {
        private readonly UsuárioBLL _UsuárioBLL;
        public UsuárioController()
        {
            _UsuárioBLL = new UsuárioBLL();
        }
        [HttpPost("CadastroUsuário")]
        public IActionResult CadastroUsuário([FromBody] Usuário usuario)
        {
            try
            {
                return Ok(_UsuárioBLL.CadastrarUsuário(usuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("AtualizarUsuário")]
        public IActionResult AtualizarUsuário([FromBody] Usuário usuario)
        {
            try
            {
                return Ok(_UsuárioBLL.AtualizarUsuário(usuario));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ListagemUsuário")]
        public IActionResult ListaUsuário([FromQuery] Usuário usuário)
        {
            try
            {
                return Ok(_UsuárioBLL.ListarUsuário(usuário));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DeletarUsuário")]
        public IActionResult DeletarUsuário([FromQuery] int idUsuário)
        {
            try
            {
                return Ok(_UsuárioBLL.DeletarUsuário(idUsuário));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
