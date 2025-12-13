
const Senha = document.getElementById("EditarSenhaDentista");
const EditarInformacoesPessoais = document.getElementById("EditarInformacoesPessoaisDentista");
const EditarContatos = document.getElementById("EditarContatosDentista");

const ButaoEditarInformacoes = document.getElementById("ButaoEditarInformacoes");
const ButaoEditarContatos = document.getElementById("ButaoEditarContatos");
const ButaoSenha = document.getElementById("ButaoSenha");


ButaoEditarInformacoes.addEventListener("click", () => {
    EditarSenhaDentista.style.display = "none";
    EditarInformacoesPessoaisDentista.style.display = "block";
    EditarContatosDentista.style.display = "none";
});


ButaoEditarContatos.addEventListener("click", () => {
    EditarSenhaDentista.style.display = "none";
    EditarInformacoesPessoaisDentista.style.display = "none";
    EditarContatosDentista.style.display = "block";
});
 
ButaoSenha.addEventListener("click", () => {
    EditarSenhaDentista.style.display = "block";
    EditarInformacoesPessoaisDentista.style.display = "none";
    EditarContatosDentista.style.display = "none";
});


