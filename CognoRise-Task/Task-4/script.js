document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = '';
    let firstOperand = null;
    let awaitingNextOperand = false;
  
    function updateDisplay() {
      display.textContent = currentInput;
    }
  
    function resetCalculator() {
      currentInput = '0';
      operator = '';
      firstOperand = null;
      awaitingNextOperand = false;
      updateDisplay();
    }
  
    function handleOperator(nextOperator) {
      const inputValue = parseFloat(currentInput);
      if (firstOperand === null) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        firstOperand = result;
      }
      operator = nextOperator;
      awaitingNextOperand = true;
    }
  
    function performCalculation() {
      const inputValue = parseFloat(currentInput);
      switch (operator) {
        case '+':
          return firstOperand + inputValue;
        case '-':
          return firstOperand - inputValue;
        case '*':
          return firstOperand * inputValue;
        case '/':
          return firstOperand / inputValue;
        default:
          return inputValue;
      }
    }
  
    function inputDigit(digit) {
      if (awaitingNextOperand) {
        currentInput = '';
        awaitingNextOperand = false;
      }
      currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
  
    function inputDecimal() {
      if (!currentInput.includes('.')) {
        currentInput += '.';
      }
    }
  
    document.querySelectorAll('.calculator button').forEach(button => {
      button.addEventListener('click', () => {
        const { value } = button;
        if (isNaN(parseInt(value))) {
          // Operator button
          if (value === 'AC') {
            resetCalculator();
          } else if (value === '=') {
            if (operator && !awaitingNextOperand) {
              const result = performCalculation();
              currentInput = String(result);
              firstOperand = result;
              operator = '';
            }
          } else {
            handleOperator(value);
          }
        } else {
          // Digit button
          inputDigit(value);
        }
        updateDisplay();
      });
    });
  
    updateDisplay();
  });
  