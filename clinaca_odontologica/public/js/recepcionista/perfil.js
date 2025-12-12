const informacoesPessoais = document.getElementById("informacoesPessoais");
const contatos = document.getElementById("contatos");
const senha = document.getElementById("senha");

const botaoInformacoes = document.getElementById("botaoInformacoes");
const botaoContatos = document.getElementById("botaoContatos");
const botaoSenha = document.getElementById("botaoSenha");


informacoesPessoais.style.display = "block";
contatos.style.display = "none";
senha.style.display = "none";


botaoInformacoes.addEventListener("click", () => {
    informacoesPessoais.style.display = "block";
    contatos.style.display = "none";
    senha.style.display = "none";
});

botaoContatos.addEventListener("click", () => {
    informacoesPessoais.style.display = "none";
    contatos.style.display = "block";
    senha.style.display = "none";
});

botaoSenha.addEventListener("click", () => {
    informacoesPessoais.style.display = "none";
    contatos.style.display = "none";
    senha.style.display = "block";
});
