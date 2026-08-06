let nota1 = parseFloat(prompt('Digite a primeira nota:'));
let nota2 = parseFloat(prompt('Digite a segunda nota:'));
let media = (nota1 + nota2) / 2;
let situacao;

if (Number.isNaN(nota1) || Number.isNaN(nota2)) {
    alert('Por favor, digite duas notas válidas entre 0 e 10.');
} else {
    if (media < 4) {
        situacao = 'REPROVADO';
    } else if (media >= 5 && media <= 6) {
        situacao = 'RECUPERAÇÃO';
    } else if (media >= 7) {
        situacao = 'APROVADO';
    } else {
        situacao = 'Situação indefinida';
    }

    alert(`Média: ${media.toFixed(1)} - ${situacao}`);
}
