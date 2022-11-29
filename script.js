/*                                  Global variables            */
let currentLetterString = "";
let answerString = "";
let activeOutputBoxIndex = 0;
// Active output box
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
// Output variables
//    All output boxes
const outputDisplayBoxes = document.querySelectorAll(
  ".output-grid__display-box"
);
const handleLetterInput = (event) => {
  outputDisplayBoxes[activeOutputBoxIndex].innerHTML = event.target.value;
  currentLetterString += event.target.value;
  console.log(currentLetterString);
};

// function to change active square step
const handleActiveOutputBox = (event) => {
  // if (event.target.value ==)
  changeActiveOutput(event.target.value);
};

const changeActiveOutput = (input) => {
  if (input === "ENTER") {
    activeOutputBoxIndex += 1;
  } else if (input === "CLEAR" && activeOutputBoxIndex != 0) {
    activeOutputBoxIndex -= 1;
  } else if (input === "RESET") {
    activeOutputBoxIndex = 0;
  }
  outputDisplayBoxes[activeOutputBoxIndex];
};

/*                        Event listeners                   */
//    all letter input buttons
for (let index = 0; index < allLetterInputButtons.length; index++) {
  allLetterInputButtons[index].addEventListener("click", handleLetterInput);
}
//    specific operator input buttons - Enter, Clear, Reset
enterInputButton.addEventListener("click", handleActiveOutputBox);
clearInputButton.addEventListener("click", handleActiveOutputBox);
resetInputButton.addEventListener("click", handleActiveOutputBox);
