# Pseudocode for wordle

## General rough design

    1. 2 grids -1 1x6 grid for output 1 10 x 3 grid for input
    2. 4 different User input types - Letters, Submit, Clear, Reset
    3. 1 program input - Answer 5 letter word
    4. Each letter input key will have value assigned in HTML for event.target.value use DRY
    5. outputgrid - each grids id is number 1 - 30 to allow icnrementing fowardx and back in our function.

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
            1. end character removed using string to return = currentstring - current.str.slice(0, -1);
            2. returns new string value to current string input variable
            3. HandleGridInnerTextChange (clear);
            4. HandleGridStep (clear).
        3. else, do nothing.

I need one function to step one step further on the grid or one step back.

I need another function to add or remove current grid inner text.

### - Letters input - input is letter - output is display on screen and currentstring input

    1.declare the variable in JS
    2.Add a DOM event on click to trigger the handleletter input
    3. handLetterInput function
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
        4. grid div id= 1.
        5. getNewAnswer ();

### - Utility functions

### - HandleGridInnerTextChange() Add or Remove value from inner text

handleGridInnerTextChange (Userinput) 1. if Userinput = "clear" - grid at id = Griddiv .innertext = "" 2. else grid at id = Griddiv .innertext = += event.target.value

### - HandleActiveGridArea() step forward or back grid div area

HandleActiveGridArea (UserInput)

If (userInput == letter)
gridColumnIdVariable +=1

else if userInput == clear
gridcolumnIdVariable -= 1

if (userInput = submit )
ActivegridcolumIdVariable += 1

### HandleinitialCheckAnswer(currentstring, answerstring)

    if current string === answer string => winnerfunction()
    if current string !== answer string && divid=30 => endgame()
    if currentstring !== answer & divid < 30 -> secondAnswerCheck()

### HandleSecondAnswerCheck(current string, answer string)

x = 0 = character position
for ()
if (char at currentstring(x) === char at answerstring(x)) => gridarea at (griddiv.id - (5-x)) -> applycorrectanswerclass()
x += 1
else (tertiaryanswercheck (x))

### tertiary answer check (x)

let char p
if answerstring.includes(x) => gridarea at (griddiv.id - (5-x)) => applyalmostcorrectanswerclass
else do nothing.

### winnerFunction()

    1. RestartButtoninput
    2. Find a fancy way to alert they won

### getNEwAnswer() - input = restart or submit @ div 30
