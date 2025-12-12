const AgendaDentista = document.getElementById("AgendaDentista")
const Recomendacoes = document.getElementById("Recomendacoes")

const ButaoAgendaDentista = document.getElementById("ButaoAgendaDentista")
const ButaoRecomendacoes = document.getElementById("ButaoRecomendacoes")



ButaoAgendaDentista.addEventListener("click",()=>{
    AgendaDentista.style.display = "block"
    Recomendacoes.style.display = "none"
    
})

ButaoRecomendacoes.addEventListener("click",()=>{
    AgendaDentista.style.display = "none"
    Recomendacoes.style.display = "block"

})
