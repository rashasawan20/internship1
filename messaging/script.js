import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInAnonymously, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbNiBr4Y-xbIgRWF1Ujsj8FE4yV2UHyRI",
  authDomain: "internship-3bef0.firebaseapp.com",
  databaseURL: "https://internship-3bef0-default-rtdb.firebaseio.com",
  projectId: "internship-3bef0",
  storageBucket: "internship-3bef0.firebasestorage.app",
  messagingSenderId: "947313142549",
  appId: "1:947313142549:web:9dfb2e2912ba928626571c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Get all elements
const loginPage = document.getElementById('login-page');
const chatPage = document.getElementById('chat-page');
const loginSelection = document.querySelector('.center');
const normalLoginForm = document.getElementById('normal-login-form');
const btnNormal = document.getElementById('btn-normal');
const btnGoogle = document.getElementById('btn-google');
const btnAnon = document.getElementById('btn-anon');
const backNormal = document.getElementById('back-normal');
const emailLoginBtn = document.getElementById('email-login');
const emailRegisterBtn = document.getElementById('email-register');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const formTitle = document.getElementById('form-title');
const formSwitch = document.getElementById('form-switch');
const logoutBtn = document.getElementById('logout');
const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

let isLoginMode = true;
let currentUserInfo = null;

// Show normal login form
btnNormal.addEventListener('click', () => {
  loginSelection.classList.add('hidden');
  normalLoginForm.classList.remove('hidden');
  setFormMode(true);
});

// Back button
backNormal.addEventListener('click', () => {
  normalLoginForm.classList.add('hidden');
  loginSelection.classList.remove('hidden');
  emailInput.value = '';
  passwordInput.value = '';
});

// Switch between login and register
function setFormMode(loginMode) {
  isLoginMode = loginMode;
  if (isLoginMode) {
    formTitle.textContent = 'Login with Email';
    emailLoginBtn.style.display = 'flex';
    emailRegisterBtn.style.display = 'none';
    formSwitch.innerHTML = `Don't have an account? <a href="#" id="switch-to-register">Sign up</a>`;
  } else {
    formTitle.textContent = 'Create Account';
    emailLoginBtn.style.display = 'none';
    emailRegisterBtn.style.display = 'flex';
    formSwitch.innerHTML = `Already have an account? <a href="#" id="switch-to-register">Sign in</a>`;
  }
  
  document.getElementById('switch-to-register').addEventListener('click', (e) => {
    e.preventDefault();
    setFormMode(!isLoginMode);
  });
}

// Email login
emailLoginBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) {
    alert('Enter email and password.');
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    emailInput.value = '';
    passwordInput.value = '';
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      alert('No account found. Please create an account first.');
    } else {
      alert('Login failed: ' + error.message);
    }
  }
});

// Email registration
emailRegisterBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) {
    alert('Enter email and password.');
    return;
  }
  if (password.length < 6) {
    alert('Password should be at least 6 characters.');
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Account created successfully!');
    emailInput.value = '';
    passwordInput.value = '';
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      alert('This email is already registered. Please login instead.');
    } else {
      alert('Registration failed: ' + error.message);
    }
  }
});

// Google login - FIXED: No error when popup is closed
btnGoogle.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    // Only show error if it's NOT a popup closed by user
    if (error.code !== 'auth/popup-closed-by-user') {
      alert('Google login failed: ' + error.message);
    }
    // If user closed popup, do nothing - it's normal behavior
  }
});

// Anonymous login
btnAnon.addEventListener('click', async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    alert('Anonymous login failed: ' + error.message);
  }
});

// Logout
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    messagesDiv.innerHTML = '';
    messageInput.value = '';
    currentUserInfo = null;
  } catch (error) {
    alert('Logout failed: ' + error.message);
  }
});

// Auth state listener - SWITCH BETWEEN PAGES
onAuthStateChanged(auth, user => {
  if (user) {
    currentUserInfo = {
      displayName: user.displayName || "",
      email: user.email || "",
      uid: user.uid,
      isAnonymous: user.isAnonymous
    };
    
    console.log('User logged in:', currentUserInfo); // For debugging
    
    // HIDE login page, SHOW chat page
    loginPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
    messagesDiv.innerHTML = '';
    loadMessages();
  } else {
    // HIDE chat page, SHOW login page
    chatPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    messagesDiv.innerHTML = '';
    currentUserInfo = null;
  }
});

// Get user display name - IMPROVED
function getUserDisplayName() {
  if (!currentUserInfo) return "Unknown User";
  if (currentUserInfo.isAnonymous) return "Anonymous";
  if (currentUserInfo.displayName && currentUserInfo.displayName !== "") {
    return currentUserInfo.displayName;
  }
  if (currentUserInfo.email) {
    return currentUserInfo.email.split('@')[0];
  }
  return "User";
}

// Send message
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  if (!currentUserInfo) {
    alert("Not logged in properly.");
    return;
  }
  
  const displayName = getUserDisplayName();
  
  // Add more user info to prevent "undefined" in database
  push(ref(db, "messages"), {
    text: text,
    user: displayName,
    userId: currentUserInfo.uid,
    userEmail: currentUserInfo.email || "",
    userDisplayName: currentUserInfo.displayName || "",
    isAnonymous: currentUserInfo.isAnonymous,
    timestamp: Date.now()
  });
  messageInput.value = "";
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', e => { 
  if(e.key === "Enter") sendMessage(); 
});

// Load messages - IMPROVED to handle undefined users
function loadMessages() {
  const messagesRef = ref(db, "messages");
  onChildAdded(messagesRef, snapshot => {
    const data = snapshot.val();
    const msg = document.createElement("div");
    
    // Handle undefined user names
    let displayName = data.user;
    if (!displayName || displayName === "undefined" || displayName === "null") {
      if (data.isAnonymous) {
        displayName = "Anonymous";
      } else if (data.userEmail) {
        displayName = data.userEmail.split('@')[0];
      } else {
        displayName = "Unknown User";
      }
    }
    
    // Style based on current user
    if (currentUserInfo && data.userId === currentUserInfo.uid) {
      msg.className = "message own-message";
    } else {
      msg.className = "message other-message";
    }
    
    msg.textContent = `${displayName}: ${data.text}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// Initialize form mode
setFormMode(true);