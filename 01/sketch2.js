
let table;
const pointDiameter = 3;
const padding = 60;
let heightInner;
function preload() {
  table = loadTable('census2000.csv', 'csv', 'header');
}

const drawPoints = (xLeft, xRight, array) => {
  fill(255, 99, 71, 180);
  for (let i = 0; i < array.length; i++) {
    console.log(array[i][0].people);
    for (let j = 0; j < array[i][0].people / 10000; j++) {
      let x = random(xLeft, xRight);
      let y = padding + random(heightInner / array.length * i, heightInner / array.length * (i+1));
      circle(x, y, pointDiameter);
    }
  }
  fill(35, 211, 205, 180);
  for (let i = 0; i < array.length; i++) {
    console.log(array[i][1].people);
    for (let j = 0; j < array[i][1].people / 10000; j++) {
      let x = random(xLeft, xRight);
      let y = padding + random(heightInner / array.length * i, heightInner / array.length * (i+1));
      circle(x, y, pointDiameter);
    }
  }
}

function setup() {
  //style
  createCanvas(1200, 800);
  background(20);
  fill(150);
  stroke(100);
  textAlign(RIGHT, CENTER);
  textSize(height/80);
  textFont('Georgia');

  heightInner = height - padding * 2;
  let rowCount = table.getRowCount();
  let columnCount = table.getColumnCount();

  let points = [];
  for (let r = 0; r < rowCount; r++) {
    points.push({
      sex     : table.getColumn('Sex')[r],
      year    : table.getColumn('Year')[r],
      age     : table.getColumn('Age')[r],
      people  : table.getColumn('People')[r]
    })
  }
  let pointsByAge1900 = [], pointsByAge2000 = [];
  for (let i = 0; i < 19; i++) {
    pointsByAge1900.push(points.filter(x => x.age == 5 * i && x.year == 1900));
    pointsByAge2000.push(points.filter(x => x.age == 5 * i && x.year == 2000));
  }
  for (let i = 0; i < 20; i++) {
    let x1 = 0.1 * width - 30, y1 = padding + heightInner/19 * i;
    let x2 = 0.55 * width - 30, y2 = padding + heightInner/19 * i;
    line(x1, y1, x1 + 10, y1);
    line(x2, y2, x2 + 10, y2);
    text(i * 5, x1 - 10, y1);
  }
  noStroke();
  drawPoints(0.1 * width, 0.45 * width, pointsByAge1900);
  drawPoints(0.55 * width, 0.9 * width, pointsByAge2000);
  fill(200);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  textSize(15);
  text(1900, 0.275 * width, height - padding / 2);
  text(2000, 0.725 * width, height - padding / 2);
}
