const onlyEasy = Object.entries(easy);
const chest = new Audio("muz/chest.mp3");
const cross = new Audio("muz/cross.mp3");
const lose = new Audio("muz/lose.mp3");

const win = new Audio("muz/win.mp3");
const myKey = "bestOfTheBestPlayer_denissova";
const myKeySave = "save_denissova";
let random = Math.floor(Math.random() * onlyEasy.length);
let key = onlyEasy[random][1];
let nameGame = onlyEasy[random][0];
const allObjects = [easy, normal, hard];
let timeStart = 0;
let saveTime = 0;
let startTimer;
let firstClick = false;
let isMuted = false;
//fill active field
let answer = key;

let cell_size = 30;
function cellSize() {
  const screen = document.documentElement.clientWidth;
  // console.log(screen);
  if (screen < 1000 && answer.length > 10) {
    cell_size = 18;
  } else if (screen < 750 && answer.length === 10) {
    cell_size = 20;
  } else {
    cell_size = 30;
  }
  return cell_size;
  // console.log(screen, answer.length);
}
let levelGame =
  answer.length < 6 ? "easy" : answer.length > 12 ? "hard" : "normal";
let customerAnswer = buildField();
let showAnswer = false;
let font_size = cell_size === 18 ? 18 : cell_size === 20 ? 20 : 28;
let screen_width = answer[0].length * cell_size;
let screen_height = answer.length * cell_size;
let startGameField = cell_size * 5;
function initialThemeColor(themeName) {
  localStorage.setItem("theme_den", themeName);
  document.documentElement.className = themeName;
}
initialThemeColor("color-theme");

//create html elements
class BuildPage {
  constructor() {}
  createElement(tag, classes = "", innerText = "") {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    if (innerText) element.innerText = innerText;
    return element;
  }
  createModalMenu() {
    const modalMenu = this.createElement("div", ["modal_menu"]);
    const buttonClose = this.createElement("button", ["modal_close"]);
    const coverFirst = this.createElement("div", ["cover_first"]);
    const coverSecond = this.createElement("div", ["cover_second"]);
    const innerContainer = this.createElement("div", ["inner_container"]);
    const firstList = this.createElement("div", ["list", "first_list"]);
    //create first list
    const div1 = this.createElement("div", ["div_1"]);
    const div2 = this.createElement("div", ["div_2"]);
    const div3 = this.createElement("div", ["div_3"]);
    const themesBtn = this.createElement("button", ["themes_btn"]);
    const muzBtn = this.createElement("button", ["muz_btn"]);
    const tableBtn = this.createElement("button", ["table_btn"]);
    const randomBtn = this.createElement("button", ["random_btn"]);
    const lastGameBtn = this.createElement("button", ["lastGame_btn"]);
    const randomWrap1 = this.createElement("div", ["random_wrap"]);
    const randomWrap2 = this.createElement("div", ["random_wrap"]);
    const randomWrap3 = this.createElement("div", ["random_wrap"]);
    const randomWrap4 = this.createElement("div", ["random_wrap"]);
    const randomWrap5 = this.createElement("div", ["random_wrap"]);
    const h2First_1 = this.createElement("h2", "", "themes");
    const h2First_2 = this.createElement("h2", "", "best results");
    const h2First_3 = this.createElement("h2", "", "sound");
    const h2Last_1 = this.createElement("h2", "", "random");
    const h2Last_2 = this.createElement("h2", "", "saved game");
    //create containerList
    const containerList = this.createElement("div", ["containerList"]);
    const list1 = this.createListToContainer(easy, "easy");
    const list2 = this.createListToContainer(normal, "normal");
    const list3 = this.createListToContainer(hard, "hard");
    const list4 = this.createElement("div", ["list", "last_list"]);
    list4.append(h2Last_1, randomWrap3, h2Last_2, randomWrap4);
    randomWrap3.append(randomBtn);
    randomWrap4.append(lastGameBtn);
    randomWrap5.append(muzBtn);
    containerList.append(list1, list2, list3, list4);
    randomWrap1.append(themesBtn);
    randomWrap2.append(tableBtn);
    div1.append(h2First_1, randomWrap1);
    div2.append(h2First_2, randomWrap2);
    div3.append(h2First_3, randomWrap5);
    firstList.append(div3, div1, div2);
    coverFirst.append(coverSecond);
    coverSecond.append(innerContainer);
    innerContainer.append(firstList, containerList);
    modalMenu.append(coverFirst, buttonClose);
    return modalMenu;
  }
  createListToContainer(per, string) {
    const list = this.createElement("div", ["list"]);
    const h2_H = this.createElement("h2", "", string);
    const ul = this.createElement("ul", [`list_${string}`]);
    const span = Object.keys(per).forEach((key) => {
      const oneLi = this.createElement("span", "", key);
      const li = this.createElement("li");
      li.append(oneLi);
      ul.append(li);
    });
    list.append(h2_H, ul);
    return list;
  }
  createModalWin() {
    const modalWin = this.createElement("div", ["modal_win"]);
    const buttonClose = this.createElement("button", ["modal_close"]);
    const coverFirst = this.createElement("div", ["cover_first"]);
    const coverSecond = this.createElement("div", ["cover_second"]);
    const innerContainer = this.createElement("div", ["inner_container_win"]);
    const h3ModalWin = this.createElement(
      "h3",
      ["win_title"],
      `Great! You have solved the nonogram in 0 seconds!" `,
    );
    const imgModalWin = document.createElement("img");
    imgModalWin.className = "win_img";
    imgModalWin.src = "img/dog_smile_50.png";
    imgModalWin.alt = "dog";
    coverFirst.append(coverSecond);
    coverSecond.append(innerContainer);
    innerContainer.append(h3ModalWin, imgModalWin);
    modalWin.append(coverFirst, buttonClose);
    return modalWin;
  }
  createModalTable() {
    const modalTable = this.createElement("div", ["modal_table"]);
    const buttonClose = this.createElement("button", ["modal_close"]);
    const coverFirst = this.createElement("div", ["cover_first"]);
    const coverSecond = this.createElement("div", ["cover_second"]);
    const innerContainer = this.createElement(
      "div",
      ["inner_container_table"],
      "Best game",
    );
    const ulModalTAble = this.createElement("ul", ["best_game"]);
    coverFirst.append(coverSecond);
    coverSecond.append(innerContainer);
    innerContainer.append(ulModalTAble);
    modalTable.append(coverFirst, buttonClose);
    return modalTable;
  }
  createModals() {
    const modals = this.createElement("div", ["modals"]);
    const modalMenu = this.createModalMenu();
    const modalWin = this.createModalWin();
    const modalTable = this.createModalTable();
    modals.append(modalMenu, modalWin, modalTable);
    return modals;
  }
  createHeader() {
    const header = this.createElement("div", ["header"]);
    const timeWrapp = this.createElement("div", ["time_wrapp"]);
    const buttonsWrap = this.createElement("div", ["buttons_wrap"]);
    const headerTimer = this.createElement("div", ["header_timer"], "0:00");
    const imgHeader = document.createElement("img");
    const saveBtn = this.createElement("button", ["save_btn"], "save");
    const decisionBtn = this.createElement(
      "button",
      ["decision_btn"],
      "solution",
    );
    decisionBtn.addEventListener("click", this.showAnswer);
    const resetBtn = this.createElement("button", ["reset_btn"], "reset");
    resetBtn.addEventListener("click", this.resetGame);
    const settingsBtn = this.createElement("button", ["settings_btn"]);
    imgHeader.className = "time_img";
    imgHeader.src = "img/time.png";
    imgHeader.alt = "time";
    buttonsWrap.append(saveBtn, decisionBtn, resetBtn, settingsBtn);
    timeWrapp.append(imgHeader, headerTimer);
    header.append(timeWrapp, buttonsWrap);
    return header;
  }
  showAnswer() {
    soundMuz(lose);
    canvas2.style.display = "none";
    showAnswer = true;
    resetBtn.disabled = true;
    decisionBtn.disabled = true;
    saveBtn.disabled = true;
    clearInterval(startTimer);
  }
  resetGame() {
    // console.log(showAnswer);
    if (showAnswer) {
      canvas2.style.display = "block";
      showAnswer = false;
    }
    customerAnswer = buildField();
    // console.log(customerAnswer);
  }
  createContainer() {
    const container = this.createElement("div", ["container"]);
    const coverFirst = this.createElement("div", ["cover_first"]);
    const coverSecond = this.createElement("div", ["cover_second"]);
    const coverThree = this.createElement("div", ["cover_three"]);

    const main = this.createElement("div", ["main"]);
    const header = this.createHeader();
    const gamePart = this.createElement("div", ["game_part"]);
    gamePart.oncontextmenu = function () {
      return false;
    };
    coverFirst.append(coverSecond);
    coverSecond.append(coverThree);
    coverThree.append(header, main);
    main.append(gamePart);
    container.append(coverFirst);
    return container;
  }
  createPage() {
    const modals = this.createModals();
    const container = this.createContainer();
    document.body.append(modals, container);
  }
}
const builder = new BuildPage();
builder.createPage();

const gamePart = document.querySelector(".game_part");
const canvas = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
canvas.id = "game";
canvas2.id = "game2";
canvas.width = screen_width + startGameField;
canvas.height = screen_height + startGameField;
canvas2.width = screen_width;
canvas2.height = screen_height;
gamePart.style.width = screen_width + startGameField + "px";
gamePart.style.height = screen_height + startGameField + "px";
canvas2.style.left = startGameField + "px";
canvas2.style.top = startGameField + "px";
gamePart.append(canvas);
gamePart.append(canvas2);
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
//create active field
function buildField() {
  let field = [];
  for (let i = 0; i < answer.length; i++) {
    let line = [];
    for (let j = 0; j < answer[0].length; j++) {
      line.push(0);
    }
    field.push(line);
  }
  return field;
}
//count clues in answer
function countCluesRow(matrix) {
  let matrixClueRow = [];
  for (let i = 0; i < matrix.length; i++) {
    let countRow = [];
    let count = 0;
    for (let j = 0; j < matrix[0].length; j++) {
      // console.log(matrix[i][j]);
      if (matrix[i][j] === 1) {
        count++;
        if (j === matrix[0].length - 1) {
          countRow.push(count);
        }
      } else if (count != 0) {
        countRow.push(count);
        count = 0;
      }
    }
    matrixClueRow.push(countRow);
  }
  return matrixClueRow;
}
let matrixClueRow = countCluesRow(answer);
// console.log("matrixClueRow", matrixClueRow);
function transpose(matrix) {
  const rows = matrix.length,
    cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
}
function countCluesColumn(matrix) {
  let transMatrix = transpose(matrix);
  let matrixCluColumn = countCluesRow(transMatrix);
  for (let i = 0; i < matrixCluColumn.length; i++) {
    matrixCluColumn[i].reverse();
  }
  return matrixCluColumn;
}
let matrixClueColumn = countCluesColumn(answer);
function drawLine(startx, starty, endx, endy, color, line_width, ctx) {
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.beginPath();
  ctx.moveTo(startx, starty);
  ctx.lineTo(endx, endy);
  ctx.stroke();
}
///drow line in filed
function fillFiled() {
  //row
  for (let i = 0; i < answer.length + 6; i++) {
    drawLine(
      0,
      i * cell_size + startGameField,
      screen_width + startGameField,
      i * cell_size + startGameField,
      "#443927",
      1,
      ctx,
    );
    if (i % 5 === 0) {
      drawLine(
        0,
        i * cell_size,
        screen_width + startGameField,
        i * cell_size,
        "#15100A",
        3,
        ctx,
      );
    }
  }
  ///column
  for (let i = 0; i < answer[0].length + 6; i++) {
    drawLine(
      i * cell_size + startGameField,
      0,
      i * cell_size + startGameField,
      screen_height + startGameField,
      "#443927",
      1,
      ctx,
    );
    if (i % 5 === 0) {
      drawLine(
        i * cell_size,
        0,
        i * cell_size,
        screen_height + startGameField,
        "#15100A",
        3,
        ctx,
      );
    }
  }
}
function fillFiledActive() {
  //row
  for (let i = 0; i < customerAnswer.length; i++) {
    drawLine(0, i * cell_size, screen_width, i * cell_size, "#443927", 1, ctx2);
    if (i % 5 === 0) {
      drawLine(
        0,
        i * cell_size,
        screen_width,
        i * cell_size,
        "#15100A",
        3,
        ctx2,
      );
    }
  }
  ///column
  for (let i = 0; i < answer[0].length + 6; i++) {
    drawLine(
      i * cell_size,
      0,
      i * cell_size,
      screen_height,
      "#443927",
      1,
      ctx2,
    );
    if (i % 5 === 0) {
      drawLine(
        i * cell_size,
        0,
        i * cell_size,
        screen_height,
        "#15100A",
        3,
        ctx2,
      );
    }
  }
}
function fillText() {
  ctx.font = `${font_size}px Times New Roman`;
  ctx.textBaseline = "ideographic";
  ctx.textAlign = "right";
  ctx.fillStyle = document.documentElement.classList.contains("color-theme")
    ? "#9b643b"
    : "#171316";
  // Line hints
  for (let i = 0; i < matrixClueRow.length; i++) {
    let string = " ";
    for (let j = 0; j < matrixClueRow[i].length; j++) {
      string += matrixClueRow[i][j] + "  ";
    }
    if (string == " ") {
      string = " ";
    }
    ctx.fillText(string, startGameField, cell_size * (i + 1) + startGameField);
  }
  ctx.fillStyle = document.documentElement.classList.contains("color-theme")
    ? "#9b643b"
    : "#171316";
  ctx.textAlign = "center";

  // Column
  for (let i = 0; i < matrixClueColumn.length; i++) {
    let part = " ";
    for (let j = matrixClueColumn[i].length - 1; j >= 0; j--) {
      part = matrixClueColumn[i][j];
      if (part == " ") {
        part = 0;
      }
      ctx.fillText(
        part,
        startGameField + cell_size * i + 10,
        (cell_size - 1) * (5 - j),
      );
    }
  }
}
function fillColor(ctx, matirix, start) {
  ///fill another color
  for (let i = 0; i < matirix.length; i++) {
    for (let j = 0; j < matirix[i].length; j++) {
      if (matirix[i][j] === 1) {
        ctx.fillStyle = document.documentElement.classList.contains(
          "color-theme",
        )
          ? "#c4915e"
          : "#171316";

        ctx.fillRect(
          cell_size * j + start,
          cell_size * i + start,
          cell_size,
          cell_size,
        );
      } else if (matirix[i][j] === 2) {
        drawLine(
          cell_size * j + start,
          cell_size * i + start,
          cell_size * (j + 1) + start,
          cell_size * (i + 1) + start,
          "#76420c",
          3,
          ctx,
        );
        drawLine(
          cell_size * (j + 1) + start,
          cell_size * i + start,
          cell_size * j + start,
          cell_size * (i + 1) + start,
          "#76420c",
          3,
          ctx,
        );
      }
    }
  }
}
// console.log("matrixClueColumn", matrixClueColumn);
//drow this array-answer
function startDrow() {
  matrixClueRow = countCluesRow(answer);
  matrixClueColumn = countCluesColumn(answer);
  startGameField = cell_size * 5;
  screen_width = answer[0].length * cell_size;
  screen_height = answer.length * cell_size;
  gamePart.style.width = screen_width + startGameField + "px";
  gamePart.style.height = screen_height + startGameField + "px";
  canvas.width = screen_width + startGameField;
  canvas.height = screen_height + startGameField;
  canvas2.width = screen_width;
  canvas2.height = screen_height;
  gamePart.style.width = screen_width + startGameField + "px";
  gamePart.style.height = screen_height + startGameField + "px";
  canvas2.style.left = startGameField + "px";
  canvas2.style.top = startGameField + "px";
  buildField();
  ctx2.fillStyle = "#ffffff";
  ctx2.fillRect(0, 0, screen_width, screen_height);
  fillColor(ctx, answer, startGameField);
  fillColor(ctx2, customerAnswer, 0);
  // console.log(answer);
  fillFiled();
  fillFiledActive();
  fillText();
}

