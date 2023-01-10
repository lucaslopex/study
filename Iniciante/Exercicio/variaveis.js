let varA = 'A';
let varB = 'B';
let varC = 'C';

/*
vartemp = varA
varA = varB
varB = varC
varC = vartemp
*/

[varA, varB, varC] = [varB, varC, varA]

console.log(varA, varB, varC)