/*                                  Global variables            */
let currentLetterString = "";
let answerString = "";
let activeOutputBoxIndex = 0;
let rowInputArray = [];
let answerarray = [];
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
/*                  initial box colour                  */
outputDisplayBoxes[activeOutputBoxIndex].style.border = "3px solid red";
// change cloose on activeboxindex change input=activeboxindex
const getActiveColor = (input) => {
  outputDisplayBoxes[input + 1].style.border = "3px solid grey";
  outputDisplayBoxes[input - 1].style.border = "3px solid grey";
  outputDisplayBoxes[input].style.border = "3px solid red";
};

/*                              functions to check answer                 */
//  steps to get answer - pull element from the outputdisplayboxes into an array - next compare index at i(input) = index at i (output) - if ===
const getRowInput = () => {
  for (
    let index = activeOutputBoxIndex - 4;
    index < activeOutputBoxIndex + 1;
    index++
  ) {
    rowInputArray.push(outputDisplayBoxes[index].innerHTML);
  }
  console.log(rowInputArray);
};

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
  // +1 used to prevent edge case of index=0
  let checkIfLineEnd = (activeOutputBoxIndex + 1) % 5;
  if (checkIfLineEnd === 0) {
    // run check answer
    getRowInput();
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
submitInputButton.addEventListener("click", handleSubmitInput);