function compareMatrix() {
  for (let i = 0; i < customerAnswer.length; i++) {
    for (let j = 0; j < customerAnswer[0].length; j++) {
      const value1 = customerAnswer[i][j];
      const value2 = answer[i][j];
      if ((value1 === 0 || value1 === 2) && (value2 === 0 || value2 === 2)) {
        continue;
      }
      if (value1 !== value2) {
        return false;
      }
    }
  }
  return youWin();
}

//Events listener
const modals = document.querySelector(".modals");
const tableBtn = document.querySelector(".table_btn");
const modalMenu = document.querySelector(".modal_menu");
const settingsBtn = document.querySelector(".settings_btn");
const buttonsClose = document.querySelectorAll(".modal_close");
const modalTable = document.querySelector(".modal_table");
const randomBtn = document.querySelector(".random_btn");
const modalWin = document.querySelector(".modal_win");
const headerTimer = document.querySelector(".header_timer");
const listEasy = document.querySelector(".list_easy");
const listNormal = document.querySelector(".list_normal");
const listHard = document.querySelector(".list_hard");
const saveBtn = document.querySelector(".save_btn");
const muzBtn = document.querySelector(".muz_btn");
const decisionBtn = document.querySelector(".decision_btn");
const h3ModalWin = document.querySelector(".win_title");
const ulModalTAble = document.querySelector(".best_game");
const themesBtn = document.querySelector(".themes_btn");
const resetBtn = document.querySelector(".reset_btn");
const lastSaveGameBtn = document.querySelector(".lastGame_btn");
saveBtn.addEventListener("click", saveGame);
lastSaveGameBtn.addEventListener("click", lastSavedGame);
muzBtn.addEventListener("click", clickMuz);
themesBtn.addEventListener("click", toggletheme);

