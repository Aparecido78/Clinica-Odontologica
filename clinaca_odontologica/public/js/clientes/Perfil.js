const Senha = document.getElementById("EditarSenhaCliente")
const EditarInformacoesPessoaisCliente = document.getElementById("EditarInformacoesPessoaisCliente")
const EditarContatosCliente = document.getElementById("EditarContatosCliente")

const ButaoEditarInformacoes = document.getElementById("ButaoEditarInformacoes")
const ButaoEditarContatos = document.getElementById("ButaoEditarContatos")
const ButaoSenha = document.getElementById("ButaoSenha")

ButaoEditarInformacoes.addEventListener("click", () => {
    Senha.style.display = "none"
    EditarInformacoesPessoaisCliente.style.display = "block"
    EditarContatosCliente.style.display = "none"
})

ButaoEditarContatos.addEventListener("click", () => {
    Senha.style.display = "none"
    EditarInformacoesPessoaisCliente.style.display = "none"
    EditarContatosCliente.style.display = "block"
})


ButaoSenha.addEventListener("click", () => {
    Senha.style.display = "block"
    EditarInformacoesPessoaisCliente.style.display = "none"
    EditarContatosCliente.style.display = "none"
})



// validação de senhas
const form = document.querySelector("#EditarSenhaCliente form");
const novaSenha = form.querySelector("input[name='novaSenha']");
const confirmarNovaSenha = form.querySelector("input[name='confirmarNovaSenha']");
const erroDiv = document.getElementById("erroSenha");

form.addEventListener("submit", function(event) {
  if (novaSenha.value !== confirmarNovaSenha.value) {
    erroDiv.textContent = "As senhas não conferem!";
    erroDiv.style.display = "block";
    event.preventDefault();
  } else {
    erroDiv.style.display = "none"; 
  }
});
