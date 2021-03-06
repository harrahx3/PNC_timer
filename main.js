const correct_code_default = "3671"; // correct code to stop the timer (4 digits)
const correct_code = localStorage.getItem("correct_code")
  ? localStorage.getItem("correct_code")
  : correct_code_default; // correct code to stop the timer (4 digits)
const timer_start = 60 * 60; // 1 hour = 60 minutes = 3600 seconds
let speed = 1; // speed of timer: 1 = normal speed, 10 = 10 times faster, ...

function show(elmt) {
  elmt.style.display = "block";
}

function hide(elmt) {
  elmt.style.display = "none";
}

function stopCountDown() {
  clearInterval(countDownTimer); // stop timer
  clearInterval(warningTimer); // stop blinking
}

function addNumberInInput(newNumber) {
  // input cannot be more than 4 digits long
  if (input_code_field.value.length < 4) {
    input_code_field.value = input_code_field.value + newNumber;
  }
  input_code_field.focus();
}

function clearInput() {
  input_code_field.value = "";
  input_code_field.focus();
}

function displayTimer() {
  let hours = Math.floor(timer / 3600);
  let minutes = Math.floor((timer - 3600 * hours) / 60);
  let seconds = Math.floor(timer - 3600 * hours - 60 * minutes);
  let text = "";
  text += hours;
  text += ":";
  text += minutes < 10 ? "0" : "";
  text += minutes;
  text += ":";
  text += seconds < 10 ? "0" : "";
  text += seconds;
  timerElement.textContent = text;
}

function countDown() {
  timer -= 1;
  localStorage["timer"] = timer;
  displayTimer();
  let hours = Math.floor(timer / 3600);
  let minutes = Math.floor((timer - 3600 * hours) / 60);
  let seconds = Math.floor(timer - 3600 * hours - 60 * minutes);
  if (timer > 0 && timer <= 20*60 && minutes%5 == 0 && seconds == 0) {
    var audio_bip = new Audio("assets/bip.wav");
    audio_bip.play();
  }
  // only 5 minutes left -> start blinking
  if (timer == 60 * 5) {
    warningTimer = setInterval(warning, 700);
  }
  // no time left -> lose
  if (timer <= 0) {
    clearInterval(warningTimer);
    boom();
  }
}

// Change background color for blinking
function changeBackgroundColor(color) {
  document.getElementById("back").style.backgroundColor = color;
}

// Toggle background color for blinking
function warning() {
  background = background == "red" ? "black" : "red";
  changeBackgroundColor(background);
}

// Players found the correct code -> stop timer and display winning message
function win() {
  stopCountDown();
  hide(input_code);
  hide(not_good_div);
  hide(boom_div);
  show(win_div);
  hide(start_btn);
}

// Code input is not correct -> display error
function not_correct(err) {
  clearInput();
  const alert_text_start =
    "<div class='alert alert-warning alert-dismissible fade show' role='alert'><strong>Not correct!</strong> ";
  const alert_text_end =
    ", Try again !<button type='button' class='close' onclick='input_code_field.focus();' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
  not_good_div.innerHTML = alert_text_start + err + alert_text_end;
}

// Bomb explode when player lost -> stop timer and display explosion
function boom() {
  stopCountDown();
  hide(win_div);
  hide(input_code);
  hide(not_good_div);
  //show(boom_div);
  hide(start_btn);
  hide(timerElement);
  var audio_boom = new Audio("assets/explosion.mp3");
  audio_boom.play();
  document.getElementById("back").style.backgroundImage =
    "url('assets/bigboom.jpg')";
}

// Reset everything
function reset() {
  //timer = timer_start;
  //localStorage['timer'] = timer;
  background = "black";
  hide(win_div);
  show(not_good_div);
  show(input_code);
  hide(boom_div);
  show(start_btn);
  show(timerElement);
  hide(video);
  displayTimer();
  changeBackgroundColor(background);
  input_code_field.value = "";
  triesLeft = 5;
}

function waitVideoEnd() {
  if (video.ended) {
    document.exitFullscreen().finally(() => {
      console.log("hello");
      input_code_field.focus();
      hide(video);
      document.getElementById('back').requestFullscreen();
    });
    hide(video);
    countDownTimer = setInterval(countDown, 1000 / speed);
    clearInterval(waitVideoEndTimer);
    // input_code_field.focus();
  }
}

function decreaseTriesLeft() {
  triesLeft -= 1;
  // document.getElementById('tries_left').textContent = triesLeft;
  if (triesLeft <= 0) {
    boom();
  }
}

function start() {
  document.backgroundColor = "black";
  show(video);
  video.requestFullscreen();
  video.play();
  hide(start_btn);
  input_code_field.focus();
}

// Define global variables
let timer = localStorage["timer"] ? localStorage["timer"] : timer_start;
let triesLeft;
let background;
let warningTimer;
let countDownTimer;
let waitVideoEndTimer = setInterval(waitVideoEnd, 500);

let timerElement = document.getElementById("timer");
let start_btn = document.getElementById("start_btn");
let submit_code_btn = document.getElementById("submit_code_vtn");
let input_code = document.getElementById("input_code");
let input_code_field = document.getElementById("code");
let not_good_div = document.getElementById("not_good_div");
let win_div = document.getElementById("win_div");
let boom_div = document.getElementById("boom_div");
let video = document.getElementById("video_intro");

// When click on start buton -> start timer
start_btn.addEventListener("click", (event) => {
  event.preventDefault();
  start();
});

// When click on submit buton -> check if code is correct
submit_code_btn.addEventListener("click", (event) => {
  event.preventDefault();
  let user_code = input_code_field.value;
  if (user_code == correct_code) {
    win();
  } else if (user_code.length < 4) {
    let err = "Code should be 4 digits";
    not_correct(err);
    input_code_field.focus();
  } else {
    decreaseTriesLeft();
    let err = "Wrong code, You have only <b>" + triesLeft + "</b> tries left";
    not_correct(err);
    input_code_field.focus();
  }
});

// document.getElementById('back').requestFullscreen();
reset();
// start();
