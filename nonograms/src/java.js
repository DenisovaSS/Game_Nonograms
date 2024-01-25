const answer = easy.key;
// console.log(answer);
let cell_size = 40;
let screen_width = answer[0].length * cell_size;
console.log(answer[0].length);
console.log(answer.length);
let screen_height = answer.length * cell_size;
const canvas = document.createElement("canvas");
canvas.id = "game";
canvas.width = screen_width + 400;
canvas.height = screen_height + 300;
document.body.prepend(canvas);
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

  return console.log(field);
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
  return console.log(matrixClueRow);
}
cluesRow(answer);
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
  cluesRow(transMatrix);
}

cluesColumn(answer);
