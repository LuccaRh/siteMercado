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


const criaçãoEndereçoForm = document.querySelector('#formCriaçãoEndereço');
criaçãoEndereçoForm.addEventListener('submit', async (event) => {
  // Prevent form from submitting and refreshing the page
  event.preventDefault();
  try {
    const idUsuário = await obterIdUsuario();
    let nomeEndereço = document.getElementById('nomeEndereço').value || null;
    let número = document.getElementById('numero').value || null;
    let cep = document.getElementById('cep').value || null;
    let rua = document.getElementById('rua').value || null;
    let bairro = document.getElementById('bairro').value || null;
    let cidade = document.getElementById('cidade').value || null;
    let estado = document.getElementById('estado').value || null;

    const data = { idUsuário, número, cep, rua, bairro, cidade, estado, nomeEndereço };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://localhost:7071/Endereço/CadastroEndereço', options)
    if (!response.ok) {
      const errorMessage = await response.text(); // Ou response.json() dependendo do formato da resposta
      throw new Error(errorMessage);
    }
    alert("Endereço Cadastrado.")
    location.reload();
  } catch (error) {
    alert(error);
  }
});