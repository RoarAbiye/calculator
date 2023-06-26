const numButtons = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let currentOperand = "";
let previousOperand = "";
let operator = "";
let calculatorReset = false

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendOperand(button.value);
  });
});

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    changeOperator(button.value);
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

deleteButton.addEventListener("click", () => {
  backspace();
});

equalButton.addEventListener("click", () => {
  if (previousOperand === "" || currentOperand === "") return;
  calculate();
});

function calculate() {
  if (previousOperand === "" || currentOperand === "") return;

  let localOprand1 = parseFloat(currentOperand);
  let localOprand2 = parseFloat(previousOperand);

  switch (operator) {
    case "+":
      currentOperand = localOprand1 + localOprand2;
      break;
    case "-":
      currentOperand = localOprand1 - localOprand2;
      break;
    case "/":
      currentOperand = localOprand1 / localOprand2;
      break;
    case "*":
      currentOperand = localOprand1 * localOprand2;
      break;
    default:
      break;
  }
  calculatorReset = true;
  previousOperand = "";
  operator = "";
  updateDisplay();
}

//clear function
function clear() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  updateDisplay();
}

//delete funciton

function backspace() {
  if (currentOperand === "") {
    return;
  } else if (operator !== "") {
    operator = "";
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

//change operator function
function changeOperator(_operator) {
  if (currentOperand === "" && previousOperand === "") return;
  if (currentOperand === "") {
    operator = _operator;
  } else {
    if (previousOperand === "") {
      previousOperand = currentOperand;
      operator = _operator;
      currentOperand = "";
    } else {
      calclate();
      operator = _operator;
    }
  }
  updateDisplay();
}

// add number
function appendOperand(operand) {
  if (currentOperand.includes(".") && operand === ".") {
    return;
  } else if (operand === "0" && currentOperand === 0) {
    return;
  } else if (calculatorReset) {
    operator = ""
    currentOperand += operand;
  } else {
    currentOperand += operand;
  }
  updateDisplay();
}

function calclate() {
  let result;
  switch (operator) {
    case "+":
      result = parseFloat(currentOperand) + parseFloat(previousOperand);
      break;
    case "-":
      result = parseFloat(currentOperand) - parseFloat(previousOperand);
      break;
    case "*":
      result = parseFloat(currentOperand) * parseFloat(previousOperand);
      break;
    case "/":
      result = parseFloat(currentOperand) / parseFloat(previousOperand);
      break;
  }
  currentOperand = result.toFixed(2);
  previousOperand = "";
  operator = "";
}

//Updates display
function updateDisplay() {
  document.querySelector("#previousOperand").textContent = previousOperand;

  document.querySelector("#currentOperand").textContent = currentOperand;

  document.querySelector("#operator").textContent = operator;
}

// document.body.addEventListener("keypress", (key) => {
//   key.preventDefault();
//
//   if (
//     !isNaN(parseFloat(key.key)) ||
//     operators.includes(key.key) ||
//     key.key === "."
//   ) {
//     eventHandler(key.key);
//   } else if (
//     operators.includes(key.key) ||
//     key.key === "Enter" ||
//     key.key === "="
//   ) {
//     calculate();
//   }
// });
