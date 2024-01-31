const answer = hard.Iny;

// let customerAnswer = buildField();
// console.log(customerAnswer);
let cell_size = 30;
let font_size = cell_size === 20 ? 20 : 28;
let screen_width = answer[0].length * cell_size;
let screen_height = answer.length * cell_size;
const startGameField = cell_size * 5;
//create elements
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
    const coverFirst = this.createElement("div", ["cover_first"]);
    const coverSecond = this.createElement("div", ["cover_second"]);
    const innerContainer = this.createElement("div", ["inner_container"]);
    const firstList = this.createElement("div", ["list", "first_list"]);
    //create first list
    const div1 = this.createElement("div", ["div_1"]);
    const div2 = this.createElement("div", ["div_2"]);
    const themesBtn = this.createElement("button", ["themes_btn"]);
    const tableBtn = this.createElement("button", ["table_btn"]);
    const randomBtn = this.createElement("button", ["random_btn"]);
    const lastGameBtn = this.createElement("button", ["lastGame_btn"]);
    const randomWrap1 = this.createElement("div", ["random_wrap"]);
    const randomWrap2 = this.createElement("div", ["random_wrap"]);
    const randomWrap3 = this.createElement("div", ["random_wrap"]);
    const randomWrap4 = this.createElement("div", ["random_wrap"]);
    const h2First_1 = this.createElement("h2", "", "themes");
    const h2First_2 = this.createElement("h2", "", "best results");
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
    //
    containerList.append(list1, list2, list3, list4);
    randomWrap1.append(themesBtn);
    randomWrap2.append(tableBtn);
    div1.append(h2First_1, randomWrap1);
    div2.append(h2First_2, randomWrap2);
    firstList.append(div1, div2);
    //
    coverFirst.append(coverSecond);
    coverSecond.append(innerContainer);
    innerContainer.append(firstList, containerList);

    modalMenu.append(coverFirst);
    return modalMenu;
  }
  createListToContainer(per, string) {
    const list = this.createElement("div", ["list"]);
    const h2_H = this.createElement("h2", "", string);
    const ul = this.createElement("ul");
    const span = Object.keys(per).forEach((key) => {
      const oneLi = this.createElement("span", "", key);
      const li = this.createElement("li");
      li.append(oneLi);
      ul.append(li);
    });
    list.append(h2_H, ul);
    return list;
  }
  createModals() {
    const modals = this.createElement("div", ["modals"]);
    const modalMenu = this.createModalMenu();
    const modalWin = this.createElement("div", ["modal_win"]);
    const modalTable = this.createElement("div", ["modal_table"]);
    modals.append(modalMenu, modalWin, modalTable);
    return modals;
  }
  createPage() {
    const modals = this.createModals();
    const container = this.createElement("div", ["container"]);
    document.body.append(modals, container);
  }
}
const builder = new BuildPage();
builder.createPage();
/*
const divContainer = document.createElement("div");
// const gamePart = document.createElement("div");
const gamePart = document.querySelector(".game-part");
console.log(gamePart);
const divModals = document.createElement("div");
divModals.className = "modals";
divContainer.className = "container";

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
buildField();
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
// console.log("matrixClueColumn", matrixClueColumn);
// function maxWidth(matrix) {
//   let newMatr = [];
//   for (let i = 0; i < matrix.length; i++) {
//     newMatr.push(matrix[i].length);
//   }
//   return Math.max(...newMatr);
// }
// let maxWidthClueRow = maxWidth(matrixClueRow);
// let maxWidthClueColumn = maxWidth(matrixClueColumn);
//drow this array-answer
function startGame() {
  //fill active field
  ctx2.fillStyle = "#ffffff";
  ctx2.fillRect(0, 0, screen_width, screen_height);
  fillColor(ctx, answer, startGameField);
  fillColor(ctx2, customerAnswer, 0);
  fillFiled();
  fillFiledActive();
  fillText();
}
function drawLine(startx, starty, endx, endy, color, line_width, ctx) {
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.beginPath();
  ctx.moveTo(startx, starty);
  ctx.lineTo(endx, endy);
  ctx.stroke();
}
// console.log(matrixClueColumn.length);
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
  ctx.fillStyle = "#4400ff";
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
  ctx.fillStyle = "#BA5809";
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
        ctx.fillStyle = "#c4915e";
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

// size active field (xstart, ystart,xend,yend) = 0 ,0 ,screen_width,screen_height(13/27)(8/22)
function compareMatrix() {
  for (let i = 0; i < customerAnswer.length; i++) {
    for (let j = 0; j < customerAnswer[0].length; j++) {
      const value1 = customerAnswer[i][j];
      const value2 = answer[i][j];
      if ((value1 === 0 || value1 === 2) && (value2 === 0 || value2 === 2)) {
        continue;
      }
      if (value1 !== value2) {
        return console.log(false);
      }
    }
  }
  return alert("you win");
}
function clickLeft(row, col) {
  if (customerAnswer[row][col] !== 1) {
    customerAnswer[row][col] = 1;
  } else {
    customerAnswer[row][col] = 0;
  }
  compareMatrix();
  // let r = customerAnswer.every((v, i) =>
  //   customerAnswer[i].every((v, j) => v === answer[i][j]),
  // );
  // if (r) {
  //   alert("you win");
  // }
}

function clickRight(row, col) {
  if (customerAnswer[row][col] !== 2) {
    customerAnswer[row][col] = 2;
  } else {
    customerAnswer[row][col] = 0;
  }
}
canvas2.addEventListener("mousedown", (e) => {
  let col = Math.floor(e.offsetX / cell_size);
  let row = Math.floor(e.offsetY / cell_size);
  // console.log(e.buttons);
  switch (e.buttons) {
    case 1:
      clickLeft(row, col);
      break;
    case 2:
      clickRight(row, col);
      break;
    default:
      clickLeft(row, col);
  }
  });
// startGame();
let game = setInterval(startGame, 300);*/
