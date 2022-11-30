const activeOutputBoxIndex = 4;
const arr1 = ["h", "t", "z", "a", "c"];
const arr2 = ["h", "t", "", "a", "c"];
let answerString2 = "";
let answerString1 = "";
let answerARr = [];
const handleCheckIfRowCharsFull = () => {
  answerString1 = arr1.join();
  answerString2 = arr2.join("");
};
handleCheckIfRowCharsFull();

let rowInputString = "";

let answerString = "LLLLP";
let charactersAtCorrectPosition = [];
let answerCheckArr = [];
// functions to make and where linked
/*
- submit step 4 - make a winner function annd link here
-submit step 5 - end game function
- submit step 6 - func to apply grey class to any ch
-
-wipe correct chars array each row dont wipe the grey ones as no need - run func on wrong letters array to turn them all grey wherever exist alone as innerhtml
-
-LLLLP
-
-
*/
let rowInputHtmlArray = ["L", "O", "C", "L", "L"];
let answerArray = ["L", "B", "L", "L", "P"];
// const checkCorrectCharCorrectIndex = () => {
//   for (let index = 0; index < rowInputHtmlArray.length; index++) {
//     let element = rowInputHtmlArray[index];
//     let x = answerArray[index];
//     if (element === x) {
//       console.log(element);
//     } else if (answerArray.includes(element) && element != x) {
//       console.log("close");
//     } else {
//       console.log("not at all");
//     }
//   }
// };
// NOTES on what on earth im doing below - WE use the bottom function to check if an answer is correct, almost correct or not. We then pass this to the function below which goes across the array, and removes an element as it comes across it to replace it with Hi, this prevents the error in index passed due to 2 of the same elements. I will then use this to pass the function to change the display box colours. So to do in the morning -> replacing console.log(answercheckArr.indexOf(element)) with call color func with the same. the color func will then use activeoutputboxindex. then do axtiveoutputbox index - 4 + (the index passed) then colour the OutputDisplayBoxes array at this calculated numbers index!
// Also need to change the else statement in the function below to push the letters that are incorrect to a new array called characters not in answer then have this function call one to apply the grey colour to any outputdisplybox with innertext = a char in the array.
const updateGameColors = () => {
  for (let index = 0; index < answerCheckArr.length; index++) {
    let element = answerCheckArr[index];
    if (element === "correct") {
      console.log(answerCheckArr.indexOf(element));
      answerCheckArr.splice(index, 1, "hi");
    }
    if (element === "almost") {
      //   console.log(answerCheckArr.indexOf(element));
    } else {
      //   console.log(answerCheckArr.indexOf(element));
    }
  }
  console.log(answerCheckArr);
};
const checkCorrectCharCorrectIndex = (inputArr, answerArr) => {
  for (let index = 0; index < inputArr.length; index++) {
    let element = inputArr[index];
    let isMatch = element === answerArr[index];
    if (isMatch) {
      answerCheckArr.push("correct");
    } else if (answerArr.includes(element) && !isMatch) {
      answerCheckArr.push("almost");
    } else {
      answerCheckArr.push(element);
    }
  }
  updateGameColors();
};
checkCorrectCharCorrectIndex(rowInputHtmlArray, answerArray);
console.log(answerCheckArr);
console.log(answerCheckArr[1]);
