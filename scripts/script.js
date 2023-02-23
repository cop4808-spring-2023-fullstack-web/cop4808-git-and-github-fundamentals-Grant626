let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = roundAccurately(displayValue.substring(0, 9),2);
    }
}
  
updateDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                if(buttons[i].value == 'rand'){
                    //here we consider rand a normal operand but need to input the random math function instead of normal operand value.
                    inputOperand(roundAccurately(Math.random(), 2));
                    //rounding the random value to 2nd place
                    updateDisplay();
                }else{
                    //otherwise if not rand, perform normal operand input as before
                    inputOperand(buttons[i].value);
                    updateDisplay();
                }
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear')) {
                clearDisplay();
                updateDisplay();    
            } else if(buttons[i].classList.contains('factorial')){
                inputFactorial(displayValue);
                updateDisplay();
                //new specific factorial class for new button
            } else if(buttons[i].classList.contains('square')){
                inputSquare(displayValue);
                updateDisplay();
                // new specific square class for new button
            }
        }
    )}
}

clickButton();

function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            //1st click - handles first operand input
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputSquare(num){
    displayValue = (num * num).toString();
}
//new functions to handle squaring the displayValue and returning new displayValue

function inputFactorial(num) {
    displayValue = factorial(num);
}
//new function to handle displaying the factorial of the displayValue, using new custom factorial() function.

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function factorial(n){
    //newly created function to perform factorial calculation
    if(n < 0){
        return 'lmao';
    }
    //if current value is negative, retuns nothing, cant factorial negative numbers.

    if(n == 0 || n == 1){
        return 1;
        //returns 1 for last calculation, used to exit recursive loop
    }else{
        return n * factorial(n-1);
        //loops recursively to multiply the number by itself-1
    }
}