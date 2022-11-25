# Pseudocode for wordle

## General rough design

    1. 2 grids -1 1x6 grid for output 1 10 x 3 grid for input
    2. 4 different User input types - Letters, Submit, Clear, Reset
    3. 1 program input - Answer 5 letter word
    4. Each letter input key will have value assigned in HTML for event.target.value use DRY
    5. outputgrid - each grids div id is number 1 - 30 to allow icnrementing fowardx and back in our function.

## Inputs and their pathways/function

Global Vars - to refactor hopefully
answerString = "hello"
currentInputString = "world"
GridDivId = 1 The last grid driv id will be 30 6x5area - nvm a good idea would be to use a class and for loop through with id = 0 +=1 per div - DRY

### Input - Clear Function - Output removes letter

    1.declare the variable in JS
    2.Add a DOM event on click to trigger the handleclear function
    3. handleclear function
        1. takes an input variable of the current input string.
        2. lets a new variable for string value to return.
        2. if current string = true removes the end character:
            1. end character removed using stringtoreturn = currentstring - current.str.slice(0, -1);
            3. HandleGridInnerTextChange (clear);
            4. HandleGridStep (clear).
            5. return currentstring = stringtoreturn
        3. else, do nothing.

I need one function to step one step further on the grid or one step back.

I need another function to add or remove current grid inner text.

### - Letters input - input is letter - output is display on screen and currentstring input -

    1.declare the variable in JS
    2.Add a DOM event on click to trigger the handleletter input
    3. handletterInput function
        1. if currentstring.length === 5 - do nothing
        2. else
            1. handleGridInnerTextChange (event.target.value)
            2. currentstring +=event.target.value
            3. handleActiveGridArea (letter)

### Submit Button Input - input is submit - output is to check answer

    1.declare the variable in JS
    2.Add a DOM event on click to trigger the handleSubmit input
    3. handleSubmitInput
        1. If currentstring.length !== 5 -> do nothing
        2. if currentstring.length =5 && divid !==30 - step to check whether this is the last submit
                => handleCheckAnswer()
                HandleActiveGridArea (submit)
        3. if currentstring.lenght = 5 && divid == 30
            => handleCheckAnswer();
        4. else do nothing

### Restart Button Input

    1.declare the variable in JS
    2.Add a DOM event on click to trigger the handleRestart input
    3. HandleRestartINput
        1. handleClearAllGridText ()
        2. AnswerString = "";
        3. currentString = "";
        4. griddivs classes = reset correct/almostcorrect
        4. griddivid= 1.
        5. getNewAnswer ();

### - Utility functions

### - HandleGridInnerTextChange() Add or Remove value from inner text

handleGridInnerTextChange (Userinput): 1. if Userinput = "clear" - grid at id = Griddiv .innertext = "" 2. else grid at id = Griddivid .innertext += event.target.value

### - HandleActiveGridArea() step forward or back grid div area

HandleActiveGridArea (UserInput)

If (userInput == (letter OR Submit)
griddivID +=1

else if userInput == clear
griddivid -= 1

### HandleinitialCheckAnswer(currentstring, answerstring)

    if current string === answer string => winLosefunction()
    if current string !== answer string && divid=30 => winlosefunction()
    if currentstring !== answer & divid < 30 -> secondAnswerCheck()

### HandleSecondAnswerCheck(current string, answer string)

x = 0 = character position
for (index=0 index < answerstring.length index ++>)
if (char at currentstring(x) === char at answerstring(x)) => gridarea at (griddiv.id - (5-x)).inner html - class="correct" and vbutton with value of charatxcurrentstring
x += 1
let b = currentanswerstring.charat(x)
else (tertiaryanswercheck (b, x))

### tertiary answer check (b, x)

if answerstring.includes(b) => gridarea at (griddiv.id - (5-x)) => applyalmostcorrectanswerclass to griddiv.id - 5-x.inner html and button with value b
else do nothing.

### winLoseFunction()

    1. if curr string === answer string => fancy alert saying they won + click to restart!
    2. if curr string !=== answer string => sorry better luck next time, click to restart!

### getNEwAnswer() - input = restart or submit @ div 30

    let x = randomnumbergenfunction();
    return currentanswer = answerarray[x];
