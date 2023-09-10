const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");
const milliEl = document.getElementById("milli");
const deciEl = document.getElementById("decimal");

const startContinueBtn = {
  el: document.querySelector('#startContinueBtn'),
  toggleText: function ()
  {
    isContinue ? this.el.innerText = "Continue" : this.el.innerText = "Start"
  },
  toggleBtn: function (el)
  {
    el.removeAttribute("disabled");
  }
};
const stopBtn = document.querySelector('#stopBtn');
const resetBtn = document.querySelector('#resetBtn');

let milliFormat = 0;
let millis = 0;
let secFormat = 0;
let seconds = 0;
let minFormat = 0;
let minutes = 0;
let interval;
let isContinue = false;

startContinueBtn.el.addEventListener('click', () =>
{
  interval = setInterval(startTimer, 10);
  startContinueBtn.el.setAttribute("disabled", true);
});

function startTimer()
{
  startContinueBtn.toggleText();
  startContinueBtn.toggleBtn(resetBtn);
  millis += 11;

  if (millis === 1001)
  {
    millis = 0;
    milliFormat = "00";
    seconds++;
  }

  if (seconds === 60)
  {
    seconds = 0;
    minutes++;
  }

  if (seconds < 10)
  {
    secFormat = "0" + seconds;
  } else
  {
    secFormat = seconds;
  }

  if (minutes < 10)
  {
    minFormat = "0" + minutes;
  } else
  {
    minFormat = minutes;
  }

  milliFormat = millis;
  milliFormat = Math.floor(milliFormat / 10);
  deciFormat = milliFormat % 10;

  if (milliFormat < 10)
  {
    milliFormat = "0" + milliFormat;
  }

  deciEl.innerText = deciFormat;
  milliEl.innerText = milliFormat;
  secEl.innerText = secFormat;
  minEl.innerText = minFormat;
}

stopBtn.addEventListener('click', () =>
{
  clearInterval(interval);
  checkStop();
  startContinueBtn.toggleText();
});

function checkStop()
{
  if ((millis > 0 || seconds > 0 || minutes > 0))
  {
    isContinue = true;
    startContinueBtn.toggleBtn(startContinueBtn.el);
  }
}

function resetTimer() 
{
  clearInterval(interval);
  millis = seconds = minutes = 0;
  milliEl.innerText = "00";
  secEl.innerText = "00";
  minEl.innerText = "00";
  isContinue = false;
  startContinueBtn.toggleText();
  startContinueBtn.toggleBtn(startContinueBtn.el);
}

resetBtn.addEventListener('click', () =>
{
  resetTimer();
});