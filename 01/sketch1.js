
let table;
let fillColor;

function preload() {
  table = loadTable('census2000.csv', 'csv', 'header');
}


const drawShape = (centerLineX, array) => {
  let min = Math.min( ...array ),
      max = Math.max( ...array );
  let bound = Math.max(abs(min), abs(max));
  if (array[0] > 0) {
    fillColor = "skyblue";
  } else {
    fillColor = "orange";
  }
  fill(fillColor);
  beginShape();
  vertex(centerLineX, 0);
  for (let i = 0; i < 19; i++) {
    vertex(centerLineX + width / 4 * array[i] / bound, i * height/19);
    if (array[i] * array[i+1] < 0) {
      vertex(centerLineX, - height / 19 / (array[i+1] - array[i]) / bound * width / 4 * array[i] / bound + i * height/19);
      endShape();
      if (fillColor === "orange") {
        fillColor = "skyblue";
      } else {
        fillColor = "orange";
      }
      fill(fillColor);
      beginShape();
      vertex(centerLineX, - height / 19 / (array[i+1] - array[i]) / bound * width / 4 * array[i] / bound + i * height/19);
    }
  }
  vertex(centerLineX, height);
  endShape();
}


function setup() {
  createCanvas(1200, 800);
  background(20);
  strokeWeight(2);
  //count the columns
  let rowCount = table.getRowCount();
  let columnCount = table.getColumnCount();
  const sex = table.getColumn('Sex');
  const year = table.getColumn('Year');
  const age = table.getColumn('Age');
  const people = table.getColumn('People');
  let points = [];
  for (let r = 0; r < rowCount; r++) {
    points.push({
      sex     : sex[r],
      year    : year[r],
      age     : age[r],
      people  : people[r]
    })
  }

  let pointsByAge1900 = [];
  let pointsByAge2000 = [];
  for (let i = 0; i < 19; i++) {
    pointsByAge1900.push(points.filter(x => x.age == 5 * i && x.year == 1900));
    pointsByAge2000.push(points.filter(x => x.age == 5 * i && x.year == 2000));
  }
  let sexGap1900 = [];
  let sexGap2000 = [];
  for (let i = 0; i < 19; i++) {
    sexGap1900.push(pointsByAge1900[i][0].people - pointsByAge1900[i][1].people);
    sexGap2000.push(pointsByAge2000[i][0].people - pointsByAge2000[i][1].people);
  }
  drawShape(0.3 * width, sexGap2000);
  drawShape(0.7 * width, sexGap1900);

}
