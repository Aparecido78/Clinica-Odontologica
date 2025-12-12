const cadastrarCliente = document.getElementById("cadastrarCliente")
const Agendamento = document.getElementById("Agendamento")

const ButaoAgendamento = document.getElementById("ButaoAgendamento")
const ButaoCadastrarCliente = document.getElementById("ButaoCadastrarCliente")


ButaoAgendamento.addEventListener("click",()=>{
    Agendamento.style.display = "block"
    cadastrarCliente.style.display = "none"

})


ButaoCadastrarCliente.addEventListener("click",()=>{
    Agendamento.style.display = "none"
    cadastrarCliente.style.display = "block"

})