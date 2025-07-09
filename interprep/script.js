const questions = [
  {
    question: "What is Java?",
    options: ["OS", "Language", "IDE", "Database"],
    correct: 1,
    explanation: "Java is a popular programming language.",
  },
  {
    question: "What does JVM stand for?",
    options: ["Java Virtual Machine", "Java Version Manager", "Just Virtual Memory", "Java Voice Module"],
    correct: 0,
    explanation: "JVM means Java Virtual Machine.",
  },
  {
    question: "Which company developed Java?",
    options: ["Google", "Oracle", "Microsoft", "Sun Microsystems"],
    correct: 3,
    explanation: "Java was developed by Sun Microsystems.",
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

  // shuffle options
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

