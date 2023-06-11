/*
 * cpature button click event => button should send payload(value)
 * click handler shoudl check if payload value is number
 * if payload is number append to operand
 * if payload is operator shoud update the result and change current operand
 * if payload is result request (equal sign) clear current operand and upadate result
  * if payload is operator assign curr. operand to preveous opeand
  *   - call operate() with 
 */
const result = document.querySelector("#result");
const operand = document.querySelector("#operand");
const numButtons = document.querySelectorAll(".numButtons");

/**
 * Event handler fucntion
 * */

let currentOperand = "";
let previousOperand = "";

const operators = ["+", "-", "/", "*"];

function eventHandler(payload) {
  if (payload === "=") {
    previousOperand = currentOperand;
    currentOperand = "";
    result.textContent = previousOperand;
    operand.textContent = "";
    return;
  }
  if (payload === "." && currentOperand.includes(".")) {
    return;
  }

  if (operators.includes(payload)) {
    if (currentOperand.slice(-1) === payload) {
      return;
    } else if (operators.includes(currentOperand.slice(-1))) {
      currentOperand = currentOperand.replace(/.$/, payload);
    } else {
      currentOperand = currentOperand + payload;
    }
  } else {
    currentOperand = currentOperand + payload;
  }

  operand.textContent = currentOperand;
}

numButtons.forEach((button) => {
  button.addEventListener("click", () => eventHandler(button.value));
});
