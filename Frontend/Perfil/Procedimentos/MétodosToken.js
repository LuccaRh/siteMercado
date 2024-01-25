//Logout da página ao clickar em Logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que o link redirecione para outra página

      // Função de logout aqui (por exemplo, limpar o token do localStorage)
      localStorage.removeItem('token');

      // Redireciona para a página de login ou outra página desejada
      window.location.href = '../../../Login/Login.html';
    });
  }
});

//Detecção se Usuário está realmente logado
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');

  if (!token) {
      // Usuário não autenticado, redirecione para a página de login
      alert("Usuário não logado.");
      window.location.href = "../../../Login/Login.html";
  }
});

//Utilizar do token para pegar nome do usuário
document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();
    let nome = document.getElementById('Nome');
    await fetch('https://localhost:7071/Usuário/ObterInformacoesUsuario', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(response => response.json())
        .then(data => {
            // Aqui, 'data' conterá as informações do usuário retornadas pelo backend
            nome.textContent = data["nome"]; //Pegando nome do usuário para o Bem vindo, {nome}            
        })
        .catch(error => {
            console.error('Erro ao obter informações do usuário:', error);
        })
}); 