const Senha = document.getElementById("EditarSenhaDentista");
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


const formDentista = document.querySelector("#EditarSenhaDentista form");
const erroDivDentista = document.getElementById("erroSenhaDentista");

formDentista.addEventListener("submit", function(event) {
    const novaSenha = formDentista.novaSenha.value;
    const confirmarNovaSenha = formDentista.confirmarNovaSenha.value;

    if (novaSenha !== confirmarNovaSenha) {
        erroDivDentista.textContent = "A nova senha e a confirmação não conferem!";
        erroDivDentista.style.display = "block";
        event.preventDefault(); 
    } else {
        erroDivDentista.style.display = "none"; 
    }
});


