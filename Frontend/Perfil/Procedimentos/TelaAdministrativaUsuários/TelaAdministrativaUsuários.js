const form = document.querySelector('form');

//Ao entrar na página, a tabela já é construida com todos os usuários
$(document).ready(async (event) => {
    let query = await Querybuild();
    FiltrarAjax(query);
});

//Ao clicar no botão, é levado para a página e atualizar, com o id na sua query
$(document).on('click', '.botao-atualizar', function(){
    //Pegar os dados da coluna Atualizar/Deletar e acessar o id dela (ou seja, o idUsuário)
    let idUsuário = $(this).data('id');
    console.log(idUsuário);
    window.location.href = "TelaAdministrativaUsuáriosAtualizar/TelaAdministrativaUsuáriosAtualizar.html?idUsuário="+idUsuário
})


//Ao clicar é feito o request para a api do backend, já com o id na sua query
$(document).on('click', '.botao-deletar', function(){    
    let idUsuário = $(this).data('id');
    const confirmacao = window.confirm("Tem certeza que deseja deletar esse endereço?");
        if (confirmacao) {
            $.ajax({
                    url: 'https://localhost:7071/Usuário/DeletarUsuário?idUsuário='+idUsuário,
                    type: 'DELETE',
                    data: {id},
                    success: function (data2) {
                    alert("Excluido com sucesso!");
                    location.reload();
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
        url: "https://localhost:7071/Usuário/ListagemUsuário?" + query,
        dataType: "json",
        success: function (data) {
            $('#myTable').DataTable({
                responsive: true,
                fixedColumns: true,
                "bPaginate": false,
                columnDefs: [
                    { width: 350, targets: 0},
                    { width: 250, targets: [1]},
                    { width: 200, targets: [2]},
                    { width: 150, targets: [3,4]}
                ],
                data: data,
                //Dados pegos do método GET, data é o json de cada resposta do GET
                columns: [
                    { data: "idUsuário", className: "text-center" },
                    { data: "nome", className: "text-center" },
                    { data: "email", className: "text-center" },
                    { data: "cargo", className: "text-center" },
                    { data: "idUsuário", render: function(data) { 
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
    let idUsuário = null;
    let nome = document.getElementById('nome').value || null;
    let email = document.getElementById('email').value || null;
    let cargo = document.getElementById('cargo').value || null;
    const data = {idUsuário, nome, email, cargo};
    // Filtra entradas nulas ou indefinidas
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
    );
    query = Object.keys(filteredData).map(function(key) {
        return key + '=' + filteredData[key];
    }).join('&');
    return query;
}