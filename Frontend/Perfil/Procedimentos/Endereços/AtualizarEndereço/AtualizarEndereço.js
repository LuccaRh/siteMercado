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

//Atualizar
const form = document.querySelector('#formCriaçãoEndereço');


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        //Pegar idEndereço pelo query passado
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idEndereço = urlParams.get('idEndereço')

        const idUsuário = await obterIdUsuario();
        let nomeEndereço = document.getElementById('nomeEndereço').value || null;
        let número = document.getElementById('numero').value || null;
        let cep = document.getElementById('cep').value || null;
        let rua = document.getElementById('rua').value || null;
        let bairro = document.getElementById('bairro').value || null;
        let cidade = document.getElementById('cidade').value || null;
        let estado = document.getElementById('estado').value || null;
        const att = { idEndereço, idUsuário, número, cep, rua, bairro, cidade, estado, nomeEndereço };
        // Se o usuário confirmar, prossiga com a atualização
        if (nomeEndereço !== null || número !== null || cep !== null || rua !== null || bairro !== null || cidade !== null || estado !== null) {
            const confirmacao = window.confirm("Tem certeza que deseja atualizar os dados?");
            if (confirmacao) {

                const options = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(att)
                };

                const response = await fetch('https://localhost:7071/Endereço/AtualizarEndereço', options)
                if (!response.ok) {
                    const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                    throw new Error(`Erro ao atualizar endereço: ${errorMessage}`);
                }
                alert("Endereço atualizado com sucesso.");
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