const descontoForm = document.getElementById('descontoForm');
const resultadoDiv = document.getElementById('resultado');

descontoForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const nomeCliente = document.getElementById('nomeCliente').value.trim();
  const valorCompra = parseFloat(document.getElementById('valorCompra').value);
  const clienteVip = document.getElementById('clienteVip').checked;

  if (nomeCliente === '' || isNaN(valorCompra) || valorCompra < 0) {
    alert('Por favor, informe um nome válido e um valor de compra maior ou igual a zero.');
    return;
  }

  let percentualDesconto = 0;

  if (clienteVip) {
    percentualDesconto = 20;
  } else if (valorCompra >= 500) {
    percentualDesconto = 15;
  } else if (valorCompra >= 200) {
    percentualDesconto = 10;
  }

  const valorDesconto = (valorCompra * percentualDesconto) / 100;
  const valorFinal = valorCompra - valorDesconto;

  let mensagemFrete = 'Frete vai ser normal.';
  if (valorFinal > 1000) {
    mensagemFrete = 'Parabéns! Você ganhou frete grátis bro.';
  }

  let resultadoHtml = '<div class="notification success">';
  resultadoHtml += '<p><strong>Nome:</strong> ' + nomeCliente + '</p>';
  resultadoHtml += '<p><strong>Valor da compra:</strong> R$ ' + valorCompra.toFixed(2) + '</p>';
  resultadoHtml += '<p><strong>Desconto:</strong> ' + percentualDesconto + '%</p>';
  resultadoHtml += '<p><strong>Valor do desconto:</strong> R$ ' + valorDesconto.toFixed(2) + '</p>';
  resultadoHtml += '<p><strong>Valor final:</strong> R$ ' + valorFinal.toFixed(2) + '</p>';
  resultadoHtml += '<p class="mensagem">' + mensagemFrete + '</p>';
  resultadoHtml += '</div>';

  resultadoDiv.innerHTML = resultadoHtml;
});
