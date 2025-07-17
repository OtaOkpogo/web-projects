import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const categorySelect = document.getElementById("categorySelect");
const questionEl = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next");
const result = document.getElementById("result");
const usernameDisplay = document.getElementById("username-display");
const timerDisplay = document.getElementById("timer");

let username = "";
let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

const allQuestions = {
  java: [
    { question: "What is JVM?", options: ["Java Virtual Machine", "Java Module", "VM Java", "Java Managed"], correct: 0, explanation: "JVM executes Java bytecode." },
    { question: "Default file extension for Java?", options: [".jav", ".js", ".class", ".java"], correct: 3, explanation: ".java is source file." }
  ],
  spring: [
    { question: "Spring Boot default port?", options: ["3000", "8000", "8080", "5000"], correct: 2, explanation: "Default is 8080." },
    { question: "Spring Initializr generates?", options: ["pom.xml", "config.json", "Dockerfile", "Makefile"], correct: 0, explanation: "Maven POM file." }
  ],
  oop: [
    { question: "Polymorphism means?", options: ["Many forms", "One form", "Encapsulation", "Inheritance"], correct: 0, explanation: "Many behaviors from same object." },
    { question: "Encapsulation protects?", options: ["Data", "Classes", "Methods", "Objects"], correct: 0, explanation: "Encapsulation = protect data." }
  ]
};

registerBtn.onclick = async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Registration successful. Now login.");
  } catch (err) {
    alert("Register error: " + err.message);
  }
};

loginBtn.onclick = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    username = userCredential.user.email;
    usernameDisplay.textContent = username;
    questions = allQuestions[categorySelect.value];
    loginContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

function showQuestion() {
  clearInterval(timer);
  timeLeft = 20;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoFailQuestion();
    }
  }, 1000);

  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsDiv.innerHTML = "";
  feedback.textContent = "";
  nextButton.style.display = "none";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function updateTimer() {
  timerDisplay.textContent = `⏳ ${timeLeft}s`;
}

function autoFailQuestion() {
  feedback.textContent = "⏱️ Time's up!";
  markCorrectAnswer();
  nextButton.style.display = "block";
}

function checkAnswer(index) {
  const q = questions[currentIndex];
  const allBtns = optionsDiv.querySelectorAll("button");
  allBtns.forEach(btn => btn.disabled = true);

  if (index === q.correct) {
    feedback.textContent = "✅ Correct! " + q.explanation;
    allBtns[index].classList.add("correct");
    score++;
  } else {
    feedback.textContent = "❌ Wrong. " + q.explanation;
    allBtns[index].classList.add("wrong");
    allBtns[q.correct].classList.add("correct");
  }

  nextButton.style.display = "block";
}

nextButton.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

async function showResult() {
  clearInterval(timer);
  quizContainer.innerHTML = `<h2>Quiz Complete</h2><p>Your Score: ${score}/${questions.length}</p>`;
  await setDoc(doc(db, "scores", username), {
    username,
    score,
    timestamp: new Date()
  });
}

