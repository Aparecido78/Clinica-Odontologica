const Senha = document.getElementById("Senha");
const EditarInformacoesPessoais = document.getElementById("EditarInformacoesPessoaisDentista");
const EditarContatos = document.getElementById("EditarContatosDentista");

const ButaoEditarInformacoes = document.getElementById("ButaoEditarInformacoes");
const ButaoEditarContatos = document.getElementById("ButaoEditarContatos");
const ButaoSenha = document.getElementById("ButaoSenha");

ButaoEditarInformacoes.addEventListener("click", () => {
    EditarInformacoesPessoais.style.display = "block";
    Senha.style.display = "none";
    EditarContatos.style.display = "none";
});

ButaoEditarContatos.addEventListener("click", () => {
    EditarContatos.style.display = "block";
    Senha.style.display = "none";
    EditarInformacoesPessoais.style.display = "none";
});

ButaoSenha.addEventListener("click", () => {
    Senha.style.display = "block";
    EditarInformacoesPessoais.style.display = "none";
    EditarContatos.style.display = "none";
});


EditarInformacoesPessoais.style.display = "block";
Senha.style.display = "none";
EditarContatos.style.display = "none";
