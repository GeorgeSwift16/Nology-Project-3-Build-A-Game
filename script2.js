/*                                  Global variables            */
const arrayOfWords = ["JUDGE", "HEDGE", "LEARN", "LEGAL", "LABEL"];
let activeOutputBoxIndex = 0;

/*                                  DOM Elements                        */
/*                               input variables                            */
//  Input Buttons
//      all letter input buttons
const allLetterInputButtons = document.querySelectorAll(".button-letter");
const allInputButtons = document.getElementsByClassName("input-grid__button");
//      specific operator input buttons - Enter, BACK, Reset
const nextInputButton = document.getElementById("NEXT");
const backInputButton = document.getElementById("BACK");
const resetInputButton = document.getElementById("RESET");
const submitInputButton = document.getElementById("SUBMIT");
// Output variables
//    All output boxes
const outputDisplayBoxes = document.querySelectorAll(
  ".output-grid__display-box"
);

/*                              Functions                                  */
/*                  Function To generate answer                         */

let answerArray = [""];
let answerString = "";
const returnAnswer = () => {
  console.log("hi");
  const randomNumber = Math.trunc(Math.random() * 4 + 1);
  answerString = arrayOfWords[randomNumber];
  answerArray = [...answerString];
};

/*                  Reset Function          */
const handleReset = () => {
  activeOutputBoxIndex = 0;
  outputDisplayBoxes.forEach((element) => {
    element.innerHTML = "";
    element.style.backgroundColor = "white";
  });
  allLetterInputButtons.forEach((element) => {
    element.classList.remove("input-grid__button--incorrect");
  });
  returnAnswer();
};

/*    functions- render colour styling for output and input user feedback  */
/*                 styling for user active outputbox focus                  */
const handleUserFocusFeedback = (input) => {
  outputDisplayBoxes.forEach((element) => {
    const activeclass = "display-box--active";
    const inactiveClass = "display-box--inactive";
    const classToApply =
      element == outputDisplayBoxes[input] ? activeclass : inactiveClass;
    const classToRemove =
      element == outputDisplayBoxes[input] ? inactiveClass : activeclass;
    element.classList.add(`${classToApply}`);
    element.classList.remove(`${classToRemove}`);
  });
};
/*                    functions - styling for user feedback              */
// grey color application for inputbuttons of incorrect characters
const applyGreyToWrongLetterInputKeys = (input) => {
  const wrongCharclass = "input-grid__button--incorrect";
  for (let index = 0; index < allLetterInputButtons.length; index++) {
    const element = allLetterInputButtons[index];
    if (input == element.value) {
      element.classList.add(`${wrongCharclass}`);
    }
  }
};
/*              function to apply answer feedback to output grid post submit */
// submit step 8 - colour application for correctness of row input on current row
const applyColorForAnswerCheckFeedback = (correctness, indexCount) => {
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

// submit step 7 - Now pass the correct info to the colourupdating function to return feedback to the user based on the correctness of their answer - index count used to provide a reference point
const handleProvideUserFeedback = (input) => {
  let indexCount = 0;
  input.forEach((element) => {
    applyColorForAnswerCheckFeedback(element, indexCount);
    indexCount += 1;
  });
  indexCount = 0;
  updateActiveOutputBoxIndex("SUBMIT");
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
const checkIfLastGuessOfGame = (inputArray) => {
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
    alert("congrats you won! press reset to go again!");
  } else {
    checkIfLastGuessOfGame(inputArray);
  }
};

// submit step 3 - get a string of the rows input
const getCurrentRowInputString = (inputArray) => {
  const rowInputString = inputArray.join("");
  const isRowInputComplete = rowInputString.length === 5;
  if (isRowInputComplete) {
    checkIfAnswerCorrect(inputArray, rowInputString);
  } else {
    alert("please fill in all squares before we check your answer!");
  }
};

// submit step 2 - get the input for the row - create array from row start to row end based on activeoutputindex
const getCurrentRowInputArray = () => {
  let rowInputHtmlArray = [];
  for (
    let index = activeOutputBoxIndex - 4;
    index < activeOutputBoxIndex + 1;
    index++
  ) {
    const displayBoxHtml = outputDisplayBoxes[index].innerHTML;
    rowInputHtmlArray.push(displayBoxHtml);
  }
  getCurrentRowInputString(rowInputHtmlArray);
};

//            initial input functions to check next steps for each button
// submit step 1
const handleSubmitCheckLineEnd = () => {
  const isLineEnd = (activeOutputBoxIndex + 1) % 5 === 0;
  if (isLineEnd) {
    getCurrentRowInputArray();
  } else {
    alert("You can only submit your answer at the end of the row");
  }
};

const handleLetterInput = (event) => {
  outputDisplayBoxes[activeOutputBoxIndex].innerHTML = event.target.value;
  let checkIfEndOfLine = (activeOutputBoxIndex + 1) % 5;
  if (checkIfEndOfLine) {
    updateActiveOutputBoxIndex();
  }
};
const handleNextInput = (event) => {
  let checkIfEndOfLine = (activeOutputBoxIndex + 1) % 5;
  if (checkIfEndOfLine) {
    updateActiveOutputBoxIndex(event.target.value);
  }
};
const handleBackInput = (event) => {
  let checkIfNewLine = activeOutputBoxIndex % 5;
  if (activeOutputBoxIndex != 0 && checkIfNewLine) {
    updateActiveOutputBoxIndex(event.target.value);
  }
};

const handleResetInput = (event) => {
  updateActiveOutputBoxIndex(event.target.value);
  handleReset();
};

// function to change active grid area
const updateActiveOutputBoxIndex = (input) => {
  if (input === "NEXT") {
    activeOutputBoxIndex += 1;
  } else if (input === "BACK") {
    activeOutputBoxIndex -= 1;
  } else if (input === "RESET") {
    activeOutputBoxIndex = 0;
  } else if (input === "SUBMIT") {
    activeOutputBoxIndex += 1;
  } else {
    activeOutputBoxIndex += 1;
  }
  handleUserFocusFeedback(activeOutputBoxIndex);
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
submitInputButton.addEventListener("click", handleSubmitCheckLineEnd);
handleUserFocusFeedback(0);
returnAnswer();
