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


const criaçãoEndereçoForm = document.querySelector('#formCriaçãoEndereço');
criaçãoEndereçoForm.addEventListener('submit', async (event) => {
  // Prevent form from submitting and refreshing the page
  event.preventDefault();

    const idUsuário = await obterIdUsuario();
    let nomeEndereço = document.getElementById('nomeEndereço').value || null;
    let número = document.getElementById('numero').value || null;
    let cep = document.getElementById('cep').value || null;
    let rua = document.getElementById('rua').value || null;
    let bairro = document.getElementById('bairro').value || null;
    let cidade = document.getElementById('cidade').value || null;
    let estado = document.getElementById('estado').value || null;
    
    const data = {idUsuário,número, cep, rua, bairro, cidade, estado, nomeEndereço};
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  await fetch('https://localhost:7071/Endereço/CadastroEndereço', options).then( res=>{
      if(!res.ok) {
        return res.text().then(text => { throw new Error(text) })
       }
      else {
       alert("Endereço Cadastrado.")
     }
    }).catch(error=>{
        alert(error);
    })

});