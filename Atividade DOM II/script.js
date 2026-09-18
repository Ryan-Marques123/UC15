const cidadeInput = document.getElementById("cidade");
const mensagem = document.getElementById("mensagem");
const contadorElemento = document.getElementById("valorContador");

let contador = 10;

function mostrarCidade() {
  const cidade = cidadeInput.value.trim();

  if (!cidade) {
    mensagem.textContent = "Digite uma cidade antes de continuar!";
    return;
  }

  mensagem.textContent = `Você escolheu conhecer ${cidade}! 🌴`;
}

function destacarMensagem() {
  mensagem.style.color = "blue";
  mensagem.style.fontSize = "18px";
  mensagem.style.fontWeight = "bold";
}

function aumentarContador() {
  contador += 1;
  contadorElemento.textContent = contador;
}

function diminuirContador() {
  contador -= 1;
  contadorElemento.textContent = contador;
}
