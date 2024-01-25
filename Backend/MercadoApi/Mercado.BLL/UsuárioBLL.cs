using Mercado.BLL.Utilitários;
using Mercado.DAL;
using Mercado.MOD;

namespace Mercado.BLL
{
    public class UsuárioBLL
    {
        private readonly UsuárioDAL _UsuárioDAL;
        private readonly SenhaHashSaltPepper _SenhaHashSaltPepper;
        private readonly Verificações _Verificações;
        public UsuárioBLL()
        {
            _UsuárioDAL = new UsuárioDAL();
            _SenhaHashSaltPepper = new SenhaHashSaltPepper();
            _Verificações = new Verificações();
        }
        public Usuário CadastrarUsuário(Usuário usuário)
        {
            //Criação senha HashSaltPepper:
            _Verificações.Senha(usuário.senha);
            string salt = _SenhaHashSaltPepper.CreateSalt(10);
            usuário.salt = salt;
            usuário.senha = _SenhaHashSaltPepper.GenerateSHA256Hash(usuário.senha, salt);

            if (!_UsuárioDAL.CadastrarUsuário(usuário))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return usuário;
        }
        public bool LoginUsuário(Usuário _Usuário)
        {
            Usuário confirmação = _UsuárioDAL.LoginUsuário(_Usuário);
            if (confirmação == null)
            {
                throw new Exception("Nome não encontrado.");
            }
            if (!_SenhaHashSaltPepper.VerifyPassword(_Usuário.senha, confirmação.salt, confirmação.senha))
            {
                throw new Exception("Usuário não registrado");
            }
            //Colocar cargo e id na entrada(_Usuário) para ser usado para criar o token
            _Usuário.cargo = confirmação.cargo;
            _Usuário.idUsuário = confirmação.idUsuário;
            return true;
        }
        public Usuário AtualizarUsuário(Usuário usuário)
        {
            //Detectar se o usuário trocou a senha:
            if (usuário.senha  != null)
            {
                _Verificações.Senha(usuário.senha);
                usuário.salt = _SenhaHashSaltPepper.CreateSalt(10);
                usuário.senha = _SenhaHashSaltPepper.GenerateSHA256Hash(usuário.senha, usuário.salt);
            }
            if (!_UsuárioDAL.AtualizarUsuário(usuário))
            {
                throw new Exception("Erro ao atualizar usuário.");
            }
            return usuário;
        }
        public List<Usuário> ListarUsuário(Usuário usuário)
        {
            return _UsuárioDAL.ListarUsuário(usuário);
        }
        public bool DeletarUsuário(int idUsuário)
        {
            if (idUsuário <= 0)
            {
                throw new Exception("Apenas valores positivos");
            }
            if (!_UsuárioDAL.DeletarUsuário(idUsuário))
            {
                throw new Exception("Erro ao Deletar.");
            }
            return true;
        }
    }
}
