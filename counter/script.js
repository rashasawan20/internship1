let openBtn = document.getElementById("openPopup");
let closeBtn = document.getElementById("closePopup");
let popupBg = document.getElementById("popupBackground");
let addBtn = document.getElementById("addBtn");
let counterSpan = document.getElementById("counter");

let counter = 0;

// Show popup
openBtn.onclick = function() {
  popupBg.classList.add("show");
};

// Hide popup
function closePopup() {
  popupBg.classList.remove("show");
}

closeBtn.onclick = closePopup;

// Click outside closes popup
popupBg.onclick = function(e) {
  if (e.target === popupBg) {
    closePopup();
  }
};

// Simple debounce function (waits 1 sec before next click allowed)
function debounce(func, delay) {
  let timeout = false;
  return function() {
    if (!timeout) {
      func();
      timeout = true;
      setTimeout(() => timeout = false, delay);
    }
  }
}

// Function to increase counter
function increaseCounter() {
  counter++;
  counterSpan.textContent = counter;
}

// Apply debounce (1 second)
addBtn.onclick = debounce(increaseCounter, 1000);
