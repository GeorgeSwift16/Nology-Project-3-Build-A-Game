/*                                  Global variables            */

let answerString = "";
let currentWordString = "";
let isGameActive = true;
// active output display box variables
let activeOutputBoxIndex = 3;
let activeOutputDisplayBox;

/*                                  DOM Variables               */
//input variables
//  Input Buttons
//    all input buttons
const allInputButtonsArr = document.querySelectorAll(".input-grid__button");
//    all letter input buttons
const allLetterInputButtons = document.querySelectorAll(".button-letter");
//    specific operator input buttons - Enter, Clear, Reset
const enterInputButton = document.getElementById("ENTER");
const clearInputButton = document.getElementById("CLEAR");
const resetInputButton = document.getElementById("RESET");
console.log(resetInputButton);
// Output variables
//    All output boxes
const outputDisplayBoxes = document.querySelectorAll(
  ".output-grid__display-box"
);
//  console.log();
/*                                    Functions                               */

// Functions for Clear input

const handleClearInput = () => {
  // check for clear edge cases - is the game active?
  if (isGameActive && canWeGoBack) {
    console.log("can go back");
  } else {
    console.log("cant go back");
  }
};

//

/*                Utility Functions                       */
// function to change active square step
const handleActiveOutputBox = (event) => {
  let canWeGoBack = activeOutputBoxIndex % 5;
  let activeOutputBoxIncrement = activeOutputBoxIndex;
  if (event.target.value === "ENTER") {
    activeOutputBoxIncrement += 1;
  } else if (event.target.value === "CLEAR" && canWeGoBack != 0) {
    activeOutputBoxIncrement -= 1;
  } else if (event.target.value === "RESET") {
    activeOutputBoxIncrement = 0;
  }
  activeOutputBoxIndex = activeOutputBoxIncrement;
  activeOutputDisplayBox = document.querySelectorAll(
    ".output-grid__display-box"
  )[activeOutputBoxIndex];
};

/*                        Event listeners                   */
//    all letter input buttons
// for (let index = 0; index < allLetterInputButtons.length; index++) {
//   allLetterInputButtons[index].addEventListener("click", handleLetterInput);
// }
//    specific operator input buttons - Enter, Clear, Reset
enterInputButton.addEventListener("click", handleActiveOutputBox);
clearInputButton.addEventListener("click", handleClearInput);
resetInputButton.addEventListener("click", handleActiveOutputBox);
