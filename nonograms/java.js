let cell_size = 40;
const answer = [
  [1, 1, 0, 1, 1, 0],
  [1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0],
];
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
