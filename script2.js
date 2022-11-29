/*                                  Global variables            */
let currentLetterString = "";
let answerString = "";
let activeOutputBoxIndex = 0;
let rowInputLetterString = "";
let rowInputArray = [];

// Active output box
/*                                  DOM Variables               */
//input variables
//  Input Buttons
//    all input buttons
const allInputButtonsArr = document.querySelectorAll(".input-grid__button");
//    all letter input buttons
const allLetterInputButtons = document.querySelectorAll(".button-letter");
//    specific operator input buttons - Enter, BACK, Reset
const nextInputButton = document.getElementById("NEXT");
const backInputButton = document.getElementById("BACK");
const resetInputButton = document.getElementById("RESET");
const submitInputButton = document.getElementById("SUBMIT");
// Output variables
//    All output boxes
const outputDisplayBoxes = document.querySelectorAll(
  ".output-grid__display-box"
);
//  steps to get answer - pull element from the outputdisplayboxes into an array - next compare index at i(input) = index at i (output) - if ===
const getRowInputAnswer = (input) => {
  for (let index = input - 4; index < input + 1; index++) {
    rowInputArray.push(outputDisplayBoxes[index].innerHTML);
  }
};

// -----------------------------------------new code

// initial input functions to check next steps for each button
const handleLetterInput = (event) => {
  outputDisplayBoxes[activeOutputBoxIndex].innerHTML = event.target.value;
};
const handleNextInput = (event) => {
  let checkIfEndOfLine = (activeOutputBoxIndex + 1) % 5;
  if (checkIfEndOfLine) {
    changeActiveOutput(event.target.value);
  }
};
const handleBackInput = (event) => {
  let checkIfNewLine = activeOutputBoxIndex % 5;
  if (activeOutputBoxIndex != 0 && checkIfNewLine) {
    changeActiveOutput(event.target.value);
  }
};
// refactor the below in future
const handleSubmitInput = (event) => {
  let checkIfEndOfLine = activeOutputBoxIndex % 5;
  if (checkIfEndOfLine) {
    console.log(rowInputArray);
    // run check answer
    getRowInputAnswer(activeOutputBoxIndex);
    changeActiveOutput(event.target.value);
  }
};
const handleResetInput = (event) => {
  changeActiveOutput(event.target.value);
};

// -----------------------------new code
// function to change active grid area
const changeActiveOutput = (input) => {
  if (input === "NEXT") {
    activeOutputBoxIndex += 1;
  } else if (input === "BACK") {
    activeOutputBoxIndex -= 1;
  } else if (input === "RESET") {
    activeOutputBoxIndex = 0;
  } else if (input === "SUBMIT") {
    activeOutputBoxIndex += 1;
  }
  outputDisplayBoxes[activeOutputBoxIndex].style.border = "3px solid red";
};

/*                        Event listeners                   */
//    all letter input buttons
for (let index = 0; index < allLetterInputButtons.length; index++) {
  allLetterInputButtons[index].addEventListener("click", handleLetterInput);
}
//    specific operator input buttons - Next, Back, Reset, Submit
nextInputButton.addEventListener("click", handleNextInput);
backInputButton.addEventListener("click", handleBackInput);
resetInputButton.addEventListener("click", handleResetInput);
submitInputButton.addEventListener("click", handleSubmitInput);
