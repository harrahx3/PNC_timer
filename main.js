function show(elmt) {
  elmt.style.display = "block";
}

function hide(elmt) {
  elmt.style.display = "none";
}

function stopCountDown() {
  clearInterval(countDownTimer);
  clearInterval(warningTimer);
}

function addNumberInInput(newNumber) {
  if (input_code_field.value < 999) {
    input_code_field.value = input_code_field.value + newNumber;
  }
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
  // 5 minutes left
  if (timer == 60 * 5) {
    warningTimer = setInterval(warning, 700);
  }
  if (timer <= 0) {
    clearInterval(warningTimer);
    boom();
  }
}

function warning() {
  background = background == "red" ? "yellow" : "red";
  document.body.style.backgroundColor = background;
}

function win() {
  stopCountDown();
  hide(input_code);
  hide(not_good_div);
  hide(boom_div);
  show(win_div);
  hide(start_btn);
}

function not_correct() {
  input_code_field.value = "";
  not_good_div.innerHTML = alert_text;
}

function boom() {
  stopCountDown();
  hide(win_div);
  hide(input_code);
  hide(not_good_div);
  show(boom_div);
  hide(start_btn);
  var audio = new Audio("assets/explosion.mp3");
  audio.play();
}

function reset() {
  timer = .5 * 60; // 60 minutes
  localStorage["timer"] = timer;
  background = "red";
  hide(win_div);
  show(not_good_div);
  show(input_code);
  hide(boom_div);
  show(start_btn);
  displayTimer();
}

let timer = localStorage["timer"]; // 60 minutes
let background;
let warningTimer;
let countDownTimer;
const correct_code = 1234;
const alert_text =
  "<div class='alert alert-warning alert-dismissible fade show' role='alert'><strong>Not correct!</strong> Wrong code, Try again !<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";

let timerElement = document.getElementById("timer");
let start_btn = document.getElementById("start_btn");
let submit_code_vtn = document.getElementById("submit_code_vtn");
let input_code = document.getElementById("input_code");
let input_code_field = document.getElementById("code");
let not_good_div = document.getElementById("not_good_div");
let win_div = document.getElementById("win_div");
let boom_div = document.getElementById("boom_div");

start_btn.addEventListener("click", (event) => {
  event.preventDefault();
  countDownTimer = setInterval(countDown, 100);
  hide(start_btn);
});

submit_code_vtn.addEventListener("click", (event) => {
  event.preventDefault();
  let user_code = input_code_field.value;
  if (user_code == correct_code) {
    win();
  } else {
    not_correct();
  }
});

reset();
