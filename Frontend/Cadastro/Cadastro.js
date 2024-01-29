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
  for (let i = 0; i < numDiretoriosParaSubir; i++) {
    login = "../" + login;
  };
  return login;
}

const criaçãoContaForm = document.querySelector('#formCriaçãoConta');

criaçãoContaForm.addEventListener('submit', async (event) => {
  // Prevent form from submitting and refreshing the page
  event.preventDefault();
  try {
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const cargo = "cliente";

    const data = { nome, email, senha, cargo };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://localhost:7071/Usuário/CadastroUsuário', options)
    if (!response.ok) {
      const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
      throw new Error(`Erro ao atualizar endereço: ${errorMessage}`);
    }
    
    alert("Usuário Cadastrado.")
    const caminhoRelativoParaLogin = obterCaminhoRelativoParaDestino('Login/Login.html');
    window.location.href = caminhoRelativoParaLogin;

  }
  catch (error) {
    alert(error);
  }

});