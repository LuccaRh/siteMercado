using Mercado.MOD;
using System.ComponentModel;
Dictionary<string, string> CepEspecificações(string cep)
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
    }
    return dic;
}
Endereço endereço = new Endereço();
endereço.cep = "01509000";
void EndereçoCep(Endereço endereço)
{
    Dictionary<string, string> valores = CepEspecificações(endereço.cep);
    endereço.rua = valores["Rua"];
    endereço.bairro = valores["Bairro"];
    endereço.cidade = valores["Cidade"];
    endereço.estado = valores["Estado"];
}

EndereçoCep(endereço);
foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(endereço))
{
    string name = descriptor.Name;
    object value = descriptor.GetValue(endereço);
    Console.WriteLine("{0}={1}", name, value);
}