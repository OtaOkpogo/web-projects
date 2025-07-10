const questions = [
  {
    question: "Which of the following is not a principle of OOP?",
    options: ["Encapsulation", "Abstraction", "Compilation", "Polymorphism"],
    correct: 2,
    explanation: "'Compilation' is not a principle of Object-Oriented Programming.",
  },
  {
    question: "What is encapsulation in Java?",
    options: [
      "Wrapping data and methods into a single unit",
      "Hiding implementation and showing functionality",
      "Using multiple classes",
      "Separating logic into modules"
    ],
    correct: 0,
    explanation: "Encapsulation means wrapping data (variables) and code (methods) together into a single unit, typically a class.",
  },
  {
    question: "Which keyword is used for inheritance in Java?",
    options: ["this", "super", "extends", "implements"],
    correct: 2,
    explanation: "The 'extends' keyword is used to inherit from a class.",
  },
  {
    question: "What is polymorphism in Java?",
    options: [
      "Ability of a method to take multiple forms",
      "Ability to inherit multiple classes",
      "Using multiple interfaces",
      "Hiding data from access"
    ],
    correct: 0,
    explanation: "Polymorphism allows methods to behave differently based on the object that is calling them.",
  },
  {
    question: "Which annotation is used to mark a Spring Boot application entry point?",
    options: ["@SpringBoot", "@EnableAutoConfiguration", "@SpringApplication", "@SpringBootApplication"],
    correct: 3,
    explanation: "'@SpringBootApplication' is a combination of @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
  },
  {
    question: "Which Spring annotation is used to define a REST controller?",
    options: ["@Service", "@Component", "@RestController", "@Repository"],
    correct: 2,
    explanation: "'@RestController' combines @Controller and @ResponseBody to create RESTful endpoints.",
  },
  {
    question: "Which file is commonly used for Spring Boot application configuration?",
    options: ["application.conf", "config.xml", "application.properties", "settings.ini"],
    correct: 2,
    explanation: "'application.properties' (or application.yml) is used for configuring Spring Boot apps.",
  },
  {
    question: "What is the default port Spring Boot runs on?",
    options: ["3000", "80", "8080", "9090"],
    correct: 2,
    explanation: "Spring Boot runs on port 8080 by default unless specified otherwise.",
  },
  {
    question: "Which annotation is used to inject a dependency in Spring?",
    options: ["@Autowired", "@Injectable", "@Inject", "@Dependency"],
    correct: 0,
    explanation: "'@Autowired' is used by Spring to inject dependencies automatically.",
  },
  {
    question: "What is the role of the `main()` method in Spring Boot?",
    options: [
      "To configure routes",
      "To start the embedded server and run the app",
      "To generate models",
      "To connect to database"
    ],
    correct: 1,
    explanation: "The 'main()' method starts the embedded Tomcat server and launches the Spring application context.",
  }
];

let currentIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const highScoreText = document.getElementById("highScore");
const progress = document.getElementById("progress");

function showQuestion() {
  const current = questions[currentIndex];
  questionText.textContent = current.question;
  feedback.textContent = "";
  nextButton.style.display = "none";

  progress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  highScoreText.textContent = `High Score: ${highScore}`;

  optionsDiv.innerHTML = "";

  const shuffledIndexes = [0, 1, 2, 3].sort(() => 0.5 - Math.random());

  shuffledIndexes.forEach((i) => {
    const btn = document.createElement("button");
    btn.textContent = current.options[i];
    btn.onclick = () => checkAnswer(i, btn, current.correct);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, button, correctIndex) {
  const allButtons = optionsDiv.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    feedback.textContent = "âœ… Correct!";
    score++;
  } else {
    button.classList.add("incorrect");
    allButtons[correctIndex].classList.add("correct");
    feedback.textContent = "âŒ Incorrect. " + questions[currentIndex].explanation;
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

restartButton.onclick = () => {
  score = 0;
  currentIndex = 0;
  restartButton.style.display = "none";
  showQuestion();
};

function showResult() {
  questionText.textContent = `í¾‰ Quiz Complete! Score: ${score}/${questions.length}`;
  feedback.textContent = "";
  optionsDiv.innerHTML = "";
  progress.textContent = "";

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScore = score;
    highScoreText.textContent = `High Score: ${highScore}`;
  }

  nextButton.style.display = "none";
  restartButton.style.display = "block";
}

showQuestion();

