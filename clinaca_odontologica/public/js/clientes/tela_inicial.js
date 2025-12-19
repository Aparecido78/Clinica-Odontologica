

const butao_agendamento = document.getElementById("butao_agendamento")
const butao_servicos = document.getElementById("butao_servicos")
const butao_fichaClinica = document.getElementById("butao_fichaClinica")
const butao_recomendacoes = document.getElementById("butao_recomendacoes")


const recomendacoes = document.getElementById("recomendacoes")
const fichaClinica = document.getElementById("fichaClinica")
const agendamentos = document.getElementById("agendamentos")
const servicos = document.getElementById("servicos")

// Função auxiliar para esconder todas as seções
function esconderTodas() {
  if (agendamentos) agendamentos.style.display = "none"
  if (recomendacoes) recomendacoes.style.display = "none"
  if (fichaClinica) fichaClinica.style.display = "none"
  if (servicos) servicos.style.display = "none"
}

// Estado inicial: mostrar serviços, esconder o resto
esconderTodas()
if (servicos) servicos.style.display = "block"

if (butao_agendamento) {
  butao_agendamento.addEventListener("click", () => {
    esconderTodas()
    if (agendamentos) agendamentos.style.display = "block"
  })
}

if (butao_servicos) {
  butao_servicos.addEventListener("click", () => {
    esconderTodas()
    if (servicos) servicos.style.display = "block"
  })
}

if (butao_fichaClinica) {
  butao_fichaClinica.addEventListener("click", () => {
    esconderTodas()
    if (fichaClinica) fichaClinica.style.display = "block"
  })
}

if (butao_recomendacoes) {
  butao_recomendacoes.addEventListener("click", () => {
    esconderTodas()
    if (recomendacoes) recomendacoes.style.display = "block"
  })
}




// validação de formulario
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

// ficha clinica

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form[action='/SalvarFichaClinica']");

  // Seleciona TODOS inputs e textareas, exceto os checkboxes
  const fields = form.querySelectorAll(
    "input:not([type='checkbox']), textarea"
  );

  function clearErrors() {
    fields.forEach(field => {
      field.classList.remove("input-error");

      const error = field.parentNode.querySelector(".error-message");
      if (error) error.remove();
    });
  }

  function showError(field) {
    field.classList.add("input-error");

    if (!field.parentNode.querySelector(".error-message")) {
      const div = document.createElement("div");
      div.classList.add("error-message");
      div.innerText = "Campo obrigatório ou inválido.";
      field.parentNode.appendChild(div);
    }
  }

  form.addEventListener("submit", function (event) {

    let valid = true;
    clearErrors();

    fields.forEach(field => {
      const value = field.value.trim();

      if (!value) {
        showError(field);
        valid = false;
      }
    });

    if (!valid) {
      event.preventDefault();
    }

  });

});

