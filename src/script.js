let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(nextOperator) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operator || shouldResetDisplay) return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    let result = 0;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

function handlePercent() {
    const val = parseFloat(currentInput);
    if (!isNaN(val)) {
        currentInput = (val / 100).toString();
    }
}

function handleDoubleZero() {
    if (currentInput !== '0' && !shouldResetDisplay) {
        currentInput += '00';
    }
}


buttons.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('btn')) return;

    const action = target.dataset.action;
    const text = target.textContent;

    if (action === 'number') {
        appendNumber(text);
    } else if (action === 'decimal') {
        appendDecimal();
    } else if (action === 'operator') {
        handleOperator(target.dataset.op);
    } else if (action === 'calculate') {
        calculate();
    } else if (action === 'clear') {
        clearAll();
    } else if (action === 'percent') {
        handlePercent();
    } else if (action === 'double-zero') {
        handleDoubleZero();
    }

    updateDisplay();
});