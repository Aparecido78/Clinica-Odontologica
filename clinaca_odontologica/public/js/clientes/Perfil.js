const Senha = document.getElementById("Senha")
const EditarInformacoesPessoaisCliente = document.getElementById("EditarInformacoesPessoaisCliente")
const EditarContatosCliente = document.getElementById("EditarContatosCliente")

const ButaoEditarInformacoes = document.getElementById("ButaoEditarInformacoes")
const ButaoEditarContatos = document.getElementById("ButaoEditarContatos")
const ButaoSenha = document.getElementById("ButaoSenha")





ButaoEditarInformacoes.addEventListener("click",()=>{
    Senha.style.display = "none"
    EditarInformacoesPessoaisCliente.style.display = "block"
    EditarContatosCliente.style.display = "none"

})


ButaoEditarContatos.addEventListener("click",()=>{
    Senha.style.display = "none"
    EditarInformacoesPessoaisCliente.style.display = "none"
    EditarContatosCliente.style.display = "block"

})


ButaoSenha.addEventListener("click",()=>{
    Senha.style.display = "block"
    EditarContatosCliente.style.display = "none"
    EditarContatosCliente.style.display = "none"

})
