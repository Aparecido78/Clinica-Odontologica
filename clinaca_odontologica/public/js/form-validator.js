document.addEventListener('DOMContentLoaded', function () {
  const forms = Array.from(document.querySelectorAll('form'))

  forms.forEach(form => {
    // só aplica automaticamente se form tiver a classe needs-validation ou tiver inputs
    if (!form.classList.contains('needs-validation') && form.querySelectorAll('input,textarea,select').length === 0) return

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
      }
    }, false)

    // limpar estado ao digitar
    const controls = Array.from(form.querySelectorAll('input, textarea, select'))
    controls.forEach(ctrl => {
      ctrl.addEventListener('input', () => {
        if (ctrl.checkValidity()) {
          ctrl.classList.remove('is-invalid')
        }
      })
      // marcar invalid quando blur e inválido
      ctrl.addEventListener('blur', () => {
        if (!ctrl.checkValidity()) {
          ctrl.classList.add('is-invalid')
        } else {
          ctrl.classList.remove('is-invalid')
        }
      })
    })
  })
})
