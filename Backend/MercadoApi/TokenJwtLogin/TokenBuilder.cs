using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Mercado.MOD;
using Microsoft.IdentityModel.Tokens;

namespace TokenJwtLogin
{
    public class TokenBuilder
    {
        public static string GenerateToken(Usuário usuario)
        {
            //Chave do token em bytes
            var key = Encoding.ASCII.GetBytes(TokenSettings.Secret); 

            // Criação das Claims (informações do usuário a serem incluídas no token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, usuario.nome),
                new Claim(ClaimTypes.Role, usuario.cargo),
                new Claim("Id do usuário", usuario.idUsuário.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())  // Identificador exclusivo do token
            };

            // Configuração das opções do token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),  // Tempo de expiração do token (1 hora neste exemplo)
                //Assinatura do token:
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            // Criação do token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Serialização do token para string
            string tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
        public static TokenInfo DecodeToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(TokenSettings.Secret);

            // Configurações de validação
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                // Tenta validar e decodificar o token
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out _);

                // Extrai informações do token, por exemplo, o nome do usuário
                var nome = claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
                var idUsuárioClaim = claimsPrincipal.FindFirst("Id do usuário")?.Value;
                var cargoClaim = claimsPrincipal.FindFirst(ClaimTypes.Role)?.Value;

                TokenInfo tokeninfo = new TokenInfo();
                tokeninfo.nome = nome;
                tokeninfo.idUsuário = string.IsNullOrEmpty(idUsuárioClaim) ? 0 : int.Parse(idUsuárioClaim);
                tokeninfo.cargo = cargoClaim;
                return tokeninfo;
            }
            catch (SecurityTokenException ex)
            {
                throw new Exception($"Erro ao decodificar o token: {ex.Message}");
            }
        }

    }
}
