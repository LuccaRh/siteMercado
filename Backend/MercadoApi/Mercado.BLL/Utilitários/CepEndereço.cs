using Mercado.MOD;

namespace Mercado.BLL.Utilitários
{
    public class CepEndereço
    {
        public Dictionary<string,string> CepEspecificações(string cep)
        {
            cep = new string(cep.Where(char.IsDigit).ToArray());
            if (cep.Length != 8) 
            {
                string erro = "Digite um cep válido.";
                throw new Exception(erro);
            }
            //Pode ser no formato 01509000 ou 01509-000
            var addresses = new Correios.NET.CorreiosService().GetAddresses(cep);
            Dictionary<string, string> dic = new Dictionary<string, string>();
            foreach (var address in addresses) 
            {
                dic.Add("Cep", address.ZipCode);
                dic.Add("Rua", address.Street);
                dic.Add("Bairro", address.District);
                dic.Add("Cidade", address.City);
                dic.Add("Estado", address.State);
                Console.WriteLine("{0} - {1} - {2} - {3}/{4}", address.ZipCode, address.Street, address.District, address.City, address.State);
            }
            return dic;
        }
        public void EndereçoCep(Endereço endereço)
        {
            Dictionary<string, string> valores = CepEspecificações(endereço.cep);
            if (endereço.rua == null) { endereço.rua = valores["Rua"]; }
            if (endereço.bairro == null) { endereço.bairro = valores["Bairro"]; }
            if (endereço.cidade == null) { endereço.cidade = valores["Cidade"]; }
            if (endereço.estado == null) { endereço.estado = valores["Estado"]; }
        }
    }
}
