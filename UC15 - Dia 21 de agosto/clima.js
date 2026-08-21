
const elTemperatura = document.getElementById('temperatura')
const elMensagem = document.getElementById('mensagem')
const btn = document.getElementById('verificar')

function verificarClima(){
	const entrada = prompt('Informe a temperatura em °C:')

	if (entrada === null) {
		elTemperatura.textContent = ''
		elMensagem.textContent = 'Operação cancelada pelo usuário.'
		console.log('Prompt cancelado pelo usuário.')
		return
	}

	const temperatura = Number(entrada.replace(',','.'))

	if (Number.isNaN(temperatura)){
		elTemperatura.textContent = ''
		elMensagem.textContent = 'Valor inválido. Informe um número.'
		console.log('Entrada inválida:', entrada)
		return
	}

	let classificacao = ''
	if (temperatura > 35) {
		classificacao = 'tá MUITO quente, melhor ir pro ar condicionado mano. 🔥 🌬️'
	} else if (temperatura > 25) {
		classificacao = 'Está quente cara! 🫠'
	} else if (temperatura >= 15) {
		classificacao = 'O clima tá bom! 😁👌'
	} else {
		classificacao = 'Está frio bro! 🥶☃️'
	}

	elTemperatura.textContent = `Temperatura informada: ${temperatura}°C`
	elMensagem.textContent = classificacao

	console.log('Temperatura:', temperatura)
	console.log('Classificação:', classificacao)
}

btn.addEventListener('click', verificarClima)

