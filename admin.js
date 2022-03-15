document.getElementById('correct_code').value = localStorage.getItem('correct_code');

document.getElementById('update_correct_code_btn').addEventListener('click', (event) => {
	event.preventDefault();
    if (document.getElementById('correct_code').value.length == 4) {
        localStorage.setItem('correct_code', document.getElementById('correct_code').value);
    }
});

document.getElementById('reset_btn').addEventListener('click', (event) => {
	event.preventDefault();
	localStorage.setItem('timer', 60 * 60); // 1 hour = 60 minutes = 3600 seconds
});