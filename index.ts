// Select the display and button elements
const display = document.getElementById('display') as HTMLDivElement;
const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>;

let currentInput = '0';
let operator:string | null = null;
let prevousinput: string | null = null;


// Function to update the display
const updateDisplay = (value: string)=>{
    display.innerText = value;
}

// Function to handle button clicks

const handleButtonClick = (event:Event)=> {
    const button = event.target as HTMLButtonElement;
    const value = button.getAttribute('data-value')!;

    if (!isNaN(Number(value)) || value === '.'){
        // Handle digit or decimal point
        if (currentInput === '0' && value !== '.'){
            currentInput = value;
        }
        else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }
    else if (value === '+' || value === '-' || value === '*' || value === '/'){
        // Handle operators
        if (operator && prevousinput !== null){
            // If there's already an operator, compute the result first
            const result = computeResult();
            updateDisplay(result);
            prevousinput = result;
        }
        else {
            prevousinput = currentInput;
        }
        currentInput = '0';
        operator = value;
    }
    else if (value === '='){
        if (operator && prevousinput !== null){
            const result = computeResult();
            updateDisplay(result);
            currentInput = result;
            operator = null;
            prevousinput = null;
        }
    }
    
};

// Function to Compute Result

let computeResult = ():string=>{
        const num1 = parseFloat(prevousinput!);
        const num2 = parseFloat(currentInput);
        let result: number;


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
                result = num2
                break;
        }
        return result.toString();
}

// Attach event listeners to buttons

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick)    
});