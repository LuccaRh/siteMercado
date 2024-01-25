using Mercado.BLL;
using Mercado.MOD;
using Microsoft.AspNetCore.Mvc;
using TokenJwtLogin;

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
        [HttpPost("LoginUsuário")]
        public IActionResult LoginUsuário([FromBody] Usuário usuario)
        {
            try
            {
                bool auth = _UsuárioBLL.LoginUsuário(usuario);
                if(auth)
                {
                    var token = TokenBuilder.GenerateToken(usuario);
                    return Ok(new { Token = token });
                }
                else
                {
                    return Unauthorized(new { Message = "Falha na autenticação" });
                }
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
        [HttpGet("ObterInformacoesUsuario")]
        public IActionResult ObterInformacoesUsuario()
        {
            try
            {
                // Obtenha o token da solicitação
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

                // Decodifique o token e obtenha as informações do usuário
                var tokenInfo = TokenBuilder.DecodeToken(token);

                // Retorne as informações do usuário como JSON
                return Ok(new
                {
                    Nome = tokenInfo.nome,
                    IdUsuario = tokenInfo.idUsuário,
                    Cargo = tokenInfo.cargo
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
