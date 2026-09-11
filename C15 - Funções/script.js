console.log("Olá, Luiz! Seja bem-vindo!");
console.log("Olá, Gustavo! Seja bem-vindo!");
console.log("Olá, Cecilia! Seja bem-vinda!");

function darBoasVindas(nome) {
    console.log(`Olá, ${nome}! Seja bem-vindo(a)!`);
}
darBoasVindas("Luiz");
darBoasVindas("Gustavo");
darBoasVindas("Cecilia");

function apresentar (nome, idade) {
    console.log(`meu nome é ${nome} e eu tenho ${idade} anos.`);
}
apresentar("Ryan", 25);

//Criar uma função que recebo o nome de uma pessoa e mostra uma mensagem dizendo se ela está estudando.//

function estaEstudando(nome, estudando) {
    if (estudando) {
        console.log(`${nome} está estudando.`);
    } else {
        console.log(`${nome} não está estudando.`);
    }
}

estaEstudando("Arthur", true);
estaEstudando("Matheus", false);

function somar(a,b) {
    return a + b;
}


somar(5,3)



let resultado = somar(5, 3);

console.log(resultado);


//Crie uma função que pegue dois valores e de a média deles se for acima de 6 é aprovado se não reprovado//

function calcularMedia(valor1, valor2) {
    let media = (valor1 + valor2) / 2;
    return media;
}

calcularMedia(7, 8);
calcularMedia(5, 4);

let mediaFinal = calcularMedia(8, 7);
console.log(`A média final é ${mediaFinal}.`);


function calcularMedia(nota1, nota2) {
    const media = (nota1 + nota2) / 2;

    if (media >= 6) {
        return `A média é ${media}. Aprovado!`;
    } else {
        return `A média é ${media}. Reprovado!`;
    }
}

let nota1 = Number(prompt("Digite a primeira nota:"));
let nota2 = Number(prompt("Digite a segunda nota:"));

let media1 = calcularMedia(nota1, nota2);

console.log(`A média é ${media1}`);

if (media1 >= 6) {
    console.log("Aprovado!");
}

if (media1 < 6) {
    console.log("Reprovado!");
}

calcularMedia(nota1, nota2);




//Crie um programa que utilize uma função com vários parâmetros para calcular o custo total de uma viagem. O programa deverá receber os valores da passagem, hospedagem, alimentação e passeios, calcular o total e informar se a viagem está dentro do orçamento de R$ 2.000,00.//

function calcularCustoViagem(passagem, hospedagem, alimentacao, passeios) {
    const total = passagem + hospedagem + alimentacao + passeios;
    return total;
}

let valorPassagem = Number(prompt("Digite o valor da passagem: "));
let valorHospedagem = Number(prompt("Digite o valor da hospedagem: "));
let valorAlimentacao = Number(prompt("Digite o valor da alimentação: "));
let valorPasseios = Number(prompt("Digite o valor dos passeios: "));

let custoTotal = calcularCustoViagem(valorPassagem, valorHospedagem, valorAlimentacao, valorPasseios);

console.log(`O custo total da viagem é de R$ ${custoTotal.toFixed(2)}.`);

if (custoTotal <= 2000) {
    console.log("A viagem está dentro do orçamento de R$ 2.000,00.");
} else {
    console.log("A viagem está acima do orçamento de R$ 2.000,00.");
}

