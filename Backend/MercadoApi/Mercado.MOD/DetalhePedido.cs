

namespace Mercado.MOD
{
    public class DetalhePedido
    {
        public int? idDetalhe { get; set; }
        public int? idPedido { get; set; }
        public int? idProduto { get; set; }
        public int? quantidade { get; set; }
        public float? valorUnitário { get; set; }
    }
}
