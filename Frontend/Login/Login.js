const createAccountForm = document.querySelector('#formLoginConta');

createAccountForm.addEventListener('submit',
  async (event) => {
    event.preventDefault();

    const nome = document.querySelector('#username').value;
    const senha = document.querySelector('#password').value;

    const data = { nome, senha };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    };

    try {
        const res = await fetch('https://localhost:7071/Usuário/LoginUsuário', options);

        if (!res.ok) {
            throw new Error(await res.text());
        }

        const json = await res.json();
        const token = json.Token;
        // Armazene o token conforme necessário (local storage, cookies, etc.)
        localStorage.setItem('token', json["token"]);

        alert("Usuário Logado com sucesso.");
        console.log("Token Valor: ", localStorage.getItem('token'));

        window.location.href = "../Perfil/Perfil.html"
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});


