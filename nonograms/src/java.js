const answer = easy.key;
// console.log(answer);
let cell_size = 40;
let screen_width = answer[0].length * cell_size;
console.log(answer[0].length);
console.log(answer.length);
let screen_height = answer.length * cell_size;
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

//create canvas
const canvas = document.createElement("canvas");
canvas.id = "game";
canvas.width = screen_width + 500;
canvas.height = screen_height + 300;
gamePart.append(canvas);
const ctx = canvas.getContext("2d");
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
function cluesRow(matrix) {
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
let matrixClueRow = cluesRow(answer);
console.log("matrixClueRow", matrixClueRow);
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

function cluesColumn(matrix) {
  let transMatrix = transpose(matrix);
  // console.log(transMatrix);
  let matrixCluColumn = cluesRow(transMatrix);
  return matrixCluColumn;
}
let matrixClueColumn = cluesColumn(answer);
console.log("matrixClueColumn", matrixClueColumn);
//////
//////let screen_width = answer[0].length * cell_size;
///// width matrixClueColumn = matrixClueColumn.lenght
//matrixClueRow
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
ctx.fillStyle = "#cccccc";
ctx.fillRect(0, 0, screen_width, screen_height);
function fillFiled() {
  //row
  for (let i = 0; i < answer.length + 1; i++) {
    drawLine(0, i * cell_size, screen_width, i * cell_size, "#443927", 1);
    if (i % 5 === 0) {
      drawLine(0, i * cell_size, screen_width, i * cell_size, "#15100A", 3);
    }
  }
  ///column
  for (let i = 0; i < answer[0].length + 1; i++) {
    drawLine(i * cell_size, 0, i * cell_size, screen_height, "#443927", 1);
    if (i % 5 === 0) {
      drawLine(i * cell_size, 0, i * cell_size, screen_height, "#15100A", 3);
    }
  }
}
fillFiled();
