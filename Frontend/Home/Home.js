//Utilizar do token para verificar nav
document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        event.preventDefault();
        let nome = document.getElementById('Nome');
        let logado = document.getElementById('logado');
        let nãologado = document.getElementById('não logado');
        if (localStorage.getItem('token')) {
            const response = await fetch('https://localhost:7071/Usuário/ObterInformacoesUsuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                throw new Error(errorMessage);
            }
            const data = await response.json();
            nome.textContent = data["nome"]; //Pegando nome do usuário para o Bem vindo, {nome} 
            logado.style.display = "block";
            nãologado.style.display = "none";
        }
        else {
            logado.style.display = "none";
            nãologado.style.display = "block";
        }

    }
    catch {
        console.error('Erro ao obter informações do usuário:', error);
    }
});


//Logout da página ao clickar em Logout
document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault(); // Evita que o link redirecione para outra página

            // Função de logout aqui (por exemplo, limpar o token do localStorage)
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValidade');
            // Redireciona para a página de login ou outra página desejada
            location.reload()
        });
    }
});


//Pegar id do usuário
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



//Gerar produtos
let shop = document.getElementById("produtos");

async function gerarProdutos() {
    try {
        const response = await fetch('https://localhost:7071/Produto/ListagemProduto', {
            method: 'GET',
        });
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
        }
        const data = await response.json();

        // Construindo o HTML
        const htmlContent = data.map((x, index) => {
            let img = x.imagem = "https://spoonacular.com/cdn/ingredients_100x100/" + x.imagem
            return `
                <div class="pedido">
                <img width="150" height="150" src=${img} alt="">
                    <div class="details">
                        <h3>${x.nome}</h3>
                        <div class="price-quantity">
                            <span><h2>R$ ${x.valorUnitário}</h2><p>por ${x.unidade}</p></span>
                            <div><button type="button" data-produto='${JSON.stringify(x)}' onclick="adicionarAoCarrinho(this)">Comprar!</button></div>
                            </div>
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
gerarProdutos();



//Deixar usar carrinho apenas se estiver
//Carrinho
let carrinhoform = document.getElementById("carrinho-produtos");
let carrinholist = [];
function exibirCarrinho() {
    let produtoscarrinho = ""
    for (let produto of carrinholist) {
        produtoscarrinho += `
        <tr>
        <td><div><img width="100" height="100" src=${produto.imagem} alt="">${produto.nome}</div><td>
        <td>R$ ${produto.valorAtual}<td>
        <td><input type ="number" value=${produto.quantidadeAtual} min=1 max=${produto.quantidade} id="quantidade-${produto.idProduto}">
        ${produto.unidade}
        <button onclick="atualizarQuantidade(${produto.idProduto})">Atualizar</button>
        <button onclick="removerDoCarrinho(${produto.idProduto})">Remover</button><td>
        </tr>
        `;
    }
    carrinhoform.innerHTML = produtoscarrinho;
}

function atualizarQuantidade(idProduto) {
    const inputQuantidade = document.getElementById(`quantidade-${idProduto}`);
    const novaQuantidade = parseInt(inputQuantidade.value, 10);
    carrinholist = carrinholist.map((produto) => {
        if (produto.idProduto === idProduto) {
            produto.quantidadeAtual = novaQuantidade;
            produto.valorAtual = produto.valorUnitário * novaQuantidade;
            produto.valorAtual = produto.valorAtual.toFixed(2);
        }
        return produto;
    })
    // Atualizar a exibição do carrinho
    exibirNotificacao("Quantidade atualizada!", true);
    exibirCarrinho();
};

//Notificações de quando clickar em "comprar"
function exibirNotificacao(mensagem, metodo) {
    const notificacao = document.getElementById('notificacaoAdd');
    notificacao.textContent = mensagem;
    if (metodo) {
        notificacao.style.backgroundColor = "#4CAF50";
    }
    else {
        notificacao.style.backgroundColor = "#aa2618";
    }
    notificacao.classList.add('mostrar');
    setTimeout(() => {
        notificacao.classList.remove('mostrar');
    }, 3000);
}


function adicionarAoCarrinho(botao) {
    if (verificarLogado()) {
        location.reload();
        return;
    }
    const produto = JSON.parse(botao.dataset.produto);
    produto.quantidadeAtual = 1;
    produto.valorAtual = produto.valorUnitário;
    //Verificar se produto já está no carrinho pelo seu id
    let produtoJaNoCarrinho = carrinholist.map((x) => { return x.idProduto === produto.idProduto })
    const existeTrue = produtoJaNoCarrinho.some(elemento => elemento === true);
    if (existeTrue) {
        exibirNotificacao("Produto já está no carrinho!", false);
        return;
    }
    carrinholist.push(produto); // Adiciona a quantidade inicial como 1
    exibirNotificacao("Produto adicionado ao carrinho!", true);
    // Atualiza a exibição do carrinho
    exibirCarrinho();
}

function verificarLogado() {
    if (!localStorage.getItem('token')) {
        alert("Necessário estar logado para comprar!");
        return true;
    }

    const tokenValidade = localStorage.getItem('tokenValidade');
    const tempoValidade = new Date(tokenValidade);
    const tempoReal = new Date();
    if (tempoReal.getTime() > tempoValidade.getTime()) {
        // Usuário não autenticado, redirecione para a página de login
        localStorage.removeItem('token');
        localStorage.removeItem('tokenValidade');
        alert("Tempo de experiração do login.");
        return true;
    }
    else {
        return false;
    }
}

function removerDoCarrinho(idProduto) {
    console.log(idProduto)
    //Filtrar para remover elemento com mesmo id do input da função
    carrinholist = carrinholist.filter((x) => x.idProduto !== idProduto);
    console.log(carrinholist);
    exibirCarrinho();
}




function obterDataHoraFormatada(dataAtual) {
    // Obtém as partes da data
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // O mês começa do zero, então adicionamos 1
    const dia = dataAtual.getDate().toString().padStart(2, '0');

    // Obtém as partes do horário
    const horas = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundos = dataAtual.getSeconds().toString().padStart(2, '0');

    // Monta a string no formato DATETIME do SQL Server
    const dataHoraFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    return dataHoraFormatada;
}

async function finalizarCompra() {
    try {
        if (verificarLogado()) {
            return;
        }
        if (!carrinholist) {
            alert("Carrinho Vazio");
            return;
        }
        // Cadastro do pedido
        const enderecoSelect = document.getElementById('endereco');
        const idEndereço = parseInt(enderecoSelect.selectedOptions[0].value);
        const idUsuário = await obterIdUsuario();
        const tempoAtual = new Date();
        const DataPedido = obterDataHoraFormatada(tempoAtual);
        let valorTotal = 0;
        const valor = carrinholist.map((produto) => { valorTotal += parseFloat(produto.valorAtual) })
        valorTotal = parseFloat(valorTotal.toFixed(2));
        const data = { idUsuário, idEndereço, DataPedido, valorTotal };
        console.log(data)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch("https://localhost:7071/Pedido/CadastroPedido", options)
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
        }
        //Adicionar os produtos no detalhe do pedido
        const idPedido = await getIdPedido(idUsuário, DataPedido);
        for (let produto of carrinholist) {
            let idProduto = produto.idProduto;
            let valorUnitário = produto.valorUnitário;
            let quantidade = produto.quantidadeAtual;
            let data = { idPedido, idProduto, valorUnitário, quantidade }
            console.log(data);
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const response = await fetch("https://localhost:7071/DetalhePedido/CadastroDetalhePedido", options)
            if (!response.ok) {
                const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                throw new Error(errorMessage);
            }
        }
        alert("Compra realizada!");
        carrinholist = []; // Limpa o carrinho após finalizar a compra
        exibirCarrinho(); // Atualiza a exibição do carrinho
    }
    catch (error) {
        //remover pedido e detalhes falhos
        console.log(error);
        alert(error);
    }
}
async function getIdPedido(idUsuário, tempoPedido) {
    try {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`https://localhost:7071/Pedido/ListagemPedido?idUsuário=${idUsuário}&dataPedido=${tempoPedido}`, options)
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
        }
        const datalist = await response.json();
        console.log(datalist)
        const data = datalist[0];
        console.log(data)
        console.log(data.idPedido);
        return data.idPedido;
    }
    catch (error) {
        alert(error);
    }

}





