using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MercadoApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuárioController : ControllerBase
    {
        [HttpPost("Teste")]
        public IActionResult Teest([FromBody] string id) => Ok(id);
    }
}
