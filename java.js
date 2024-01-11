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
  let currentLetter = event.target.textContent;
  if (ourAnswer.includes(currentLetter)) {
    for (let i = 0; i < ourAnswer.length; i++) {
      if (currentLetter === ourAnswer[i]) {
        let letterPoint = document.querySelectorAll(".letter")[i];
        letterPoint.textContent = currentLetter;
        //   currentWord[i] = currentLetter;
      }
    }
  } else {
    if (incorrectCount < maxCount) {
      document.querySelector(`.man-${incorrectCount}`).classList.add("active");
      incorrectCount++;
    } else {
      alert("lose");
    }
  }
  document.querySelector(
    ".guesses span",
  ).textContent = `${incorrectCount}/${maxCount}`;
  //   console.log(currentWord);
}
function createNewElements() {
  ///create elements
  const divContainer = document.createElement("div");
  const picturePart = document.createElement("div");
  const gamePart = document.createElement("div");
  //class
  divContainer.className = "container";
  picturePart.className = "picture-part";
  gamePart.className = "game-part";
  ///inner for blocks
  picturePart.innerHTML = `<img src="img/gallows.png" alt="gallows" />
        <div class="men">
          <svg
            class="man-0"
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
          <img class="man-2" src="img/hand-one.svg" alt="hand-one" />
          <img class="man-3" src="img/hand-two.svg" alt="hand-two" />
          <img class="man-1" src="img/body.png" alt="body" />
          <img class="man-4" src="img/leg-one.svg" alt="leg-one" />
          <img class="man-5" src="img/leg-two.svg" alt="leg-two" />
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
  divContainer.prepend(picturePart);
  divContainer.append(gamePart);
  randomWord();
  createAlphabet();
}
createNewElements();

////
