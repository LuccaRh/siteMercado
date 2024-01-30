//Atualizar
const form = document.querySelector('#formCriaçãoEndereço');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        //Pegar idEndereço pelo query passado
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idUsuário = urlParams.get('idUsuário')

        let nome = document.getElementById('nome').value || null;
        let email = document.getElementById('email').value || null;
        let cargo = document.getElementById('cargo').value || null;
        const att = {idUsuário, nome, email, cargo};
        // Se o usuário confirmar, prossiga com a atualização
        if (nome !== null || email !== null || cargo !== null ) {
            const confirmacao = window.confirm("Tem certeza que deseja atualizar os dados?");
            if (confirmacao) {

                const options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(att)
                };

                const response = await fetch('https://localhost:7071/Usuário/AtualizarUsuário', options)
                if (!response.ok) {
                    const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                    throw new Error(`Erro ao atualizar endereço: ${errorMessage}`);
                }
                alert("Usuário atualizado com sucesso.");
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