canvas2.addEventListener("mousedown", (e) => {
  // chest.load();
  if (!firstClick) {
    startTimer = setInterval(() => {
      headerTimer.textContent = getTime(timeStart);
    }, 700);
    firstClick = true;
  }
  let col = Math.floor(e.offsetX / cell_size);
  let row = Math.floor(e.offsetY / cell_size);
  switch (e.buttons) {
    case 1:
      soundMuz(chest);
      clickLeft(row, col);

      break;
    case 2:
      soundMuz(cross);
      clickRight(row, col);
      break;
    default:
      soundMuz(chest);
      clickLeft(row, col);
  }
});
listEasy.addEventListener("click", function (e) {
  clickEasy(e, easy);
});
listNormal.addEventListener("click", function (e) {
  clickEasy(e, normal);
});
listHard.addEventListener("click", function (e) {
  clickEasy(e, hard);
});
settingsBtn.addEventListener("click", clickSetting);
buttonsClose.forEach((button) => {
  button.addEventListener("click", clickClose);
});
tableBtn.addEventListener("click", clickBestGAme);
randomBtn.addEventListener("click", startNewRandomGAme);
function toggletheme() {
  if (localStorage.getItem("theme_den") == "dark-theme") {
    initialThemeColor("color-theme");
  } else {
    initialThemeColor("dark-theme");
  }
}
//isMuted
function clickMuz() {
  if (isMuted) {
    cross.volume = 1;
    win.volume = 1;
    lose.volume = 1;
    chest.volume = 1;
    muzBtn.style.cssText =
      " background-image: url(img/so.png);  border: 4px solid var(--dark-brawn);";
  } else {
    cross.volume = 0;
    win.volume = 0;
    lose.volume = 0;
    chest.volume = 0;
    muzBtn.style.cssText =
      " background-image: url(img/so_m.png);  border: 4px solid var(--ligth-brawn);";
  }
  isMuted = !isMuted;
}
function soundMuz(truck) {
  truck.currentTime = 0;
  truck.play();
}
function youWin() {
  soundMuz(win);
  endGame();
  h3ModalWin.textContent = `Great! You have solved the nonogram in ${saveTime} seconds!" `;
  infoAboutWinGAme();
  finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
  modalTableInner(finalArray);
  canvas2.style.display = "none";
  showAnswer = true;
  resetBtn.disabled = true;
  decisionBtn.disabled = true;
  saveBtn.disabled = true;
  modals.classList.add("active");
  modalWin.classList.add("active");
}
function infoAboutWinGAme() {
  levelGame =
    answer.length < 6 ? "easy" : answer.length > 12 ? "hard" : "normal";
  let hight = JSON.parse(localStorage.getItem(myKey)) || [];
  if (hight.length > 4) {
    hight = hight.slice(1, 5);
  }
  hight.push({ nameGame, levelGame, saveTime });
  // localStorage.setItem(myKey, JSON.stringify(hight));
  localStorage.setItem(myKey, JSON.stringify(hight));
}

