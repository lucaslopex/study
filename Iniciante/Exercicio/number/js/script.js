const NumeroDigitado = Number(prompt('Digite um número:')); 
const numero = document.getElementById('numero');

const adicao = document.getElementById('adicao');
const raiz = document.getElementById('raiz');
const inteiro = document.getElementById('inteiro');
const nan = document.getElementById('nan');
const downNumber = document.getElementById('downNumber');
const upNumber = document.getElementById('upNumber');
const twoDec = document.getElementById('twoDec');

numero.innerHTML = NumeroDigitado
adicao.innerHTML = `<p>O número adicionado a 2 é:  <b id = resultado>${NumeroDigitado + 2}  </b> </p>`
raiz.innerHTML = `<p>A raiz quadrado do numero é:  <b id = resultado>${Math.sqrt(NumeroDigitado + 2)}  </b> </p>`
inteiro.innerHTML = `<p>O número ${NumeroDigitado} é inteiro? <b> ${Number.isInteger(NumeroDigitado)} </b> </p>`
nan.innerHTML = `<p>O número ${NumeroDigitado} é NaN? <b> ${isNaN(NumeroDigitado)} </b> </p>`
downNumber.innerHTML = `<p>O número ${NumeroDigitado} arredondado para baixo: <b> ${Math.floor(NumeroDigitado)} </b> </p>`
upNumber.innerHTML = `<p>O número ${NumeroDigitado} arredondado para cima: <b> ${Math.ceil(NumeroDigitado)} </b> </p>`
twoDec.innerHTML = `<p>O número ${NumeroDigitado} arredondado duas casas decimais: <b> ${NumeroDigitado.toFixed(2)} </b> </p>`
