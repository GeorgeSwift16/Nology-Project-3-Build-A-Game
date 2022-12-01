/*                                  Global variables            */
let activeOutputBoxIndex = 0;
let rowInputHtmlArray = [];
let rowInputString = "";
let answerArray = ["L", "L", "L", "L", "P"];
let answerString = "LLLLP";
let charactersAtCorrectPosition = [];
let charactersGuessedButNotInAnswer = [];
let indexCount = 0;
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

/*           colour styling - to make into class application  */
/*                  initial active box colour                  */
outputDisplayBoxes[activeOutputBoxIndex].style.border = "3px solid red";
// change border color to highlight focused displaybox change
const getActiveColor = (input) => {
  outputDisplayBoxes.forEach((element) => {
    const borderColor = element == outputDisplayBoxes[input] ? "red" : "grey";

    element.style.border = `3px solid ${borderColor}`;
  });
};

// colour application for correctness of row input
const applyCorrectColouration = (correctness, indexCount) => {
  console.log(correctness);
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
    charactersGuessedButNotInAnswer.push(correctness);
  }
};
//  ------------------------------------------------------------------------

// submit step 7 - Now pass the correct info to the colourupdating function to return feedback to the user based on the correctness of their answer
// current issue is - when it loops through the chance is captured.
const handleProvideUserFeedback = (input) => {
  let indexCount = 0;
  console.log(input);
  input.forEach((element) => {
    applyCorrectColouration(element, indexCount);
    indexCount += 1;
  });
  indexCount = 0;
};

// for (let index = 0; index < input.length; index++) {
//   let element = input[index];
//   if (element === "match") {
//     applyCorrectColouration(element, indexCount);
//     indexCount += 1;
//     input.shift();
//     console.log("managed to get to almost");
//     console.log(input);
//   }
//   if (element === "almost") {
//     applyCorrectColouration(element, indexCount);
//     indexCount += 1;
//     input.shift();
//     console.log("managed to get to almost");
//     console.log(input);
//   } else {
//     applyCorrectColouration(element, indexCount);
//     indexCount += 1;
//     console.log("managed to get to none");
//     console.log(input);
//   }
// }
// console.log(indexCount);
// console.log(input);
// };

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
const checkIfLastGuess = () => {
  const isLastGuess = activeOutputBoxIndex === 29;
  if (isLastGuess) {
    alert("sorry game over, please hit restart to try again =(");
  } else {
    getRowAnswerCorrectnessArray(rowInputHtmlArray, answerArray);
  }
};

// submit step 4 - check if answer is 100% correct
const checkIfAnswerCorrect = () => {
  const isAnswerCorrect = answerString === rowInputString;
  if (isAnswerCorrect) {
    alert("congrats you won! - replace with func");
  } else {
    checkIfLastGuess();
  }
};
// console.log();
// submit step 3 - get a string of the rows input
const getRowInputString = () => {
  rowInputString = rowInputHtmlArray.join("");
  const isRowInputComplete = rowInputString.length === 5;
  if (isRowInputComplete) {
    checkIfAnswerCorrect();
  } else {
    alert("please fill in all squares before we check your answer!");
  }
};

// submit step 2 - get the input for the row - create array from row start to row end based on activeoutputindex
const getRowInputArr = () => {
  for (
    let index = activeOutputBoxIndex - 4;
    index < activeOutputBoxIndex + 1;
    index++
  ) {
    const displayBoxHtml = outputDisplayBoxes[index].innerHTML;
    rowInputHtmlArray.push(displayBoxHtml);
  }
  getRowInputString();
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
