function obterIdUsuario() {
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
const form = document.querySelector('#formCriaçãoEndereço');


form.addEventListener('submit', async (event) => {
    event.preventDefault();

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
    const att = {idEndereço,idUsuário,número, cep, rua, bairro, cidade, estado, nomeEndereço};
    console.log(att);
    // Se o usuário confirmar, prossiga com a atualização
    if (nomeEndereço !== null || número !== null || cep !== null || rua !== null || bairro !== null || cidade !== null || estado !== null){
        const confirmacao = window.confirm("Tem certeza que deseja atualizar os dados?");
        if (confirmacao) {

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(att)
        };

        await fetch('https://localhost:7071/Endereço/AtualizarEndereço', options)
            .then(res => {
                if (!res.ok) {
                    return res.text().then(text => { throw new Error(text) })
                } else {
                    alert("Endereço atualizado com sucesso.");
                }
            })
            .catch(error => {
                alert(error);
            });
    }}else{
        alert("Pelo menos um campo deve ter um valor para atualizar.");
    }
});