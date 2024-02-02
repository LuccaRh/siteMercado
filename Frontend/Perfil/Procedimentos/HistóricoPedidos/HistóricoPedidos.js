async function obterIdUsuario() {
    try {
      const response = await fetch('https://localhost:7071/Usuário/ObterInformacoesUsuario', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const idUsuário = data["idUsuario"];
      return idUsuário;
  
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
}

let shop = document.getElementById("pedidos");

async function gerarPedidos() {
    try {
        const idUsuario = await obterIdUsuario();
        const response = await fetch('https://localhost:7071/Pedido/ListagemPedido?idUsuário=' + idUsuario, {
            method: 'GET',
        });
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
          }
        const data = await response.json();

        // Construindo o HTML
        const htmlContent = data.map((x, index) => {
            return `
            <div class="borda">
                <div id=pedido-id-${x.idPedido} class="pedido">
                    <div class="details">
                        <h3>${x.dataPedido}</h3>
                        <p>Valor total: R$ ${x.valorTotal}</p>
                        <p>Endereço: ${x.endereçoCompleto}</p>
                    </div>
                </div>
              </div>
            `;
        }).join("");

        // Adicionando o HTML ao elemento com id "shop"
        shop.innerHTML = htmlContent;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
    }
}

gerarPedidos();