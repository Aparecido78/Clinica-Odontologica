const ButaoAgendaDentista = document.getElementById("ButaoAgendaDentista")
const ButaoRecomendacoes = document.getElementById("ButaoRecomendacoes")

const AgendaDentista = document.getElementById("AgendaDentista")
const Recomendacoes = document.getElementById("Recomendacoes")


ButaoAgendaDentista.addEventListener("click",()=>{
    AgendaDentista.style.display = "block"
    Recomendacoes.style.display = "none"

})

ButaoRecomendacoes.addEventListener("click",()=>{  
    Recomendacoes.style.display = "flex"
    AgendaDentista.style.display = "none"
  
})