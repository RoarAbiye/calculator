let buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleEvents(btn.value);
  });
});

let curOperand = "";
let prevOperand = "";
let operator = "";
let opertors = ["+", "-", "*", "/"];
let calculatorReset = false;

/** Handles inpute events
 * @function handleEvents
 * @param {string} params
 * @returns void
 */
function handleEvents(params) {

  if (params === "=") {
    calculatorReset = true
    calclate();
    operator = "";
  } else if (opertors.includes(params)) {
    changeOperator(params);
  } else if (params === "C") {
    curOperand = "";
    prevOperand = "";
    operator = "";
  } else if (params === "x") {
    if (curOperand === "") {
      if (!operator === "") {
        operator = "";
      }
    } else {
      curOperand = curOperand.slice(0, -1);
    }
    curOperand = curOperand.slice(0, -1);
  } else if (params === ".") {
    curOperand.includes(".") ? false : appendOperand(".");
  } else {
    if (calculatorReset) {
      calculatorReset = !calculatorReset;
      clear()
    }
    curOperand += params;
  }
  updateDisplay();
}

/** Calculates and sets current operand to empty
 * Resets previous operand
 * */
function calclate() {
  let result = "";
  switch (operator) {
    case "+":
      result = prevOperand = parseFloat(curOperand) + parseFloat(prevOperand);
      break;
    case "-":
      result = prevOperand = parseFloat(curOperand) - parseFloat(prevOperand);
      break;
    case "*":
      result = prevOperand = parseFloat(curOperand) * parseFloat(prevOperand);
      break;
    case "/":
      result = prevOperand = parseFloat(curOperand) / parseFloat(prevOperand);
      break;
  }


  curOperand = result.toFixed(2);
  prevOperand = "";
}

/** Updates display
 * @function updateDisplay
 * @param {string} params
 * @returns void
 */
function updateDisplay() {
  document.getElementById("result").textContent = `P.O.: ${prevOperand}`;
  document.getElementById("operand").textContent = `C.O.: ${curOperand}`;
  document.getElementById("opertor").textContent = `O.P.: ${operator}`;
  console.log(curOperand);
}

function appendOperand(params) {
  if (curOperand.includes(".") && params === ".") {
    return;
  } else if (curOperand === "") {
    curOperand += params;
  }
}
function clear() {
  curOperand = "";
  prevOperand = "";
  operator = "";
  updateDisplay()
}

function backspace() {
  if (curOperand === "") {
    return;
  } else if (operator !== "") {
    operator = "";
  } else {
    curOperand = curOperand.slice(0, -1);
  }
}

/** Changes operator
  * @function changeOperator
  * @param {string} params
  * @returns void
  */
function changeOperator(params) {

  if (curOperand === "" && prevOperand === "") return;

  if (curOperand === "") {
    operator = params;
  } else {
    if (prevOperand === "") {
      prevOperand = curOperand;
      operator = params;
      curOperand = "";
    } else {
      calclate();
      operator = params;
    }
  }
}
