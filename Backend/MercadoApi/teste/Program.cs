using System.Security.Cryptography;
using System.Text;

string pepper = "RV";
static string ByteArrayToHexString(byte[] ba)
{
    StringBuilder hex = new StringBuilder(ba.Length * 2);
    foreach (byte b in ba)
        hex.AppendFormat("{0:x2}", b);
    return hex.ToString();
}

string CreateSalt(int size)
{
    var rng = new RNGCryptoServiceProvider();
    var buff = new byte[size];
    rng.GetBytes(buff);
    return Convert.ToBase64String(buff);
}
string GenerateSHA256Hash(string senha, string salt)
{
    byte[] bytes = Encoding.UTF8.GetBytes(senha + salt + pepper);
    SHA256Managed sha256hashstring = new SHA256Managed();
    byte[] hash = sha256hashstring.ComputeHash(bytes);
    string ass =  ByteArrayToHexString(hash);
    return ass;
}
bool VerifyPassword(string enteredPassword, string salt, string storedHashedPassword)
{
    Console.WriteLine("enteredPassword: " + enteredPassword);
    Console.WriteLine("salt: " + salt);
    Console.WriteLine("storedHash: " + storedHashedPassword);
    string hashedInputPassword = GenerateSHA256Hash(enteredPassword, salt);
    Console.WriteLine("InputHash: " + hashedInputPassword);
    return hashedInputPassword == storedHashedPassword;
}
string senha = "keiko123";
string salt = CreateSalt(10);
string storedHashedPassword = GenerateSHA256Hash(senha, salt);
if (VerifyPassword(senha, salt, storedHashedPassword))
{
    Console.WriteLine("Senha correta");
}
else
{
    {
        Console.WriteLine("Senha incorreta");
    }
}
