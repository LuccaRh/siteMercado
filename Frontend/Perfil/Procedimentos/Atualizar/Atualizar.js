function obterInformacoesUsuario() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://localhost:7071/Usuário/ObterInformacoesUsuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();

            const idUsuário = data["idUsuario"];

            resolve(idUsuário);
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
            reject(error);
        }
    });
}

//Atualizar
const form = document.querySelector('#formLoginConta');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value || null;
    const email = document.getElementById('email').value || null;
    const senha = document.getElementById('senha').value || null;
    const idUsuário = await obterInformacoesUsuario();
    const att = { idUsuário, nome, email, senha };

    // Se o usuário confirmar, prossiga com a atualização
    if (nome !== null || email !== null || senha !== null){
        const confirmacao = window.confirm("Tem certeza que deseja atualizar os dados?");
        if (confirmacao) {

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(att)
        };

        await fetch('https://localhost:7071/Usuário/AtualizarUsuário', options)
            .then(res => {
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                } else {
                    alert("Usuário atualizado com sucesso.");
                }
            })
            .catch(error => {
                alert(error);
            });
    }}else{
        alert("Pelo menos um campo (nome, email ou senha) deve ter um valor para atualizar.");
    }
});

