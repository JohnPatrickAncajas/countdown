import { popForm, closeFormPopUp, CONSTANT_IDS, saveCountdownForm } from './formfunctions.js'
import { addClickListenersWithoutDuplicates } from './functions.js';

const popAndAddFormSubmission = () => {
    popForm()
    handleFormSubmission();
}

function handleFormSubmission() {
    const submitbutton = document.getElementById(CONSTANT_IDS.form_submitButton);
    addClickListenersWithoutDuplicates(submitbutton, (e) => {
        e.preventDefault();
        submitbutton.disabled = true;
        saveCountdownForm();
        // testing
        window.location.href = "/html/countdown-list.html";
        closeFormPopUp();
    })
}


// todo: remove dynamic seting of css
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormSubmission);