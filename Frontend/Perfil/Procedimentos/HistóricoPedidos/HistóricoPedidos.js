async function obterEndereço(idEndereço) {
    try {
        const response = await fetch('https://localhost:7071/Endereço/ListagemEndereço?idEndereço=' + idEndereço, {
            method: 'GET'
        });
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
          }
        let datalist = await response.json();
        const data = datalist[0];
        const nomeEndereço = data['nomeEndereço'];
        const número = data['número'];
        const rua = data['rua'];
        const bairro = data['bairro'];
        const cidade = data['cidade'];
        const estado = data['estado'];
        var endereço = `${nomeEndereço}: ${rua} ${número}, ${bairro}, ${cidade}, ${estado}`;
        return endereço;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
    }
}

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

        // Pegando os indereços de cada pedido
        // Lista com a funct assincrona obterEndereço, assim tendo uma promise em cada valor 
        const enderecosPromises = data.map(x => obterEndereço(x.idEndereço));
        // Resolução de cada promise da lista enderecosPromises, retornando uma lista de promises resolves
        const enderecos = await Promise.all(enderecosPromises);

        // Construindo o HTML
        const htmlContent = data.map((x, index) => {
            return `
                <div id=pedido-id-${x.idPedido} class="pedido">
                    <div class="details">
                        <h3>${x.dataPedido}</h3>
                        <p>Valor total: ${x.valorTotal}</p>
                        <p>Endereço: ${enderecos[index]}</p>
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