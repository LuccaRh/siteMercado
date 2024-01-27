/*document.addEventListener("DOMContentLoaded", function () {
    // Criar um novo elemento div
    const novoElementoDiv = document.createElement('div');

    // Configurar propriedades ou conteúdo do novo elemento
    novoElementoDiv.textContent = 'Este é um novo elemento div criado dinamicamente!';

    // Adicionar o novo elemento ao corpo da página
    document.main.appendChild(novoElementoDiv);
});*/

//Pegar o endereço completo pelo idIndereço
async function obterEndereço(idEndereço) {
    try {
        const response = await fetch('https://localhost:7071/Endereço/ListagemEndereço?idEndereço=' + idEndereço, {
            method: 'GET'
        });
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
        const data = await response.json();

        const idUsuário = data["idUsuario"];
        return idUsuário;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
    }
}

let shop = document.getElementById("pedidos");

async function generateShop() {
    try {
        const idUsuario = await obterIdUsuario();
        const response = await fetch('https://localhost:7071/Pedido/ListagemPedido?idUsuário=' + idUsuario, {
            method: 'GET',
        });
        const data = await response.json();

        // Criando uma key nova para 
        const enderecosPromises = data.map(x => obterEndereço(x.idEndereço));
        console.log(enderecosPromises)
        // Aguardando a resolução de todas as Promises
        const enderecos = await Promise.all(enderecosPromises);
        console.log(enderecos);
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

generateShop();