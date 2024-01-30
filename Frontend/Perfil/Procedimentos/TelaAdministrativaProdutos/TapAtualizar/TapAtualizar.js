//Atualizar
const voltar = document.getElementById("voltar");
voltar.addEventListener('click', () => {
    try{
        window.location.href = "../TelaAdministrativaProdutos.html";
    }
    catch(error){
        console.log(error)
    }
})

const form = document.querySelector('#formCriaçãoEndereço');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        //Pegar idEndereço pelo query passado
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idProduto = urlParams.get('idProduto')

        let nome = document.getElementById('nome').value || null;
        let valorUnitário = document.getElementById('valorUnitário').value || null;
        let unidade = document.getElementById('unidade').value || null;
        let quantidade = document.getElementById('quantidade').value || null;
        let att = {valorUnitário, nome, unidade, quantidade, idProduto};
        // Se o usuário confirmar, prossiga com a atualização
        if (nome !== null || valorUnitário !== null || unidade !== null || quantidade !== null) {
            const confirmacao = window.confirm("Tem certeza que deseja atualizar os dados?");
            if (confirmacao) {

                const options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(att)
                };

                const response = await fetch('https://localhost:7071/Produto/AtualizarProduto', options)
                if (!response.ok) {
                    const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                    throw new Error(`Erro ao atualizar produto: ${errorMessage}`);
                }
                alert("Produto atualizado com sucesso.");
                location.reload();
            }
        } else {
            throw new Error("Pelo menos um campo deve ter um valor para atualizar.");
        }
    }
    catch (error) {
        alert(error);
    }
});