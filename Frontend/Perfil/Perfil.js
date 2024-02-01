//Utilizar do token para verificar cargo, e mostrar tela de administração, e para colocar o nome com o "Bem vindo"
document.addEventListener("DOMContentLoaded", async (event) => {
    try {

        event.preventDefault();
        let NomeBemVindo = document.getElementById('NomeBemVindo');
        let TAUsuário = document.getElementById('TAUsuário');
        let TAProduto = document.getElementById('TAProduto');
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
        const data = await response.json()
        NomeBemVindo.textContent = data["nome"];
        if (data["cargo"] == "moderador") {
            TAUsuário.style.display = "block";
            TAProduto.style.display = "block";
        }

    }
    catch (error) {
        alert(error);
    }
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


const deletelink = document.getElementById('deletelink');

deletelink.addEventListener('click', async function (event) {
    const confirmacao = window.confirm("Tem certeza que deseja deletar o usuário?");
    if (confirmacao) {
        event.preventDefault(); // Evita que o link redirecione para outra página

        try {
            const idUsuario = await obterIdUsuario();
            console.log(idUsuario)
            const response = await fetch('https://localhost:7071/Usuário/DeletarUsuário?idUsuário=' + idUsuario, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
                throw new Error(errorMessage);
              }
            const data = await response.json();
            console.log(data);
            alert("Usuário deletado com sucesso.");
            localStorage.removeItem('token');
            localStorage.removeItem('tokenValidade');
            const caminhoRelativoParaLogin = obterCaminhoRelativoParaDestino('Cadastro/Cadastro.html');
            window.location.href = caminhoRelativoParaLogin;
        } catch (error) {
            alert(error);
        }
    }
});