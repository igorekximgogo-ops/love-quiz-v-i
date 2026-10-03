const questions = [
  "Ты меня любишь? ❤️",
  "Ты скучаешь по мне? 🥺",
  "Ты хотела бы сейчас быть рядом со мной? 🫶",
  "Ты счастлива, что мы встретились? 💕",
  "Хотела бы ко мне приехать? 🥰",
];

const quiz = document.querySelector("#quiz");
const ending = document.querySelector("#ending");
const letterPage = document.querySelector("#letter-page");
const floatingHearts = document.querySelector("#floating-hearts");
const codeForm = document.querySelector("#code-form");
const codeInput = document.querySelector("#code-input");
const codeError = document.querySelector("#code-error");
const question = document.querySelector("#question");
const progress = document.querySelector("#progress");
const arena = document.querySelector("#button-arena");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
let currentQuestion = 0;

function placeButtons() {
  const arenaWidth = arena.clientWidth;
  const yesWidth = yesButton.offsetWidth;
  const noWidth = noButton.offsetWidth;
  const gap = 12;
  const groupWidth = yesWidth + gap + noWidth;
  const left = Math.max(0, (arenaWidth - groupWidth) / 2);

  yesButton.style.left = `${left}px`;
  noButton.style.left = `${Math.min(left + yesWidth + gap, arenaWidth - noWidth)}px`;
  yesButton.style.top = "32px";
  noButton.style.top = "32px";
}

function showQuestion() {
  question.textContent = questions[currentQuestion];
  progress.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
  placeButtons();
}

function moveNoButton() {
  const maxLeft = Math.max(0, arena.clientWidth - noButton.offsetWidth);
  const maxTop = Math.max(0, arena.clientHeight - noButton.offsetHeight);
  const yesRect = yesButton.getBoundingClientRect();
  const arenaRect = arena.getBoundingClientRect();
  let left = 0;
  let top = 0;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    left = Math.random() * maxLeft;
    top = Math.random() * maxTop;
    const overlapsYes =
      left < yesRect.right - arenaRect.left &&
      left + noButton.offsetWidth > yesRect.left - arenaRect.left &&
      top < yesRect.bottom - arenaRect.top &&
      top + noButton.offsetHeight > yesRect.top - arenaRect.top;

    if (!overlapsYes) break;
  }

  noButton.style.left = `${left}px`;
  noButton.style.top = `${top}px`;
}

yesButton.addEventListener("click", () => {
  currentQuestion += 1;

  if (currentQuestion === questions.length) {
    quiz.hidden = true;
    ending.hidden = false;
    floatingHearts.classList.add("is-active");
    return;
  }

  showQuestion();
});

noButton.addEventListener("click", () => {
  currentQuestion = 0;
  ending.hidden = true;
  floatingHearts.classList.remove("is-active");
  quiz.hidden = false;
  showQuestion();
});

noButton.addEventListener("pointerenter", moveNoButton);

codeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredCode = codeInput.value.trim().toLocaleLowerCase("ru-RU").replace(/\s+/g, " ");

  if (enteredCode !== "я тебя люблю") {
    codeError.hidden = false;
    codeInput.setAttribute("aria-invalid", "true");
    codeInput.focus();
    return;
  }

  codeError.hidden = true;
  ending.hidden = true;
  letterPage.hidden = false;
  floatingHearts.classList.add("is-active");
});

codeInput.addEventListener("input", () => {
  codeError.hidden = true;
  codeInput.removeAttribute("aria-invalid");
});

window.addEventListener("resize", placeButtons);

showQuestion();
