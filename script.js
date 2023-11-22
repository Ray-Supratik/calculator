"use strict";

//operation buttons
const clearButton = document.getElementById("clear");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equaltoButton = document.getElementById("equalto");

//number buttons
const button1 = document.getElementById("one");
const button2 = document.getElementById("two");
const button3 = document.getElementById("three");
const button4 = document.getElementById("four");
const button5 = document.getElementById("five");
const button6 = document.getElementById("six");
const button7 = document.getElementById("seven");
const button8 = document.getElementById("eight");
const button9 = document.getElementById("nine");
const button0 = document.getElementById("zero");

//screen
const screen = document.getElementById("screen");
screen.value = 0;

let result = 0;
let value1 = "";
let value2 = "";
let operator;
let operation = false;
let userInterface = "";
let lastOperator = false;

function calculate(firstValue, secondValue, operator) {
  firstValue = Number(firstValue);
  secondValue = Number(secondValue);
  let outcome;
  switch (operator) {
    case "+":
      return Math.round((firstValue + secondValue) * 100) / 100;
    case "-":
      return Math.round((firstValue - secondValue) * 100) / 100;
    case "*":
      return Math.round(firstValue * secondValue * 100) / 100;
    case "/":
      return Math.round((firstValue / secondValue) * 100) / 100;
  }
}

function updateUI(updateValue) {
  userInterface += updateValue;
  screen.value = userInterface;
}

function numberButtonFunction(buttonValue) {
  lastOperator = lastOperator === true ? false : false;
  // operation going on means user is clicking button after clicking on a operator button
  if (operation) {
    value2 += buttonValue;
  } else {
    //operation not going on means user is clicking on the button for the very first time or after getting result from equal-to button
    //if value1 is NIL it means that the last action was equal-to button and so we want to set it to empty string
    value1 = value1 === "NIL" ? "" : value1;
    value1 += buttonValue;
  }
  updateUI(buttonValue);
}

function operatorButtonFunction(operatorStr) {
  //checking if value1 is empty string because if it is then user is using operator button first without setting value1
  //aslo checks if the last button pressed was an operator
  if (!(value1 === "") && !lastOperator) {
    // checking if using the operator button directly after using the equalto button
    if (value1 === "NIL") {
      // if yes then setting the value1 and UI to the result
      value1 = userInterface = result;
    }
    if (operation) {
      //this code block is executed when operator bttn is pressed after giving value2
      value1 = String(calculate(value1, value2, operator));
      value2 = "";
      userInterface = value1 + operatorStr;
      screen.value = userInterface;
      operator = operatorStr;
    } else {
      //this code block is executed when operator bttn is pressed after giving value1(for the first time or using equal-to button)
      operation = true;
      operator = operatorStr;
      updateUI(operatorStr);
    }
    //sets it to true because last button pressed was an operator button
    lastOperator = true;
  }
}

equaltoButton.addEventListener("click", function () {
  if (!(value1 === "") && !(value1 === "NIL") && !(value2 === "")) {
    result = calculate(value1, value2, operator);
    value2 = userInterface = "";
    value1 = "NIL";
    operation = false;
    screen.value = result;
  }
});

clearButton.addEventListener("click", function () {
  result = 0;
  lastOperator = false;
  operation = false;
  value1 = value2 = userInterface = "";
  screen.value = "0";
});

button1.addEventListener("click", function () {
  numberButtonFunction("1");
});
button2.addEventListener("click", function () {
  numberButtonFunction("2");
});
button3.addEventListener("click", function () {
  numberButtonFunction("3");
});
button4.addEventListener("click", function () {
  numberButtonFunction("4");
});
button5.addEventListener("click", function () {
  numberButtonFunction("5");
});
button6.addEventListener("click", function () {
  numberButtonFunction("6");
});
button7.addEventListener("click", function () {
  numberButtonFunction("7");
});
button8.addEventListener("click", function () {
  numberButtonFunction("8");
});
button9.addEventListener("click", function () {
  numberButtonFunction("9");
});
button0.addEventListener("click", function () {
  numberButtonFunction("0");
});

plusButton.addEventListener("click", function () {
  operatorButtonFunction("+");
});

multiplyButton.addEventListener("click", function () {
  operatorButtonFunction("*");
});

minusButton.addEventListener("click", function () {
  operatorButtonFunction("-");
});

divideButton.addEventListener("click", function () {
  operatorButtonFunction("/");
});
