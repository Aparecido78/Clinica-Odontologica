const Senha = document.getElementById("EditarSenhaAdmin");
const EditarInformacoesPessoais = document.getElementById("EditarInformacoesPessoaisAdmin");
const EditarContatos = document.getElementById("EditarContatosAdmin");

const ButaoEditarInformacoes = document.getElementById("ButaoEditarInformacoes");
const ButaoEditarContatos = document.getElementById("ButaoEditarContatos");
const ButaoSenha = document.getElementById("ButaoSenha");



ButaoEditarInformacoes.addEventListener("click", () => {
    Senha.style.display = "none";
    EditarInformacoesPessoais.style.display = "block";
    EditarContatos.style.display = "none";
});



ButaoEditarContatos.addEventListener("click", () => {
    Senha.style.display = "none";
    EditarInformacoesPessoais.style.display = "none";
    EditarContatos.style.display = "block";
});



ButaoSenha.addEventListener("click", () => {
    Senha.style.display = "block";
    EditarInformacoesPessoais.style.display = "none";
    EditarContatos.style.display = "none";
});



EditarInformacoesPessoais.style.display = "block";
Senha.style.display = "none";
EditarContatos.style.display = "none";


 // validação de senhas
  const form = document.querySelector("#EditarSenhaAdmin form");
  const novaSenha = form.querySelector("input[name='novaSenha']");
  const confirmarNovaSenha = form.querySelector("input[name='confirmarNovaSenha']");
  const erroDiv = document.getElementById("erroSenhaAdmin");

  form.addEventListener("submit", function(event) {
    if (novaSenha.value !== confirmarNovaSenha.value) {
      erroDiv.textContent = "As senhas não conferem!";
      erroDiv.style.display = "block";
      event.preventDefault();
    } else {
      erroDiv.style.display = "none"; 
    }
  });