function modalTableInner(array) {
  ulModalTAble.innerHTML = "";
  array.sort((a, b) => (a.saveTime > b.saveTime ? 1 : -1));
  array.forEach((oneObJ) => {
    const time = getTime(oneObJ.saveTime);
    const list = `
          <li class = "bestOfYheBest"> " <b>${oneObJ.nameGame}</b>" - level <b>${oneObJ.levelGame}</b> in <b>${time}</b> sec</li>
  `;
    ulModalTAble.insertAdjacentHTML("beforeend", list);
  });
}
function clickLeft(row, col) {
  if (customerAnswer[row][col] !== 1) {
    customerAnswer[row][col] = 1;
  } else {
    customerAnswer[row][col] = 0;
  }
  compareMatrix();
}
function clickRight(row, col) {
  if (customerAnswer[row][col] !== 2) {
    customerAnswer[row][col] = 2;
  } else {
    customerAnswer[row][col] = 0;
  }
  compareMatrix();
}
function startNewRandomGAme() {
  endGame();
  let ramdomObj = randomObject();
  answer = ramdomObj.values;
  nameGame = ramdomObj.key;
  customerAnswer = buildField();
  startGame();
  clickClose();
}
function clickEasy(e, object) {
  endGame();
  whichAnswer(e, object);
  customerAnswer = buildField();
  startGame();
  clickClose();
}
function whichAnswer(e, object) {
  const cyrrentObjFirstKey = Object.keys(object)[0];
  // console.log(cyrrentObjFirstKey);
  let keyTarget = null;
  if (e.target.tagName === "SPAN") {
    keyTarget = e.target.innerText;
  } else {
    const spanElement = e.target.querySelector("span");
    if (spanElement) {
      keyTarget = spanElement.innerText;
    }
  }
  if (keyTarget) {
    nameGame = keyTarget;
    return (answer = object[keyTarget]);
  } else {
    nameGame = cyrrentObjFirstKey;
    return (answer = object[cyrrentObjFirstKey]);
  }
}
function randomObject() {
  const selectedObject =
    allObjects[Math.floor(Math.random() * allObjects.length)];
  const objectKeys = Object.keys(selectedObject);
  const selectedKey = objectKeys[Math.floor(Math.random() * objectKeys.length)];
  // return selectedObject[selectedKey];
  return {
    key: selectedKey,
    values: selectedObject[selectedKey],
  };
}

function clickBestGAme() {
  closeAllModals();
  modalTable.classList.add("active");
}
function clickSetting() {
  modals.classList.add("active");
  modalMenu.classList.add("active");
}
function closeAllModals() {
  let modelChildern = modals.children;
  for (const child of modelChildern) {
    if (child.classList.contains("active")) {
      child.classList.remove("active");
    }
  }
}
function clickClose() {
  modals.classList.remove("active");
  closeAllModals();
}

function startGame() {
  if (game) {
    clearInterval(game);
  }
  if (showAnswer) {
    canvas2.style.display = "block";
    showAnswer = false;
  }
  resetBtn.disabled = false;
  decisionBtn.disabled = false;
  saveBtn.disabled = false;
  firstClick = false;
  cell_size = cellSize();
  font_size = cell_size === 18 ? 18 : cell_size === 20 ? 20 : 28;

  game = setInterval(startDrow, 300);
}
function endGame() {
  ctx.fillStyle = "#c7c9c6";
  ctx.fillRect(startGameField, startGameField, screen_width, screen_height);
  clearInterval(startTimer);
  saveTime = timeStart;
  timeStart = 0;
  headerTimer.textContent = "0:00";
}
let game = setInterval(startDrow, 300);

function getTime(num) {
  let seconds = parseInt(num);
  let minutes = Math.floor(seconds / 60);
  timeStart++;
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}
let finalArray = JSON.parse(localStorage.getItem(myKey)) || [];
modalTableInner(finalArray);
function saveGame() {
  let infoSave = [nameGame, answer, customerAnswer, timeStart];
  localStorage.setItem(myKeySave, JSON.stringify(infoSave));
}
function lastSavedGame() {
  let arraySave = JSON.parse(localStorage.getItem(myKeySave));
  if (arraySave) {
    endGame();
    answer = arraySave[1];
    nameGame = arraySave[0];
    customerAnswer = arraySave[2];
    timeStart = arraySave[3];
    headerTimer.textContent = getTime(timeStart);
    // console.log(ramdomObj);
    startGame();
    clickClose();
  }
}
