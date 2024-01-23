using System.Runtime.ConstrainedExecution;

string cep = "13083-860";
cep = new string(cep.Where(char.IsDigit).ToArray());
Console.WriteLine(cep);
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
foreach (var (key, value) in dic)
{
    Console.WriteLine($"{key}: {value}");
}