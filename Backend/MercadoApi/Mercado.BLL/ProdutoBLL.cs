using Mercado.DAL;
using Mercado.MOD;

namespace Mercado.BLL
{
    public class ProdutoBLL
    {
        private readonly ProdutoDAL _ProdutoDAL;
        public ProdutoBLL()
        {
            _ProdutoDAL = new ProdutoDAL();
        }
        public Produto CadastrarProduto(Produto produto)
        {
            if (!_ProdutoDAL.CadastrarProduto(produto))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return produto;
        }
        public List<Produto> ListarProduto(Produto produto)
        {
            return _ProdutoDAL.ListarProduto(produto);
        }
        public Produto AtualizarProduto(Produto produto)
        {
            if (!_ProdutoDAL.AtualizarProduto(produto))
            {
                throw new Exception("Erro ao cadastrar.");
            }
            return produto;
        }
        public bool DeletarProduto(int idProduto)
        {
            if (idProduto <= 0)
            {
                throw new Exception("Apenas valores positivos");
            }
            if (!_ProdutoDAL.DeletarProduto(idProduto))
            {
                throw new Exception("Erro ao atualizar.");
            }
            return true;
        }
    }
}
