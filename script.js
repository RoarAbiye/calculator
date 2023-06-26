const previousOperand_disp = document.querySelector("#previousOperand");
const currentOperand_disp = document.querySelector("#currentOperand");
const numButtons = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton  = document.querySelector(".clear");
const deleteButton  = document.querySelector(".delete");


let currentOperand = "";
let previousOperand = "";
let operator = "";
let calculatorRestartRequired = false;

const operators = ["+", "-", "/", "*"];

numButtons.forEach((button) =>{
  button.onclick = appendOperand(button.value)
})

operatorButton.forEach((button) =>{
  button.onclick = changeOperator(button.value)
})
function eventHandler(payload) {
  if (calculatorRestartRequired) {
    if (payload === "=") return;
    if (!isNaN(parseFloat(payload)) || payload === ".") {
      currentOperand = payload;
      operator = "";
    } else {
      if (operators.includes(payload)) {
        previousOperand = currentOperand;
        currentOperand = "";
        operator   = payload;
      }
    }
    calculatorRestartRequired = false;
    updateDisplay();
    return;
  }

  if (payload === "=") {
    if (currentOperand === "" || previousOperand === "") {
      return;
    } else {
      calculate();
      return;
    }
  }

  if (payload === "clear") {
    if (currentOperand === "") {
      if (previousOperand === "") {
        return;
      } else if (operator !== "") {
        currentOperand = previousOperand;
        previousOperand = "";
        operator = "";
      }
    } else {
      currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
    return;
  }

  if (payload === "all_clear") {
    currentOperand = "";
    previousOperand = "";
    operator = "";
    updateDisplay();
    return;
  }

  if (operators.includes(payload)) {
    if (
      currentOperand !== "" &&
      previousOperand !== "" &&
      operators.includes(payload)
    ) {
      calculate();
      operator = payload;
      return;
    }

    if (currentOperand === "") {
      if (previousOperand.slice(-1) === payload) {
        return;
      } else if (operators.includes(previousOperand.slice(-1))) {
        previousOperand = previousOperand.replace(/.$/, payload);
        operator = payload;
      }
    } else {
      previousOperand = currentOperand;
      operator = payload;
      currentOperand = "";
    }
   } else {
      currentOperand = currentOperand + payload;
    }
  }

  updateDisplay();
}

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
  calculatorRestartRequired = true;
  previousOperand = "";
  operator = "";
  updateDisplay();
}

function updateDisplay() {
  currentOperand_disp.textContent = operator + currentOperand;
  previousOperand_disp.textContent = previousOperand;
}

//append number function
function appendOperand(params) {
  if (currentOperand.includes(".") && params === ".") {
    return;
  } else if (params === "0" && currentOperand === 0) {
    return;
  } else  {
    currentOperand+= params;
  }
 }

//clear function
function clear() {
  currentOperand = "";
  previousOperand= "";
  operator = "";
  updateDisplay()
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
}

//change operator function
function changeOperator(params) {
  if (currentOperand === "" && previousOperand === "") return;
  if (currentOperand === "") {
    operator = params;
  } else {
    if (previousOperand === "") {
      previousOperand = currentOperand;
      operator = params;
      currentOperand = "";
    } else {
      calclate();
      operator = params;
    }
  }
  updateDisplay()
}

function calclate() {
  let result = "";
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
}

document.body.addEventListener("keypress", (key) => {
  key.preventDefault();

  if (
    !isNaN(parseFloat(key.key)) ||
    operators.includes(key.key) ||
    key.key === "."
  ) {
    eventHandler(key.key);
  } else if (
    operators.includes(key.key) ||
    key.key === "Enter" ||
    key.key === "="
  ) {
    calculate();
  }
});
