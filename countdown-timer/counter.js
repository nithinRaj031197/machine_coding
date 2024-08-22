const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");

let countdownTimer = null;

stopButton.addEventListener("click", () => {
  stopInterval("pause");
});

startButton.addEventListener("click", () => {
  if (parseInt(hour.value) === 0 && parseInt(minute.value) === 0 && parseInt(second.value) === 0) return;

  function startTimer() {
    startButton.style.display = "none";
    stopButton.style.display = "initial";

    countdownTimer = setInterval(() => {
      timer();
    }, 1000);
  }
  startTimer();
});

function timer() {
  let hours = parseInt(hour.value) || 0;
  let minutes = parseInt(minute.value) || 0;
  let seconds = parseInt(second.value) || 0;

  if (seconds > 0) {
    seconds--;
  } else if (minutes > 0) {
    minutes--;
    seconds = 59;
  } else if (hours > 0) {
    hours--;
    minutes = 59;
    seconds = 59;
  } else {
    stopInterval();
    return;
  }

  hour.value = hours.toString().padStart(2, "0");
  minute.value = minutes.toString().padStart(2, "0");
  second.value = seconds.toString().padStart(2, "0");
}

function stopInterval(currentState) {
  startButton.innerHTML = currentState === "pause" ? "Continue" : "Start";

  clearInterval(countdownTimer);
  stopButton.style.display = "none";
  startButton.style.display = "initial";
}

resetButton.addEventListener("click", function () {
  hour.value = "";
  minute.value = "";
  second.value = "";

  stopInterval();
});
