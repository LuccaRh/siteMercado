namespace Mercado.MOD
{
    public class Usuário
    {
        public int? idUsuário { get; set; }
        public string? email { get; set; }
        public string? nome { get; set; }
        public string? cargo { get; set; }
        public string? senha { get; set; }
        public string? salt { get; set; }
    }
}
