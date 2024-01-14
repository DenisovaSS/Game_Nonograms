let ourAnswer;
let currentWord = [];
let incorrectCount = 0;
const maxCount = 6;

const randomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  let parag = document.createElement("p");
  parag.className = "hint";
  parag.textContent = `${hint}`;
  document.getElementById("title").after(parag);
  ourAnswer = word;
  console.log(word);
  answerWord(word);
};

function answerWord(word) {
  for (let i of word) {
    let letter = document.createElement("li");
    letter.className = "letter";
    letter.textContent = "_";
    document.querySelector(".word").append(letter);
    // currentWord.push("_");
  }
}
const createAlphabet = () => {
  let start = "a";
  let end = "z";
  for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
    let buttonLetter = document.createElement("button");
    buttonLetter.textContent = String.fromCharCode(i);
    document.querySelector(".keyboard").append(buttonLetter);
    buttonLetter.addEventListener("click", activeBtnL);
  }
};

function activeBtnL(event) {
  event.target.classList.add("press");
  event.target.style.pointerEvents = "none";
  event.target.disabled = true;
  let currentLetter = event.target.textContent;
  // console.log(event.target.textContent);
  updateGame(currentLetter);
}
function updateGame(currentLetter) {
  if (ourAnswer.includes(currentLetter)) {
    for (let i = 0; i < ourAnswer.length; i++) {
      if (currentLetter === ourAnswer[i]) {
        let letterPoint = document.querySelectorAll(".letter")[i];
        letterPoint.textContent = currentLetter;
        currentWord.push(currentLetter);
        //   currentWord[i] = currentLetter;
      }
      if (ourAnswer.length === currentWord.length) {
        gameOver(false);
      }
    }
  } else {
    if (incorrectCount === maxCount) {
      gameOver(true);
    } else {
      document.querySelector(`.man-${incorrectCount}`).classList.add("active");
      // console.log(incorrectCount);
      incorrectCount++;
      document.querySelector(
        ".guesses span",
      ).textContent = `${incorrectCount}/${maxCount}`;
      //   console.log(currentWord);
    }
  }
}
function gameOver(isLose) {
  const modals = document.querySelector(".modals");
  modals.classList.add("active");
  const divModalLose = document.createElement("div");
  const pModalTitle = document.createElement("p");
  const imgFamily = document.createElement("img");
  const pModalAnswer = document.createElement("p");
  const modalBtn = document.createElement("button");
  //class and inner
  divModalLose.className = "modal-pop";
  divModalLose.style.background = isLose
    ? "url(img/blood.jpg) center / cover no-repeat"
    : "url(img/congra.jpg) center / cover no-repeat";
  pModalTitle.className = "modal-title";
  imgFamily.className = isLose ? "family" : "family-win";
  pModalAnswer.className = "modal-answer";
  modalBtn.className = isLose ? "modal-btn" : "modal-btn-next";
  imgFamily.src = isLose ? "img/man-lost.png" : "img/WinFamilypngL.png";
  imgFamily.alt = "family";
  pModalTitle.textContent = isLose
    ? "You killed him!"
    : "Thanks for saving him!";
  pModalAnswer.textContent = isLose ? `${ourAnswer}` : "You win!";
  modalBtn.textContent = isLose ? "Try again" : "Next";
  // appending
  modals.append(divModalLose);
  divModalLose.append(pModalTitle);
  divModalLose.append(imgFamily);
  divModalLose.append(pModalAnswer);
  divModalLose.append(modalBtn);
  modalBtn.addEventListener("click", startAgain);
}
function startAgain() {
  ourAnswer = "";
  currentWord = [];
  incorrectCount = 0;
  const modals = document.querySelector(".modals");
  modals.classList.remove("active");
  document.querySelector(".modal-pop").remove();
  let men = document.querySelectorAll(`.man`);
  men.forEach((man) => {
    man.classList.remove("active");
  });
  let beforeWord = document.querySelectorAll(".letter");
  beforeWord.forEach((lett) => {
    lett.remove();
  });
  let buttonLetterLs = document.querySelectorAll("button");
  buttonLetterLs.forEach((element) => {
    element.classList.remove("press");
    element.style.pointerEvents = "auto";
    element.disabled = false;
  });
  document.querySelector(".hint").remove();
  document.querySelector(
    ".guesses span",
  ).textContent = `${incorrectCount}/${maxCount}`;
  randomWord();
}
function createNewElements() {
  ///create elements
  const divContainer = document.createElement("div");
  const picturePart = document.createElement("div");
  const gamePart = document.createElement("div");
  const divModals = document.createElement("div");
  //class
  divModals.className = "modals";
  divContainer.className = "container";
  picturePart.className = "picture-part";
  gamePart.className = "game-part";
  ///inner for blocks
  picturePart.innerHTML = `<img class="gallow" src="img/gallows.png" alt="gallows" />
        <div class="men">
          <svg
            class="man man-0"
            xmlns="http://www.w3.org/2000/svg"
            width="101"
            height="101"
            viewBox="0 0 101 101"
            fill="none">
            <circle
              cx="50.5"
              cy="50.5"
              r="40"
              fill="rgba(144, 144, 144, 1)"
              stroke="#909090"
              stroke-width="5" />
          </svg>
          <img class="man man-2" src="img/hand-one.svg" alt="hand-one" />
          <img class="man man-3" src="img/hand-two.svg" alt="hand-two" />
          <img class="man man-1" src="img/body.png" alt="body" />
          <img class="man man-4" src="img/leg-one.svg" alt="leg-one" />
          <img class="man man-5" src="img/leg-two.svg" alt="leg-two" />
        </div>`;
  gamePart.innerHTML = `<h1 id='title'>HANGMAN GAME</h1>
        <ul class="word">
        </ul>
        <p class="guesses">Incorrect guesses <span>0/6</span> </p>
        <div class="keyboard">
        </div>
      </div>`;
  //Each elements, needs appending

  document.body.prepend(divContainer);
  document.body.prepend(divModals);
  divContainer.prepend(picturePart);
  divContainer.append(gamePart);
  randomWord();
  createAlphabet();
}
createNewElements();
document.addEventListener("keydown", activeBtnLKey);
function activeBtnLKey(event) {
  let buttonLetterLs = document.querySelectorAll("button");
  buttonLetterLs.forEach((element) => {
    if (
      element.innerText === event.key.toUpperCase() &&
      !element.classList.contains("press")
    ) {
      element.classList.add("press");
      element.style.pointerEvents = "none";
      element.disabled = true;
      updateGame(event.key);
    }
  });
}
//
