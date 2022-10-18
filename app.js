import { Clock, NewYearClock } from "./js/clock.js";
import { waitForAnimation } from "./js/appfunctions.js";
import { errorHandler } from "./js/error.js";
import { setInnerHtmlForNotNull } from "./js/functions.js";
import { registerSW } from 'virtual:pwa-register'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// DOM nodes
const animatedCountDuration = 800;
const HOMEPAGE_DOM_IDS ={
    clockDayElement:'day-num',
    clockHourElement: 'hour-num',
    clockMinuteElement: 'min-num',
    clockSecondElement: 'sec-num',
    countdownTextDisplay: 'countdown-text',
    dueDate: 'dueDate',
}

var dayNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockDayElement);
var hourNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockHourElement);
var minNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockMinuteElement);
var secNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockSecondElement);
var dueDate = document.getElementById(HOMEPAGE_DOM_IDS.dueDate);

// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock = setMainClock();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)

function setMainClock() {
    let myclock = new NewYearClock();
    let mainclock = localStorage.getItem('mainClock');
    console.log(mainclock);
    if (mainclock  && mainclock != 'undefined') { //countdown set to main
        mainclock = JSON.parse(mainclock)
        myclock = new Clock(new Date(mainclock.date));
        setMainText(mainclock.text)
    }
    return myclock;

}

function setMainText(countdownText) {
    const textDisplay = document.getElementById(HOMEPAGE_DOM_IDS.countdownTextDisplay);
    setInnerHtmlForNotNull(textDisplay, countdownText)
}



try {
    //show day value before animation runs
    waitForAnimation(myclock, { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration);

    // addWhatappEventHandler();
    // as;
} catch (error) {
    errorHandler("Error in clock");
    console.log(error);
}
//add service worker update functionality
//service worker update and offline functionality
const updateSW = registerSW({
    onNeedRefresh() {
        console.log('Update sw, now available, devEnv');
      Toastify({
        text: `
        <h4>A newer version of this page is available!</h4>
               <br>
               <a class='do-sw-update'>Click this banner to update and reload</a>
               `,
        escapeMarkup: false,
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: -150 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        // selector: 'testToast',
        className:'updateToastify',
        close: true,
        gravity: "bottom",
        duration: -1,
        onClick() {
          console.log('Clicking on update to refresh the new service worker');
          updateSW(true);
        }
      }).showToast();

    },
    onOfflineReady() {
        console.log('App is offline now');
    },
  })
/*
if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
  }
  */
// old service worker
/*
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=>{ 
        console.log('service worker registered', reg)
    })
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}*/
