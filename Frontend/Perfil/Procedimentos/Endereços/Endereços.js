const form = document.querySelector('form');

//Ao entrar na página, a tabela já é construida com todos os usuários
$(document).ready(async (event) => {
    let query = await Querybuild();
    FiltrarAjax(query);
});

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

//Ao clicar no botão, é levado para a página e atualizar, com o id na sua query
$(document).on('click', '.editar', function(){
    //Pegar os dados da coluna Atualizar/Deletar e acessar o id dela (ou seja, o idEndereço)
    let idEndereço = $(this).data()['id'];
    window.location.href = "AtualizarEndereço/AtualizarEndereço.html?idEndereço="+idEndereço
})


//Ao clicar é feito o request para a api do backend, já com o id na sua query
$(document).on('click', '.excluir', function(){    
    let id = $(this).data('id');
    const confirmacao = window.confirm("Tem certeza que deseja deletar esse endereço?");
        if (confirmacao) {
            $.ajax({
                    url: 'https://localhost:7071/Endereço/DeletarEndereço?idEndereço='+id,
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
        url: "https://localhost:7071/Endereço/ListagemEndereço?" + query,
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
                { data: "nomeEndereço", className: "text-center" },
                { data: "número", className: "text-center" },
                { data: "cep", className: "text-center" },
                { data: "rua", className: "text-center" },
                { data: "bairro", className: "text-center" },
                { data: "cidade", className: "text-center" },
                { data: "estado", className: "text-center" },
                { data: "idEndereço", render: function(data) { 
                    return '<button class="btn btn-primary glyphicon glyphicon-pencil editar" data-id="'+data+'"></button> <button class="btn btn-danger glyphicon glyphicon-remove excluir" data-id="'+data+'"></button>'}},
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
    const idUsuário = await obterIdUsuario();
    let nomeEndereço = document.getElementById('nomeEndereço').value || null;
    let número = document.getElementById('numero').value || null;
    let cep = document.getElementById('cep').value || null;
    let rua = document.getElementById('rua').value || null;
    let bairro = document.getElementById('bairro').value || null;
    let cidade = document.getElementById('cidade').value || null;
    let estado = document.getElementById('estado').value || null;
    
    const data = {idUsuário,número, cep, rua, bairro, cidade, estado, nomeEndereço};

    // Filtra entradas nulas ou indefinidas
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined)
    );

    query = Object.keys(filteredData).map(function(key) {
        return key + '=' + filteredData[key];
    }).join('&');
    return query;
}