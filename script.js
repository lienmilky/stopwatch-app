const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let running = false;
let startTime = 0;
let elapsed = 0;
let rafId = null;
let lapCount = 0;

function format(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const cents = Math.floor((ms % 1000) / 10);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(cents).padStart(2, '0')}`;
}

function tick() {
  elapsed = Date.now() - startTime;
  display.textContent = format(elapsed);
  rafId = requestAnimationFrame(tick);
}

startStopBtn.addEventListener('click', () => {
  if (running) {
    cancelAnimationFrame(rafId);
    elapsed = Date.now() - startTime;
    running = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.background = '#4ecca3';
  } else {
    startTime = Date.now() - elapsed;
    running = true;
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.background = '#f0a500';
    tick();
  }
});

resetBtn.addEventListener('click', () => {
  cancelAnimationFrame(rafId);
  running = false;
  elapsed = 0;
  lapCount = 0;
  display.textContent = '00:00.00';
  startStopBtn.textContent = 'Start';
  startStopBtn.style.background = '#4ecca3';
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (!running) return;
  lapCount++;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${format(elapsed)}</span>`;
  lapsList.prepend(li);
});
