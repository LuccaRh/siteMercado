function obterCaminhoRelativoParaDestino(destino) {
  //Pega o caminho para o arquivo atual pelo html
    const htmlPath = location.pathname;
    //Remove o "http://127.0.0.1:5500/Frontend/" do caminho, ou qualquer que seja o caminho inicial até Frontend
    const indexFrontend = htmlPath.indexOf("Frontend/");
    const caminhoRelativo = htmlPath.substring(indexFrontend + "Frontend/".length);
    //Contagem de quantos "/" sobraram no caminho, este é o mesmo número de "../" que precisam ser colocados para chegar até o Frontend
    const matches = caminhoRelativo.match(/\//g);
    const numDiretoriosParaSubir = matches.length;
    //Montagem da string para o destino
    let login = destino;
    for (let i = 0; i<numDiretoriosParaSubir; i++){
        login = "../" + login;
    };
    return login;
}




//Logout da página ao clickar em Logout
document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.getElementById('logoutLink');

  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que o link redirecione para outra página

      // Função de logout aqui (por exemplo, limpar o token do localStorage)
      localStorage.removeItem('token');
      localStorage.removeItem('tokenValidade');
      // Redireciona para a página de login ou outra página desejada
      const caminhoRelativoParaLogin = obterCaminhoRelativoParaDestino('Login/Login.html');
      window.location.href = caminhoRelativoParaLogin;
    });
  }
});





//Detecção se Usuário está realmente logado
document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
      // Usuário não autenticado, redirecione para a página de login
      alert("Usuário não logado.");
      const caminhoRelativoParaLogin = obterCaminhoRelativoParaDestino('Login/Login.html');
      window.location.href = caminhoRelativoParaLogin;
  }
});




//Verificar a validade do token
document.addEventListener('DOMContentLoaded', function () {
  const tokenValidade = localStorage.getItem('tokenValidade');
  const tempoValidade = new Date(tokenValidade);
  const tempoReal = new Date();
  if (tempoReal.getTime() > tempoValidade.getTime()) {
      // Usuário não autenticado, redirecione para a página de login
      localStorage.removeItem('token');
      localStorage.removeItem('tokenValidade');
      alert("Tempo de experiração do login.");
      let caminhoRelativoParaLogin = obterCaminhoRelativoParaDestino('Login/Login.html');
      window.location.href = caminhoRelativoParaLogin;
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