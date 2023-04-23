const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const welcomeContainer = document.getElementById("welcome-container");
const currentQuestion = document.getElementById("current-question");
const playerNameHolder = document.getElementById("playerNameHolder");
const playerNameInput = document.getElementById("playerName");
const invalidPlayerName = document.getElementById("invalid-player-name");
const scoreHolder = document.getElementById("score");
const answerState = document.getElementById("answer-state");
const congratsMessage = document.getElementById("congrats-message");
const restartGameButton = document.getElementById("restart-button");
let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  currentQuestion.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
  scoreHolder.innerText = score;
  setNextQuestion();
});

function startGame() {
  if (!playerNameInput.value) {
    playerNameInput.setAttribute("required", "");
    invalidPlayerName.classList.remove("hide");
  } else {
    startButton.classList.add("hide");
    welcomeContainer.classList.add("hide");
    playerNameHolder.innerText = playerNameInput.value;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    currentQuestion.innerText = `${currentQuestionIndex + 1}/${
      questions.length
    }`;
    scoreHolder.innerText = score;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
  }
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  answerState.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score += 1;
    scoreHolder.innerText = score;
    answerState.innerText = "Your answer is correct";
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      let sound = document.getElementById("correct-choice");
      sound.play();
    }
  } else {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      let sound = document.getElementById("wrong-choice");
      sound.play();
    }
    answerState.innerText = "Your answer is wrong!!!";
  }
  answerState.classList.remove("hide");

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    let sound = document.getElementById("congrats-sound");
    sound.play();
    congratsMessage.innerHTML = `Congrats ${playerNameInput.value}!!! You finished the game and your score is ${score} out of ${questions.length}`;
    congratsMessage.classList.remove("hide");
    restartGameButton.classList.remove("hide");
  }
}
function onRestart() {
  location.reload();
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Suppose 0.508 g of a gas occupies a volume of 0.175 L at a temperature of 25.0◦C is held at a pressure of 1.000 atm. What gas is this most likely?",
    answers: [
      { text: "Neon", correct: false },
      { text: "Chlorine", correct: true },
      { text: "Fluorine", correct: false },
      { text: "Oxygen", correct: false },
    ],
  },
  {
    question:
      "What is the pressure exerted by 0.801 mol of CO2 in a 13.0 L container at 298 K? Express your answer in atm.",
    answers: [
      { text: "2.34 atm", correct: false },
      { text: "1.15 atm", correct: false },
      { text: "2.51 atm", correct: false },
      { text: "1.51 atm ", correct: true },
    ],
  },
  {
    question:
      "What is the maximum number of electrons can a d subshell can hold?",
    answers: [
      { text: "2", correct: false },
      { text: "10", correct: true },
      { text: "6", correct: false },
      { text: "14", correct: false },
    ],
  },
  {
    question: "Which statement about the species CN–, Cl–, and CO is correct?",
    answers: [
      {
        text: `The cyanide ion is a weak field ligand, the chloride is a strong field ligand, 
and CO is a weak field ligand.`,
        correct: false,
      },
      {
        text: `The cyanide ion is a strong field ligand, the chloride is a strong field ligand, 
and CO is a weak field ligand.`,
        correct: false,
      },
      {
        text: `The cyanide ion is a weak field ligand, the chloride is a weak field ligand, 
and CO is a strong field ligand.`,
        correct: false,
      },
      {
        text: ` The cyanide ion is a strong field ligand, the chloride is a weak field ligand, 
and CO is a strong field ligand`,
        correct: true,
      },
    ],
  },
  {
    question: "Sigma-bond metathesis is common for:",
    answers: [
      {
        text: `early d-metal complexes with an insufficient number of electrons on 
the metal atom.`,
        correct: true,
      },
      {
        text: `middle d-metal complexes with an insufficient number of electrons on 
the metal atom.`,
        correct: false,
      },
      {
        text: `late d-metal complexes with an insufficient number of electrons on 
the metal atom.`,
        correct: false,
      },
      {
        text: `late d-metal complexes with a sufficient number of electrons on the metal atom.`,
        correct: false,
      },
    ],
  },
  {
    question: `A thermally isolated system contains 2 unknown liquids; 30.0 kg of Liquid 1 at 237 K 
with Cp(1) = 1.55 J/(g.K) and 70.2 kg of Liquid 2 at 358 K with Cp(2) = 3.52 J/(g.K. 
What will be the final temperature if the liquids are brought into contact?
`,
    answers: [
      { text: "257 K", correct: false },
      { text: "297 K", correct: false },
      { text: "339 K", correct: true },
      { text: "356 K", correct: false },
    ],
  },
  {
    question: "Which statement is correct?",
    answers: [
      {
        text: "The greater number of particles leads to a smaller number of microstates.",
        correct: true,
      },
      {
        text: "Dissolving an ionic compound usually leads to an increase in entropy.",
        correct: false,
      },
      {
        text: "An increase in temperature decreases all types of molecular motion.",
        correct: false,
      },
      { text: "Heating always decreases the system entropy.", correct: false },
    ],
  },
  {
    question: `Which statement is incorrect regarding statistical thermodynamics?`,
    answers: [
      {
        text: "The distribution of energies in the ensemble is very sharply peaked around <E>.",
        correct: false,
      },
      {
        text: " allows one to calculate the macroscopic properties, i.e. P, V, S, etc. directly",
        correct: false,
      },
      {
        text: `all quantum states with the same energy E are equally presented among 
the replicas in an ensemble.`,
        correct: false,
      },
      { text: "All of the above are correct.", correct: true },
    ],
  },
];
