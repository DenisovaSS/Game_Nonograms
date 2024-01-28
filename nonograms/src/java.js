const answer = normal.crab;
let customerAnswer = buildField();
console.log(customerAnswer);
let cell_size = 20;
let font_size = cell_size === 20 ? 20 : 30;
let screen_width = answer[0].length * cell_size;
let screen_height = answer.length * cell_size;
const startGameField = cell_size * 5;
const divContainer = document.createElement("div");
const managePart = document.createElement("div");
const gamePart = document.createElement("div");
const divModals = document.createElement("div");
const divRect = document.createElement("div");
divModals.className = "modals";
divContainer.className = "container";
managePart.className = "manage-part";
gamePart.className = "game-part";
document.body.prepend(divContainer);
document.body.prepend(divModals);
divContainer.append(gamePart);
divContainer.prepend(managePart);
// const mainElem = document.documentElement;
// console.log(mainElem.clientWidth);
// console.log(window.innerWidth);
//create canvas
const canvas = document.createElement("canvas");
canvas.id = "game";
canvas.width = screen_width + 100;
canvas.height = screen_height + 100;
gamePart.append(canvas);
const ctx = canvas.getContext("2d");
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
function maxWidth(matrix) {
  let newMatr = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatr.push(matrix[i].length);
  }
  return Math.max(...newMatr);
}
let maxWidthClueRow = maxWidth(matrixClueRow);
let maxWidthClueColumn = maxWidth(matrixClueColumn);
//////
/////
//drow this array-answer
function drawLine(startx, starty, endx, endy, color, line_width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.beginPath();
  ctx.moveTo(startx, starty);
  ctx.lineTo(endx, endy);
  ctx.stroke();
}
// console.log(matrixClueColumn.length);
//fill active field
ctx.fillStyle = "#ffffff";
ctx.fillRect(startGameField, startGameField, screen_width, screen_height);
///fill another color
for (let i = 0; i < customerAnswer.length; i++) {
  for (let j = 0; j < customerAnswer[i].length; j++) {
    if (customerAnswer[i][j] === 1) {
      ctx.fillStyle = "#c4915e";
      ctx.fillRect(
        cell_size * j + startGameField,
        cell_size * i + startGameField,
        cell_size,
        cell_size,
      );
    } else if (customerAnswer[i][j] === 2) {
      drawLine(
        cell_size * j + startGameField,
        cell_size * i + startGameField,
        cell_size * (j + 1) + startGameField,
        cell_size * (i + 1) + startGameField,
        "#76420c",
        2,
      );
      drawLine(
        cell_size * (j + 1) + startGameField,
        cell_size * i + startGameField,
        cell_size * j + startGameField,
        cell_size * (i + 1) + startGameField,
        "#76420c",
        2,
      );
    }
  }
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
    );
    if (i % 5 === 0) {
      drawLine(
        0,
        i * cell_size,
        screen_width + startGameField,
        i * cell_size,
        "#15100A",
        3,
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
    );
    if (i % 5 === 0) {
      drawLine(
        i * cell_size,
        0,
        i * cell_size,
        screen_height + startGameField,
        "#15100A",
        3,
      );
    }
  }
}
fillFiled();
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
ctx.textAlign = "end";
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
      cell_size * (5 - j),
    );
  }
}
// size active field (xstart, ystart,xend,yend) = startGameField ,startGameField ,screen_width,screen_height
