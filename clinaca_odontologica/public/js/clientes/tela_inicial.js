

const butao_agendamento = document.getElementById("butao_agendamento")
const butao_servicos = document.getElementById("butao_servicos")
const butao_fichaClinica = document.getElementById("butao_fichaClinica")
const butao_recomendacoes = document.getElementById("butao_recomendacoes")


const recomendacoes = document.getElementById("recomendacoes")
const fichaClinica = document.getElementById("fichaClinica")
const agendamentos = document.getElementById("agendamentos")
const servicos = document.getElementById("servicos")



butao_agendamento.addEventListener("click",()=>{
    agendamentos.style.display = "block"
    recomendacoes.style.display = "none"
    fichaClinica.style.display = "none"
    servicos.style.display = "none"

})


butao_servicos.addEventListener("click",()=>{
    agendamentos.style.display = "none"
    recomendacoes.style.display = "none"
    fichaClinica.style.display = "none"
    servicos.style.display = "block"

})


butao_fichaClinica.addEventListener("click",()=>{
    agendamentos.style.display = "none"
    recomendacoes.style.display = "none"
    fichaClinica.style.display = "block"
    servicos.style.display = "none"

})


butao_recomendacoes.addEventListener("click",()=>{
    agendamentos.style.display = "none"
    recomendacoes.style.display = "block"
    fichaClinica.style.display = "none"
    servicos.style.display = "none"

})





