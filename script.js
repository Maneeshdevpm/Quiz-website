const allQuestions = {
  General: [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" }
  ],
  Math: [
    { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "What is 12 x 2?", options: ["22", "24", "26", "28"], answer: "24" }
  ],
  Science: [
    { question: "Water boils at what temperature?", options: ["90°C", "80°C", "100°C", "120°C"], answer: "100°C" },
    { question: "H2O is the formula of?", options: ["Oxygen", "Water", "Hydrogen", "Salt"], answer: "Water" }
  ]
};

let questions = [], current = 0, score = 0, time = 0, timer;
const quizBox = document.querySelector(".quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

document.getElementById("start-btn").onclick = () => {
  const category = document.getElementById("category-select").value;
  if (!category) return alert("Please select a category");
  questions = [...allQuestions[category]].sort(() => 0.5 - Math.random());
  current = 0;
  score = 0;
  time = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  startTimer();
  showQuestion();
};

document.getElementById("theme-toggle").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.checked);
});

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    timerEl.textContent = `Time: ${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
  }, 1000);
}

function showQuestion() {
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";
  const q = questions[current];
  questionEl.textContent = q.question;
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(btn, correct) {
  const allBtns = optionsEl.querySelectorAll("button");
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add("correct");
    if (b !== btn && b.textContent !== correct) b.classList.add("wrong");
  });

  if (btn.textContent === correct) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
    btn.classList.add("wrong");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) showQuestion();
  else finishQuiz();
};

function finishQuiz() {
  clearInterval(timer);
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} out of ${questions.length} in ${Math.floor(time / 60)} min ${time % 60} sec.`;
}