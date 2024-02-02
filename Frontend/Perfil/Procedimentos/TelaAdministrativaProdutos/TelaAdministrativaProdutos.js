const form = document.querySelector('form');

//Ao entrar na página, a tabela já é construida com todos os usuários
$(document).ready(async (event) => {
    let query = await Querybuild();
    FiltrarAjax(query);
});

//Ao clicar no botão, é levado para a página e atualizar, com o id na sua query
$(document).on('click', '.botao-atualizar', function(){
    //Pegar os dados da coluna Atualizar/Deletar e acessar o id dela (ou seja, o idUsuário)
    let idProduto = $(this).data('id');
    window.location.href = "TapAtualizar/TapAtualizar.html?idProduto="+idProduto
})


//Ao clicar é feito o request para a api do backend, já com o id na sua query
$(document).on('click', '.botao-deletar', function(){    
    let idProduto = $(this).data('id');
    const confirmacao = window.confirm("Tem certeza que deseja deletar esse produto?");
        if (confirmacao) {
            $.ajax({
                    url: 'https://localhost:7071/Produto/DeletarProduto?idProduto='+idProduto,
                    type: 'DELETE',
                    data: {id},
                    success: function (data2) {
                    alert("Excluido com sucesso!");
                    location.reload();
                    },
                    error: function (request, status, error) {
                        alert(request.responseText);
                    }
                });
        }
})

//Procura pelo forms, datatable é removida, e outra é criada, com base nos valores do forms
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $('#myTable').DataTable().clear().destroy();
    let query = await Querybuild();
    FiltrarAjax(query);

})

//Cria a Datatable utilizando o método filtro da api, na coluna id há dois botões, com a propriedade data-id com o 
//id do usuário
function FiltrarAjax(query){
    $.ajax({
        type: "GET",
        url: "https://localhost:7071/Produto/ListagemProduto?" + query,
        dataType: "json",
        success: function (data) {
            $('#myTable').DataTable({
                responsive: true,
                fixedColumns: true,
                "bPaginate": false,
                
                data: data,
                //Dados pegos do método GET, data é o json de cada resposta do GET
                columns: [
                    { data: "imagem", render: function(data) { 
                        let img = "https://spoonacular.com/cdn/ingredients_100x100/" + data;
                        return '<img src="' + img + '" width="100" height="100" alt="Imagem do Produto">';
                      }},
                    { data: "nome", className: "text-center" },
                    { data: "valorUnitário", className: "text-center" },
                    { data: "unidade", className: "text-center" },
                    { data: "quantidade", className: "text-center" },
                    { data: "idProduto", render: function(data) { 
                    return '<button class="botao-atualizar" data-id="'+data+'">Atualizar</button> <button class="botao-deletar" data-id="'+data+'">Deletar</button>'}},
                ]
            });
        },
        error: function (error) {
        }
    });
}

//Constroi a query baseada no form, se não for inserido nenhum valor (ex: ao entrar na pag), a query fica vazia
async function Querybuild(){
    let query = "";
    let nome = document.getElementById('nome').value || null;
    const data = {nome};
    // Filtra entradas nulas ou indefinidas
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
    );
    query = Object.keys(filteredData).map(function(key) {
        return key + '=' + filteredData[key];
    }).join('&');
    return query;
}