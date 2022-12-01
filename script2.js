/*                                  Global variables            */
let activeOutputBoxIndex = 0;
let answerArray = ["L", "L", "L", "L", "P"];
let answerString = "LLLLP";

/*                                  DOM Elements               */
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
// Default classes to enable reset to revert all forms of styling

/*           colour styling functions- to make into class application  */
/*                 styling for user focus */
// initial active box colour on load
outputDisplayBoxes[0].style.border = "3px solid red";
// change border color to highlight focused displaybox change
const getActiveColor = (input) => {
  outputDisplayBoxes.forEach((element) => {
    const borderColor = element == outputDisplayBoxes[input] ? "red" : "grey";

    element.style.border = `3px solid ${borderColor}`;
  });
};
/*    syling for user feedback */
// grey color application for inputbuttons of incorrect characters
const applyGreyToWrongLetterInputKeys = (input) => {
  for (let index = 0; index < allLetterInputButtons.length; index++) {
    const element = allLetterInputButtons[index];
    if (input == element.value) {
      element.style.backgroundColor = "pink";
    }
  }
};

// colour application for correctness of row input on row
const applyCorrectColouration = (correctness, indexCount) => {
  let activeRowStart = 0;
  activeRowStart = activeOutputBoxIndex - 4;
  let boxToApplyColor = 0;
  boxToApplyColor = activeRowStart + indexCount;
  const boxToColor = outputDisplayBoxes[boxToApplyColor];
  if (correctness == "match") {
    boxToColor.style.backgroundColor = "green";
  } else if (correctness == "almost") {
    boxToColor.style.backgroundColor = "orange";
  } else {
    boxToColor.style.backgroundColor = "grey";
    applyGreyToWrongLetterInputKeys(correctness);
  }
};
//  ------------------------------------------------------------------------

const handleClearTempVariablesOnLineChange = (inputArray, inputString) => {
  inputArray = [];
  inputString = "";
};

// submit step 7 - Now pass the correct info to the colourupdating function to return feedback to the user based on the correctness of their answer
const handleProvideUserFeedback = (input) => {
  let indexCount = 0;
  console.log(input);
  input.forEach((element) => {
    applyCorrectColouration(element, indexCount);
    indexCount += 1;
  });
  indexCount = 0;
  handleClearTempVariablesOnLineChange();
  changeActiveOutput("SUBMIT");
};

// submit step 6 - Since not fully correct and we have more guesses to make, how correct was this rows guess?
const getRowAnswerCorrectnessArray = (inputArr, answerArr) => {
  let answerCheckArray = [];
  for (let index = 0; index < inputArr.length; index++) {
    let element = inputArr[index];
    const isMatch = element === answerArr[index];
    const isAlmostMatch = answerArr.includes(element) && !isMatch;
    if (isMatch) {
      answerCheckArray.push("match");
    } else if (isAlmostMatch) {
      answerCheckArray.push("almost");
    } else {
      answerCheckArray.push(element);
    }
  }
  handleProvideUserFeedback(answerCheckArray);
};

// submit step 5 was this the last guess the player has ?
const checkIfLastGuess = (inputArray) => {
  const isLastGuess = activeOutputBoxIndex === 29;
  if (isLastGuess) {
    alert("sorry game over, please hit restart to try again =(");
  } else {
    getRowAnswerCorrectnessArray(inputArray, answerArray);
  }
};

// submit step 4 - check if answer is 100% correct
const checkIfAnswerCorrect = (inputArray, inputString) => {
  const isAnswerCorrect = answerString === inputString;
  if (isAnswerCorrect) {
    alert("congrats you won! - replace with func");
  } else {
    checkIfLastGuess(inputArray);
  }
};
// console.log();
// submit step 3 - get a string of the rows input
const getRowInputString = (inputArray) => {
  const rowInputString = inputArray.join("");
  const isRowInputComplete = rowInputString.length === 5;
  if (isRowInputComplete) {
    checkIfAnswerCorrect(inputArray, rowInputString);
  } else {
    alert("please fill in all squares before we check your answer!");
    handleClearTempVariablesOnLineChange(inputArray, rowInputString);
  }
};

// submit step 2 - get the input for the row - create array from row start to row end based on activeoutputindex
const getRowInputArr = () => {
  let rowInputHtmlArray = [];
  for (
    let index = activeOutputBoxIndex - 4;
    index < activeOutputBoxIndex + 1;
    index++
  ) {
    const displayBoxHtml = outputDisplayBoxes[index].innerHTML;
    rowInputHtmlArray.push(displayBoxHtml);
  }
  getRowInputString(rowInputHtmlArray);
};

// submit step 1
const handleCheckIfLineEnd = () => {
  const isLineEnd = (activeOutputBoxIndex + 1) % 5 === 0;
  if (isLineEnd) {
    getRowInputArr();
  } else {
    alert("You can only submit your answer at the end of the row");
  }
};

//            initial input functions to check next steps for each button
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
  getActiveColor(activeOutputBoxIndex);
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
submitInputButton.addEventListener("click", handleCheckIfLineEnd);
