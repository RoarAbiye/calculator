const numButtons = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const flipSign = document.querySelector(".sign");

let CURRENT_OPERAND = "";
let PREVIOUS_OPERAND = "";
let OPERATOR = "";
let CALCULATOR_RESET = false;

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

flipSign.addEventListener('click', ()=>{
  if (CURRENT_OPERAND === ".") {
    return
  }
  CURRENT_OPERAND = (parseFloat(CURRENT_OPERAND) * -1).toString();
  updateDisplay();
})
clearButton.addEventListener("click", () => {
  clear();
});

deleteButton.addEventListener("click", () => {
  deleteOneChar();
});

equalButton.addEventListener("click", () => {
  if (PREVIOUS_OPERAND === "" || CURRENT_OPERAND === "") return;
  if (CALCULATOR_RESET) {
    return
  }
  CALCULATOR_RESET = true;
  calculate();
  OPERATOR = "";
  updateDisplay();
});



//clear function
function clear() {
  CURRENT_OPERAND = "";
  PREVIOUS_OPERAND = "";
  OPERATOR = "";
  updateDisplay();
}

//delete funciton
function deleteOneChar() {
  if (CURRENT_OPERAND === "") {
    if (OPERATOR !== "") {
      OPERATOR = "";
    } else if (PREVIOUS_OPERAND !== "") {
      CURRENT_OPERAND = PREVIOUS_OPERAND
      PREVIOUS_OPERAND = ""
    }
  } else {
    CURRENT_OPERAND = CURRENT_OPERAND.slice(0, -1);
  }
  updateDisplay();
}

//change OPERATOR function
function changeOperator(operator) {
  if (CALCULATOR_RESET) {
    CALCULATOR_RESET = false
  }
  if (CURRENT_OPERAND === "" && PREVIOUS_OPERAND === "") return;
  if (CURRENT_OPERAND === "") {
    OPERATOR = operator;
  } else {
    if (PREVIOUS_OPERAND === "") {
      PREVIOUS_OPERAND = CURRENT_OPERAND;
      OPERATOR = operator;
      CURRENT_OPERAND = "";
    } else {
      calculate();
      OPERATOR = operator;
    }
  }
  updateDisplay();
}

// add number
function appendOperand(operand) {
  if (CALCULATOR_RESET) {
    CALCULATOR_RESET = false
    clear()
    CURRENT_OPERAND += operand;
  } else if (CURRENT_OPERAND.includes(".") && operand === ".") {
    return;
  } else if (CURRENT_OPERAND === "0") {
    if (operand === "0") {
      return
    } else if (operand === ".") {
      CURRENT_OPERAND = CURRENT_OPERAND + operand
    }
    else {
      CURRENT_OPERAND = operand
    }
  } else {
    if (PREVIOUS_OPERAND === "" && OPERATOR !== "") {
      PREVIOUS_OPERAND = CURRENT_OPERAND
      CURRENT_OPERAND = operand
    } else {
      CURRENT_OPERAND += operand;
    }
  }
  updateDisplay();
}

function calculate() {
  let result;
  switch (OPERATOR) {
    case "+":
      result = parseFloat(PREVIOUS_OPERAND) + parseFloat(CURRENT_OPERAND);
      break;
    case "-":
      result = parseFloat(PREVIOUS_OPERAND) - parseFloat(CURRENT_OPERAND);
      break;
    case "*":
      result = parseFloat(PREVIOUS_OPERAND) * parseFloat(CURRENT_OPERAND);
      break;
    case "/":
      if (CURRENT_OPERAND === "0") {
        alert(
`Why did the mathematician get fired from his job? 
He kept trying to divide by zero.
When his boss asked him why he kept doing it, he said, "I just can't resist the temptation."
His boss replied, "Well, you're tempting fate. If you keep dividing by zero, you're going to end up in a world of pain."
The mathematician just shrugged and said, "I'm willing to take that risk."
And so, he continued to divide by zero, until one day, he finally got his comeuppance. 
He was working on a complex equation, and when he tried to divide by zero, the universe imploded.
The mathematician was never seen again.
The moral of the story is, don't divide by zero. It's not worth it.`
)
        return;
      } else {
        result = parseFloat(PREVIOUS_OPERAND) / parseFloat(CURRENT_OPERAND);
      }
      break;
  }
  CURRENT_OPERAND = result.toFixed(2).toString()
  PREVIOUS_OPERAND = "";
}

//Updates display
function updateDisplay() {
  document.querySelector("#previousOperand").textContent = PREVIOUS_OPERAND;
  document.querySelector("#currentOperand").textContent = CURRENT_OPERAND;
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
