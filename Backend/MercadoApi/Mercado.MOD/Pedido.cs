namespace Mercado.MOD
{
    public class Pedido
    {
        public int? idPedido { get; set; }
        public int? idUsuário { get; set; }
        public int? idEndereço { get; set; }
        public string? dataPedido { get; set; }
        public float? ValorTotal { get; set; }
    }
}
