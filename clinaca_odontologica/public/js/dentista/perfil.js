
const Senha = document.getElementById("Senha");
const EditarInformacoesPessoais = document.getElementById("EditarInformacoesPessoaisCliente");
const EditarContatos = document.getElementById("EditarContatosCliente");

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


