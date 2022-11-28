// global variable
let element1 = 0;
const stringElement1 = element1.toString;

const outputDisplayBoxes = document.querySelectorAll(
  ".output-grid__display-box"
);
let activeOutputDisplayBox = document.querySelectorAll(
  ".output-grid__display-box"
)[3];
// need to find a way to update this number above? ahhh nvm its an array/object and this is item/key 3 so we just need to make a function that targets a particular value withing the activeoutput display box and changes based on submit/clear/reset.
console.log(element1);
console.log(activeOutputDisplayBox);
const changeactivebox = () => {
  element1 += 1;
};
changeactivebox();

changeactivebox();
console.log(element1);
console.log(activeOutputDisplayBox);
// dom variables

// event listeners
