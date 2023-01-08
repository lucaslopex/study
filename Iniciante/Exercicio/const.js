const nome = 'Lucas';
const sobrenome = 'Lopes Silva';
const idade = 26;
const kg = 95;
const alturaM = 1.69;
let imc = kg / (alturaM * alturaM);
let anoNascimento;
const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
let anos;

anoNascimento = anoAtual - idade;

console.log(`${nome} ${sobrenome} pesa: ${kg}`)
console.log()
console.log('Idade: ', idade)
console.log('Nasceu em: ', anoNascimento)
console.log('IMC é de: ', imc)