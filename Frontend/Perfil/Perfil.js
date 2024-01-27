//Utilizar do token para verificar cargo
document.addEventListener("DOMContentLoaded", async (event) =>{
    event.preventDefault();
    let nome = document.getElementById('Nome');
    let mod = document.getElementById('moderador');
    await fetch('https://localhost:7071/Usuário/ObterInformacoesUsuario', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(response => response.json())
        .then(data => {
            // Aqui, 'data' conterá as informações do usuário retornadas pelo backend
            //Verificando cargo:
            if (data["cargo"] == "moderador"){
                mod.style.display = "block";
            }

        })
        .catch(error => {
            console.error('Erro ao obter informações do usuário:', error);
        })
}); 
