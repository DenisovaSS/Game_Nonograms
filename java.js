const randomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  let parag = document.createElement("p");
  parag.className = "hint";
  parag.textContent = `${hint}`;
  document.getElementById("title").after(parag);
  //   <p class="hint">
  //     <b>Hint:</b> Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //     Tempore rem quas numquam
  //   </p>;

  console.log(word);
  answerWord(word);
};

function answerWord(word) {
  for (let i of word) {
    let letter = document.createElement("li");
    letter.className = "letter";
    letter.textContent = "_";
    document.querySelector(".word").append(letter);
  }
}
const createAlphabet = () => {
  let start = "a";
  let end = "z";
  for (let i = start.charCodeAt(); i <= end.charCodeAt(); i++) {
    let buttonLetter = document.createElement("button");
    buttonLetter.textContent = String.fromCharCode(i);
    document.querySelector(".keyboard").append(buttonLetter);
  }
};

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
            class="man-head"
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
          <img class="man-hand-one" src="img/hand-one.svg" alt="head" />
          <img class="man-hand-two" src="img/hand-two.svg" alt="head" />
          <img class="man-body" src="img/body.png" alt="head" />
          <img class="man-leg-one" src="img/leg-one.svg" alt="head" />
          <img class="man-leg-two" src="img/leg-two.svg" alt="head" />
        </div>`;
  gamePart.innerHTML = `<h1 id='title'>HANGMAN GAME</h1>

        
        <ul class="word">
      
        </ul>
        <p class="guesses">Incorrect guesses 0/6</p>
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
