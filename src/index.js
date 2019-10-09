function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let mathArr = expr.split('');
    let regexTwoDigit = RegExp(/\d{2}/);
    let regexThreeDigit = RegExp(/\d{3}/);
    let result = 0;
    let openBracketIndex = 0;
    let closeBracketIndex = 0; 
    let errorZeroDivision = {failure: 'TypeError: Division by zero.'};
    let errorNotPairedBrackets = {failure: "ExpressionError: Brackets must be paired"};
    let openBracket = '(';
    let closeBracket = ')';
    let bracketsArray = [];

    for(let i = 0; i < mathArr.length; i++){ // delete additional spaces = compress string
        if(mathArr[i] == '' || mathArr[i] == ' '){
            mathArr.splice(i , 1);
            i--;
        }
    }

    for(let j = 0; j < mathArr.length; j++){ // compress digit 
        let testTwoDigit   = regexTwoDigit.test(`${mathArr[j]}${mathArr[j+1]}`);
        let testThreeDigit = regexThreeDigit.test(`${mathArr[j]}${mathArr[j+1]}${mathArr[j+2]}`);
        if(testThreeDigit == true){
            mathArr[j] = `${mathArr[j]}${mathArr[j+1]}${mathArr[j+2]}`;
            mathArr.splice(j+1, 2);
        }else if(testTwoDigit == true){
            mathArr[j] = `${mathArr[j]}${mathArr[j+1]}`;
            mathArr.splice(j+1, 1);
        }
    }

    for(let b = 0; b < mathArr.length; b++){ // check brackets pairing
        if(mathArr[b] == openBracket) {
           bracketsArray.push(mathArr[b]);
        }
        if(mathArr[b] == closeBracket){
           if(!bracketsArray.length){ throw new Error(errorNotPairedBrackets.failure); }
           bracketsArray.pop();
        }
    }
    if(bracketsArray.length){ throw new Error(errorNotPairedBrackets.failure); }
    
    // Brackets Processing 
    for(let r = 0 ; r < mathArr.length; r++ ){
        if(mathArr[r] == openBracket ){
            bracketsArray.push(mathArr[r]);
            openBracketIndex = r;
        }
        if(mathArr[r] == closeBracket){
           closeBracketIndex = r;
           bracketsArray.pop();
           
           for (let m = openBracketIndex + 1; m < closeBracketIndex; m++) { // division and multiplication processing
            if(mathArr[m] == '/'){
              if(mathArr[m + 1] == 0 ){
                  throw new Error(errorZeroDivision.failure);
              }
              let divisionResult = parseFloat(mathArr[m - 1]) / parseFloat(mathArr[m + 1]);
              mathArr[m-1] = divisionResult;
              mathArr.splice(m, 2);
              m = m - 2;
              closeBracketIndex = closeBracketIndex - 2;
            } else if(mathArr[m] == '*') {
              let multiplyResult = parseFloat(mathArr[m - 1]) * parseFloat(mathArr[m + 1]);
              mathArr[m - 1] = multiplyResult;
              mathArr.splice(m, 2);
              m = m - 2;
              closeBracketIndex = closeBracketIndex - 2;
            }
           }

           for( let s = openBracketIndex + 1; s < closeBracketIndex; s++ ){ // subtraction and addition processing
            if(mathArr[s] == '+'){ 
                let sumResult = parseFloat(mathArr[s - 1]) + parseFloat(mathArr[s + 1]);
                mathArr[s-1] = sumResult;
                mathArr.splice(s, 2);
                s = s - 2;
                closeBracketIndex = closeBracketIndex - 2;
            } else if(mathArr[s] == '-') {
                let subtractionResult = parseFloat(mathArr[s - 1]) - parseFloat(mathArr[s + 1]);
                mathArr[s-1] = subtractionResult;
                mathArr.splice(s, 2);
                s = s - 2;
                closeBracketIndex = closeBracketIndex - 2;
            }
           }
           mathArr.splice(openBracketIndex, 1);
           mathArr.splice(closeBracketIndex - 1, 1);
           r = -1;
        }
    }

    // After brackets processing 
    for (let m = 0; m < mathArr.length; m++) { // division and multiplication processing
        if(mathArr[m] == '/'){
          if(mathArr[m + 1] == 0 ){
              throw new Error(errorZeroDivision.failure);
          }
          let divisionResult = parseFloat(mathArr[m - 1]) / parseFloat(mathArr[m + 1]);
          mathArr[m-1] = divisionResult;
          mathArr.splice(m, 2);
          m = m - 2;
        } else if(mathArr[m] == '*') {
          let multiplyResult = parseFloat(mathArr[m - 1]) * parseFloat(mathArr[m + 1]);
          mathArr[m - 1] = multiplyResult;
          mathArr.splice(m, 2);
          m = m - 2;
        }
    }
    for (let s = 0; s < mathArr.length; s++) { // subtraction and addition processing
        if(mathArr[s] == '+'){
            let sumResult = parseFloat(mathArr[s - 1]) + parseFloat(mathArr[s + 1]);
            mathArr[s-1] = sumResult;
            mathArr.splice(s, 2);
            s = s - 2;
          } else if(mathArr[s] == '-') {
            let subtractionResult = parseFloat(mathArr[s - 1]) - parseFloat(mathArr[s + 1]);
            mathArr[s-1] = subtractionResult;
            mathArr.splice(s, 2);
            s = s - 2;
          } 
    }
    result = parseFloat(mathArr[0]);
    return result;
}

module.exports = {
    expressionCalculator
}