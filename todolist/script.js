// notification function
function notify(message) {
  alert(message);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    notify("Please enter a task.");
    return;
  }
  const table = document.getElementById("taskTable");
  const row = table.insertRow();
  // Task 
  const taskCell = row.insertCell(0);
  taskCell.textContent = taskText;
  taskCell.classList.add("task-text");
  // Remove button 
  const actionCell = row.insertCell(1);
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  removeBtn.onclick = function () {
    table.deleteRow(row.rowIndex - 0);
    notify(`Task "${taskText}" removed!`);
  };
  actionCell.appendChild(removeBtn);
  // Notify task added
  notify(`Task "${taskText}" added!`);

  taskInput.value = "";
}
// dark/light mode
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
// Loading Screen
function showLoading(message="Loading... Please wait") {
  const screen = document.getElementById("loading-screen");
  screen.querySelector("p").textContent = message;
  screen.style.display = "flex";
}
function hideLoading() {
  document.getElementById("loading-screen").style.display = "none";
}
// Detect internet connection 
window.addEventListener("offline", () => {
  showLoading("No Internet Connection!");
});
window.addEventListener("online", () => {
  

  hideLoading();
});