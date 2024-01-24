const criaçãoContaForm = document.querySelector('#formCriaçãoConta');

criaçãoContaForm.addEventListener('submit', async (event) => {
  // Prevent form from submitting and refreshing the page
  event.preventDefault();

  const nome = document.querySelector('#nome').value;
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;
  const cargo = "cliente";

  const data = { nome, email, senha, cargo};
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  await fetch('https://localhost:7071/Usuário/CadastroUsuário', options).then( res=>{
      if(!res.ok) {
        return res.text().then(text => { throw new Error(text) })
       }
      else {
       alert("Usuário Cadastrado.")
     }
    }).catch(error=>{
        alert(error);
    })

});