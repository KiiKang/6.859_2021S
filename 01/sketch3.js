
let table;
const pointDiameter = 3;
const padding = 60;
let heightInner;
function preload() {
  table = loadTable('census2000.csv', 'csv', 'header');
}

const drawShape = (xLeft, xRight, array) => {
  noStroke();
  let min = Math.min( ...array ),
      max = Math.max( ...array );
  let bound = Math.max(abs(min), abs(max));
  let colorIndexCenter = [127, 127, 127],
      colorRange = [-127, -50, 127];
  for (let i = 0; i < array.length; i++) {
    gapRelative = array[i] / bound;
    fill(colorIndexCenter[0] + gapRelative * colorRange[0],colorIndexCenter[1] + gapRelative * colorRange[1], colorIndexCenter[2] + gapRelative * colorRange[2]);
    rect(xLeft, padding + i * heightInner / array.length, xRight - xLeft, heightInner / array.length);
  }
}

function setup() {
  //style
  createCanvas(1050, 800);
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
  let pointsByAge1900 = [], pointsByAge2000 = [], sexGap1900 = [], sexGap2000 = [];
  for (let i = 0; i < 19; i++) {
    pointsByAge1900.push(points.filter(x => x.age == 5 * i && x.year == 1900));
    pointsByAge2000.push(points.filter(x => x.age == 5 * i && x.year == 2000));
  }
  for (let i = 0; i < 19; i++) {
    sexGap1900.push(pointsByAge1900[i][0].people - pointsByAge1900[i][1].people);
    sexGap2000.push(pointsByAge2000[i][0].people - pointsByAge2000[i][1].people);
  }
  for (let i = 0; i < 20; i++) {
    let x1 = 0.1 * width - 30, y1 = padding + heightInner/19 * i;
    let x2 = 0.55 * width - 30, y2 = padding + heightInner/19 * i;
    line(x1, y1, x1 + 10, y1);
    line(x2, y2, x2 + 10, y2);
    text(i * 5, x1 - 10, y1);
  }
  noStroke();
  drawShape(0.1 * width, 0.45 * width, sexGap1900);
  drawShape(0.55 * width, 0.9 * width, sexGap2000);
  fill(200);
  textStyle(ITALIC);
  textAlign(CENTER, CENTER);
  textSize(15);
  text(1900, 0.275 * width, height - padding / 2);
  text(2000, 0.725 * width, height - padding / 2);
}
