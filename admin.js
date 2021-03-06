document.getElementById('correct_code').value = localStorage.getItem('correct_code') ? localStorage.getItem('correct_code') : "3671";
document.getElementById('label_timer').innerText = localStorage.getItem('timer') ? localStorage.getItem('timer') + ' seconds' : "timer not set";

document.getElementById('update_correct_code_btn').addEventListener('click', (event) => {
	// event.preventDefault();
    if (document.getElementById('correct_code').value.length == 4) {
        localStorage.setItem('correct_code', document.getElementById('correct_code').value);
    }
});

document.getElementById('reset_btn').addEventListener('click', (event) => {
	// event.preventDefault();
	localStorage.setItem('timer', 60 * 60); // 1 hour = 60 minutes = 3600 seconds
});

function showPassword() {
    var x = document.getElementById("correct_code");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }