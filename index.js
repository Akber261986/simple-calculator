// Select the display and button elements
var display = document.getElementById('display');
var buttons = document.querySelectorAll('.button');
var currentInput = '0';
var operator = null;
var prevousinput = null;
// Function to update the display
var updateDisplay = function (value) {
    display.innerText = value;
};
// Function to handle button clicks
var handleButtonClick = function (event) {
    var button = event.target;
    var value = button.getAttribute('data-value');
    if (!isNaN(Number(value)) || value === '.') {
        // Handle digit or decimal point
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        }
        else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }
    else if (value === '+' || value === '-' || value === '*' || value === '/') {
        // Handle operators
        if (operator && prevousinput !== null) {
            // If there's already an operator, compute the result first
            var result = computeResult();
            updateDisplay(result);
            prevousinput = result;
        }
        else {
            prevousinput = currentInput;
        }
        currentInput = '0';
        operator = value;
    }
    else if (value === '=') {
        if (operator && prevousinput !== null) {
            var result = computeResult();
            updateDisplay(result);
            currentInput = result;
            operator = null;
            prevousinput = null;
        }
    }
};
// Function to Compute Result
var computeResult = function () {
    var num1 = parseFloat(prevousinput);
    var num2 = parseFloat(currentInput);
    var result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = num2;
            break;
    }
    return result.toString();
};
// Attach event listeners to buttons
buttons.forEach(function (button) {
    button.addEventListener('click', handleButtonClick);
});
