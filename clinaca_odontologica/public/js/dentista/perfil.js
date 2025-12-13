
const Senha = document.getElementById("EditarSenhaDentista");
const EditarInformacoesPessoais = document.getElementById("EditarInformacoesPessoaisDentista");
const EditarContatos = document.getElementById("EditarContatosDentista");

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


