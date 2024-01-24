using Mercado.BLL.Utilitários;
using Mercado.DAL;
using Mercado.MOD;

namespace Mercado.BLL
{
    public class EndereçoBLL
    {
        private readonly EndereçoDAL _EndereçoDAL;
        private readonly CepEndereço _CepEndereço;
        public EndereçoBLL()
        {
            _EndereçoDAL = new EndereçoDAL();
            _CepEndereço = new CepEndereço();
        }
        public Endereço CadastrarEndereço(Endereço endereço)
        {
            if (endereço.cep != null) { _CepEndereço.EndereçoCep(endereço); }
            if (!_EndereçoDAL.CadastrarEndereço(endereço))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return endereço;
        }
        public List<Endereço> ListarEndereço(Endereço endereço)
        {
            return _EndereçoDAL.ListarEndereço(endereço);
        }
        public Endereço AtualizarEndereço(Endereço endereço)
        {
            if (endereço.cep != null) { _CepEndereço.EndereçoCep(endereço); }
            if (!_EndereçoDAL.AtualizarEndereço(endereço))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return endereço;
        }
        public bool DeletarEndereço(int idEndereço)
        {
            if (idEndereço <= 0)
            {
                throw new Exception("Apenas valores positivos");
            }
            if (!_EndereçoDAL.DeletarEndereço(idEndereço))
            {
                throw new Exception("Erro ao Deletar.");
            }
            return true;
        }
    }
}
