// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbNiBr4Y-xbIgRWF1Ujsj8FE4yV2UHyRI",
  authDomain: "internship-3bef0.firebaseapp.com",
  databaseURL: "https://internship-3bef0-default-rtdb.firebaseio.com/",
  databaseURL: "https://internship-3bef0-default-rtdb.firebaseio.com/", // ✅ Add this line manually
  projectId: "internship-3bef0",
  storageBucket: "internship-3bef0.firebasestorage.app",
  messagingSenderId: "947313142549",
  appId: "1:947313142549:web:9dfb2e2912ba928626571c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const nameSection = document.getElementById("name-section");
const chatSection = document.getElementById("chat-section");
const startChatBtn = document.getElementById("startChat");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessage");
const messagesDiv = document.getElementById("messages");

let username = "";

// When user enters name
startChatBtn.addEventListener("click", () => {
  username = nameInput.value.trim();
  if (username === "") {
    alert("Please enter your name!");
    return;
  }
  nameSection.classList.add("hidden");
  chatSection.classList.remove("hidden");
});

// Send message to Firebase
sendMessageBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message === "") return;

  const messagesRef = ref(db, "messages");
  push(messagesRef, {
    name: username,
    text: message,
    time: new Date().toLocaleTimeString()
  });

  messageInput.value = "";
});

// Display messages in real-time
const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.innerHTML = `<strong>${msg.name}:</strong> ${msg.text}`;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto scroll
});
