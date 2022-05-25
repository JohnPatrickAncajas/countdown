import {popForm} from './form.js'
import {addZeros} from './functions.js'


function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}

function handleFormSubmission() {
    const countdownForm = document.getElementById('customDateForm');
    const submitbutton = document.getElementById('countdown-submit');

    // const event = document.createEvent('Event');
    // console.log(event);
    countdownForm.addEventListener('submit', (e) => {

        e.preventDefault();
        // submitbutton.disabled = true;
        // get text field values, with auto values
        let userTextField = document.getElementById('countdownText');
        let repeatCheck = document.getElementById("repeat-cb");
        console.log(userTextField.value, 'user input');
        let userText = sanitize(userTextField.value)
        console.log(userText, 'sanitized user');

        if (!userText) {
            userText = userTextField.placeholder;
            countNumber++;
            localStorage.setItem('countNumber', countNumber)
        }
        let userDate = document.getElementById("dateInput").value;
        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        if(repeatCheck){
            countItem.repeat = repeatCheck.checked;
        }
        console.log(countItem);
        let countdown = localStorage.getItem('countdown');
        if (countdown !== null) { //countdowns already exist
            countdown = JSON.parse(countdown);//array
            countdown.push(countItem);
            // console.log(countdown);
            setCountDownList(countdown);
            // external function
        } else {
            // create first countdown
            setCountDownList([countItem]);
            //  displayAndAddListeners();
        }
        try {
            displayAndAddListeners();
            console.log('we did it', countItemExists);
        } catch (err) {
            console.log(err, 'err in updating countdown initialisation');
            errorHandler("Unable to finish update your countdowns");
        }
        // testing
        closeFormPopUp();
    })
}

function setCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
}

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
let countNumber = 1;

// let dateInput, textInput;

// todo: remove dynamic seting of css
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}



createButton.addEventListener("click", popForm);