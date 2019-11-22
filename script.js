var charChoices = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"],
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z"],
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<",
        "=", ">","?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"],
];

function buildPassword(arr) {
    //obtain desired password length
    var passLength = parseInt(document.getElementById("formGroupExampleInput").value);
    //create an empty array to contain new password
    var newPass = [];
    //get a number of random characters equal to password length
    for (i=0; i<passLength; i++) {
        //randomly select character type
        var randTypeSelector = Math.floor(Math.random()*arr.length);
        //randomly select character
        var randCharSelector = Math.floor(Math.random()*arr[randTypeSelector].length);
        //push randomly selected characters into password container array
        newPass.push(arr[randTypeSelector][randCharSelector]);
    }
    //display the new password in the readonly input field as a joined string
    document.getElementById('passField').value = newPass.join("");
}

function chooseParams(){
    //clear existing error message, if any
    document.getElementById("warning1").innerHTML = "";
    document.getElementById("warning2").innerHTML = "";
    //create an empty array to contain chosen character types
    var chosenParams = [];
    //loop through the checkbox buttons
    for (i=1; i<=4; i++){
        //determine which ones are selected
        if (document.querySelector("#defaultCheck"+i).checked === true) {
            //push the selected character type arrays into chosenParams
            chosenParams.push(charChoices[i-1]);
        }
    }
    //build a password with the chosen parameters
    buildPassword(chosenParams);
}

//validate user inputs
function validateParams(){
    //in order to run chooseParams(), numValid must be true and checksValidCount must be > 0
    numValid = false;
    checksValidCount = 0;
    //loop through the checkboxes
    for (i=1; i<=4; i++) {
        //increment checksValidCount for each true result
        if (document.querySelector("#defaultCheck"+i).checked === true) {
            checksValidCount++;
        }
    }
    //if user input number is between 8 and 160, numValid is set to true
    if (parseInt(document.getElementById("formGroupExampleInput").value) > 7 &&
        parseInt(document.getElementById("formGroupExampleInput").value) < 161) {
            numValid = true;
    }
    //display warning message for invalid number
    if (numValid === false) {
        document.getElementById("warning1").innerHTML = "Not a valid number"
    }
    //display warning message for 0 checkbox selections
    if (checksValidCount < 1) {
        document.getElementById("warning2").innerHTML = "Please check at least one character type"
    }
    //if all valid, run password generator
    if (numValid === true && checksValidCount > 0) {
        chooseParams();
    }
}

function copyPassword(){
    var givenText = document.getElementById("passField");
    givenText.select();
    givenText.setSelectionRange(0, 160);
    document.execCommand("copy");
}
