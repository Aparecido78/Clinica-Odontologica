
    const senha = document.getElementById("EditarSenhaRecepcionista");
    const info = document.getElementById("EditarInformacoesPessoaisRecepcionista");
    const contatos = document.getElementById("EditarContatosRecepcionista");

    const btnInfo = document.getElementById("ButaoEditarInformacoes");
    const btnContatos = document.getElementById("ButaoEditarContatos");
    const btnSenha = document.getElementById("ButaoSenha");

    btnInfo.addEventListener("click", () => {
        senha.style.display = "none";
        info.style.display = "block";
        contatos.style.display = "none";
    });

    btnContatos.addEventListener("click", () => {
        senha.style.display = "none";
        info.style.display = "none";
        contatos.style.display = "block";
    });

    btnSenha.addEventListener("click", () => {
        senha.style.display = "block";
        info.style.display = "none";
        contatos.style.display = "none";
    });



// Editar Senha
  const formRecepcionista = document.querySelector("#EditarSenhaRecepcionista form");
  const novaSenha = formRecepcionista.querySelector("input[name='novaSenha']");
  const confirmarNovaSenha = formRecepcionista.querySelector("input[name='confirmarNovaSenha']");
  const erroDiv = document.getElementById("erroSenhaRecepcionista");

  formRecepcionista.addEventListener("submit", function(event) {
    if (novaSenha.value !== confirmarNovaSenha.value) {
      erroDiv.textContent = "As senhas não conferem!";
      erroDiv.style.display = "block";
      event.preventDefault();
    } else {
      erroDiv.style.display = "none";
    }
  });
