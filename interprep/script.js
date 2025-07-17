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
    {
      question: "What is JVM?",
      options: ["Java Virtual Machine", "Java Module", "VM Java", "Java Managed"],
      correct: 0,
      explanation: "JVM executes Java bytecode."
    },
    {
      question: "Default file extension for Java?",
      options: [".jav", ".js", ".class", ".java"],
      correct: 3,
      explanation: ".java is source file."
    },
    {
      question: "What is the main concept of Object-Oriented Programming?",
      options: ["Encapsulation", "Abstraction", "Inheritance", "All of the above"],
      correct: 3,
      explanation: "OOP is based on all these concepts."
    },
    {
      question: "Which access modifier makes a method accessible only within the same class?",
      options: ["public", "protected", "private", "default"],
      correct: 2,
      explanation: "'private' limits access to within the class."
    },
    {
      question: "Which of these is NOT a Java primitive type?",
      options: ["int", "boolean", "String", "char"],
      correct: 2,
      explanation: "'String' is a class, not a primitive type."
    },
    {
      question: "What does the 'static' keyword mean in Java?",
      options: [
        "It allows method overloading",
        "It means the method belongs to the class, not instances",
        "It means the method can’t be inherited",
        "It’s used for security"
      ],
      correct: 1,
      explanation: "'static' means class-level member."
    },
    {
      question: "What is polymorphism in Java?",
      options: [
        "Using a single function name to perform different tasks",
        "Restricting access to certain data",
        "Running code at compile time",
        "Creating objects"
      ],
      correct: 0,
      explanation: "Polymorphism allows one interface, many forms."
    },
    {
      question: "What is the purpose of a constructor?",
      options: [
        "To destroy an object",
        "To initialize a new object",
        "To convert objects",
        "To define inheritance"
      ],
      correct: 1,
      explanation: "Constructors initialize new objects."
    },
    {
      question: "What is the purpose of the 'final' keyword in Java?",
      options: [
        "To allow overriding methods",
        "To create anonymous classes",
        "To prevent modification",
        "To enable recursion"
      ],
      correct: 2,
      explanation: "'final' prevents changes to variable, method, or class."
    },
    {
      question: "Which interface provides abstraction for the Collection in Java?",
      options: ["ArrayList", "List", "Map", "Set"],
      correct: 1,
      explanation: "'List' is an interface in the Collection framework."
    },
    {
      question: "How do you handle exceptions in Java?",
      options: ["if-else", "try-catch", "switch", "throw-catch"],
      correct: 1,
      explanation: "Exceptions are handled using try-catch."
    },
    {
      question: "What is the use of the 'super' keyword?",
      options: [
        "To create an instance of the parent class",
        "To call a method of the parent class",
        "To override a method",
        "To implement an interface"
      ],
      correct: 1,
      explanation: "'super' is used to access superclass methods/constructors."
    },
    {
      question: "Which keyword is used to inherit a class?",
      options: ["implements", "inherits", "extends", "super"],
      correct: 2,
      explanation: "'extends' is used for class inheritance."
    },
    {
      question: "What is method overloading?",
      options: [
        "Same method name, different return types",
        "Same method name, same parameters",
        "Same method name, different parameters",
        "Multiple constructors"
      ],
      correct: 2,
      explanation: "Overloading means same method name with different parameters."
    }
  ],

  spring: [
    {
      question: "Spring Boot default port?",
      options: ["3000", "8000", "8080", "5000"],
      correct: 2,
      explanation: "Default is 8080."
    },
    {
      question: "Spring Initializr generates?",
      options: ["pom.xml", "config.json", "Dockerfile", "Makefile"],
      correct: 0,
      explanation: "Spring Initializr generates Maven POM."
    },
    {
      question: "Which annotation is used to create a REST controller in Spring Boot?",
      options: ["@Controller", "@RestController", "@Service", "@Autowired"],
      correct: 1,
      explanation: "@RestController combines @Controller and @ResponseBody."
    },
    {
      question: "Which of these is used to auto-wire dependencies in Spring Boot?",
      options: ["@Component", "@Autowired", "@Bean", "@Qualifier"],
      correct: 1,
      explanation: "@Autowired injects dependencies automatically."
    },
    {
      question: "What is the default scope of Spring Beans?",
      options: ["Prototype", "Request", "Singleton", "Session"],
      correct: 2,
      explanation: "Spring Beans are singleton by default."
    },
    {
      question: "Which annotation is used to define a method that runs after bean initialization?",
      options: ["@PostLoad", "@PostConstruct", "@AfterInit", "@AfterLoad"],
      correct: 1,
      explanation: "@PostConstruct runs after dependency injection."
    },
    {
      question: "What does JPA stand for?",
      options: [
        "Java Programming API",
        "Java Persistence API",
        "Java Plugin Adapter",
        "Java Platform Access"
      ],
      correct: 1,
      explanation: "JPA = Java Persistence API."
    },
    {
      question: "Which annotation maps a Spring Boot method to HTTP GET?",
      options: ["@PostMapping", "@RequestMapping", "@GetMapping", "@Mapping"],
      correct: 2,
      explanation: "@GetMapping handles HTTP GET requests."
    },
    {
      question: "Which layer in Spring Boot is responsible for database communication?",
      options: ["Controller", "Service", "Repository", "DTO"],
      correct: 2,
      explanation: "Repository layer handles DB communication."
    },
    {
      question: "Which of the following is a design pattern used in Spring for dependency injection?",
      options: ["Builder Pattern", "Factory Pattern", "Singleton Pattern", "Inversion of Control (IoC)"],
      correct: 3,
      explanation: "IoC is the core concept of Spring DI."
    }
  ],

  oop: [
    {
      question: "Polymorphism means?",
      options: ["Many forms", "One form", "Encapsulation", "Inheritance"],
      correct: 0,
      explanation: "Polymorphism = many forms of same interface."
    },
    {
      question: "Encapsulation protects?",
      options: ["Data", "Classes", "Methods", "Objects"],
      correct: 0,
      explanation: "Encapsulation = protect data."
    },
    {
      question: "What is the main concept of Object-Oriented Programming?",
      options: ["Encapsulation", "Abstraction", "Inheritance", "All of the above"],
      correct: 3,
      explanation: "OOP is based on all these concepts."
    }
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