//Endereço
async function obterEndereços() {
    try {
        const idUsuário = await obterIdUsuario();
        const response = await fetch('https://localhost:7071/Endereço/ListagemEndereço?idUsuario=' + idUsuário, {
            method: 'GET'
        });
        if (!response.ok) {
            const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
            throw new Error(errorMessage);
        }
        let datalist = await response.json();
        //const data = datalist[0];
        const listaEndereços = datalist.map((endereçoData) => { return { endereço: EndereçoString(endereçoData), idEndereço: endereçoData.idEndereço } })
        return listaEndereços;
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
    }
}

function EndereçoString(data) {
    const nomeEndereço = data['nomeEndereço'];
    const número = data['número'];
    const rua = data['rua'];
    const bairro = data['bairro'];
    const cidade = data['cidade'];
    const estado = data['estado'];
    var endereço = `${nomeEndereço}: ${rua} ${número}, ${bairro}, ${cidade}, ${estado}`;
    return endereço;

}

document.addEventListener('DOMContentLoaded', async function () {
    const endereçoSelect = document.getElementById('endereco');
    listaEndereços = await obterEndereços();
    for (let endereço of listaEndereços) {
        const option = document.createElement("option");
        option.value = endereço.idEndereço; // Pode usar o índice como valor ou o próprio endereço
        option.text = endereço.endereço;
        console.log()
        endereçoSelect.add(option);
    };
});

