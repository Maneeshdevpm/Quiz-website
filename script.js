const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Leo Tolstoy", "William Shakespeare", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    question: "What is 10 + 5?",
    options: ["12", "15", "14", "13"],
    answer: "15"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let time = 0;
let timerInterval;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    let minutes = String(Math.floor(time / 60)).padStart(2, '0');
    let seconds = String(time % 60).padStart(2, '0');
    timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
  }, 1000);
}

function startQuiz() {
  questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  time = 0;
  startTimer();
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestionIndex];
  questionElement.textContent = current.question;
  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, current.answer));
    optionsElement.appendChild(btn);
  });
}

function resetState() {
  nextButton.style.display = "none";
  optionsElement.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === button) {
      btn.classList.add("wrong");
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length} in ${Math.floor(time / 60)} min ${time % 60} sec.`;
}

startQuiz();