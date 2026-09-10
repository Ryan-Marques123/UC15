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

function estaEstudando(nome, estudando) {
    if (estudando) {
        console.log(`${nome} está estudando.`);
    } else {
        console.log(`${nome} não está estudando.`);
    }
}

estaEstudando("Ana", true);
estaEstudando("Pedro", false);
