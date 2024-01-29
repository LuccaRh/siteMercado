const createAccountForm = document.querySelector('#formLoginConta');

createAccountForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const nome = document.querySelector('#username').value;
    const senha = document.querySelector('#password').value;

    const data = { nome, senha };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    };

    //Criação do token no backend, ele é pego e armazenado no localstorage do browser
    const res = await fetch('https://localhost:7071/Usuário/LoginUsuário', options);
    if (!res.ok) {
      const errorMessage = await res.text(); // Ou response.json() dependendo do formato da resposta
      throw new Error(`Erro ao logar: ${errorMessage}`);
    }
    //Alocação do token no browser, além do token com a validade dele
    const json = await res.json();
    localStorage.setItem('token', json["token"]);
    //Validade:
    var dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() + 1);
    localStorage.setItem('tokenValidade', dataAtual);

    alert("Usuário Logado com sucesso.");
    window.location.href = "../Perfil/Perfil.html"

  } catch (error) {
    alert(error);
  }
});

