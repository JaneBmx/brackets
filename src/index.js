module.exports = function check(str, bracketsConfig) {
  open = bracketsConfig.map(e => e[0]);
  close = bracketsConfig.map(e => e[1]);
  return checkExpression(str.split(''), open, close);
}

function checkExpression(exp, open, close) {
  if (exp.length % 2 !== 0) return false;
  let closeBracket = close[open.findIndex(curr => curr === exp[0])];
  if (exp.length === 2) return exp[1] === closeBracket;

  let index = 1;
  let subExp = [];
  let count = 0;

  while (count >= 0 && index < exp.length) {
      if (exp[index] === closeBracket && count === 0) {
          index++;
          break;
      }
      subExp.push(exp[index])
      if (exp[index] === exp[0] && exp[0] !== closeBracket) count++;
      if (exp[index] === closeBracket) count--;
      index++;
  }
  return (subExp.length === 0 || checkExpression(subExp, open, close)) && (index === exp.length || checkExpression(exp.slice(index), open, close));
}