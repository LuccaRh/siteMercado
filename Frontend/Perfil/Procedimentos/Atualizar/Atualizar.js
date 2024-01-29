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
const form = document.querySelector('#formLoginConta');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {

        const nome = document.getElementById('nome').value || null;
        const email = document.getElementById('email').value || null;
        const senha = document.getElementById('senha').value || null;
        const idUsuário = await obterIdUsuario();
        const att = { idUsuário, nome, email, senha };
        //Verificar se todos os campos estão nulos
        if (nome !== null || email !== null || senha !== null) {
            // Se o usuário confirmar, prossiga com a atualização
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
                    throw new Error(`Erro ao atualizar usuário: ${errorMessage}`);
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
