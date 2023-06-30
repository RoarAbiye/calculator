const numButtons = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let currentOperand = "";
let previousOperand = "";
let OPERATOR = "";
let calculatorReset = false;

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
  deleteOneChar();
});

equalButton.addEventListener("click", () => {
  if (previousOperand === "" || currentOperand === "") return;
  if (calculatorReset) {
    return
  }
  calculatorReset = true;
  calculate();
  OPERATOR = "";
  updateDisplay();
});



//clear function
function clear() {
  currentOperand = "";
  previousOperand = "";
  OPERATOR = "";
  updateDisplay();
}

//delete funciton
function deleteOneChar() {
  if (currentOperand === "") {
    if (OPERATOR !== "") {
      OPERATOR = "";
    } else if (previousOperand !== "") {
      currentOperand = previousOperand
      previousOperand = ""
    }
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

//change OPERATOR function
function changeOperator(operator) {
  if (calculatorReset) {
    calculatorReset = false
  }
  if (currentOperand === "" && previousOperand === "") return;
  if (currentOperand === "") {
    OPERATOR = operator;
  } else {
    if (previousOperand === "") {
      previousOperand = currentOperand;
      OPERATOR = operator;
      currentOperand = "";
    } else {
      calculate();
      OPERATOR = operator;
    }
  }
  updateDisplay();
}

// add number
function appendOperand(operand) {
  if (calculatorReset) {
    calculatorReset = false
    clear()
    currentOperand += operand;
  } else   if (currentOperand.includes(".") && operand === ".") {
    return;
  } else if (currentOperand === "0") {
      if (operand === "0"){
        return
      } else if (operand === ".") {
          currentOperand = currentOperand + operand
      }
      else {
        currentOperand = operand
      } 
  } else {
    if(previousOperand === "" && OPERATOR !== "") {
      previousOperand = currentOperand
      currentOperand = operand
    } else {
      currentOperand += operand;
    }
  }
  updateDisplay();
}

function calculate() {
  let result;
  switch (OPERATOR) {
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
      if (currentOperand === "0") {
        alert("I don't really know how to divide by zero... it must be some kind of magic")
        return;
      } else {
        result = parseFloat(currentOperand) / parseFloat(previousOperand);
      }
      break;
  }
  currentOperand = result.toString();
  previousOperand = "";
}

//Updates display
function updateDisplay() {
  document.querySelector("#previousOperand").textContent = previousOperand;
  document.querySelector("#currentOperand").textContent = currentOperand;
  document.querySelector("#operator").textContent = OPERATOR;
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
