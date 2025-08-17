import p5 from "p5";
import { RectangleBorderTraveler } from "../RectangleBorderTraveler";

const min = Math.min(600, innerWidth, innerHeight),
  W = min,
  H = min;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(W, H);
    // p.noLoop();
  };

  p.draw = () => {
    p.background(0);
    // const d = 3;
    // const n = 10;
    // for (let i = 0; i < n; i++) {
    //   drawLightning(p, 0, i * d, W, H + i * d, "violet");
    //   drawLightning(p, W, i * d, 0, H + i * d, "pink");
    //   // drawLightning(p, W * 0.11, H * 0.11, W * 0.91, H * 0.91);
    // }

    const steps = 60;
    // const steps = p.floor(
    //   p.map(p.abs((p.frameCount % 120) - 60), 0, 60, 20, 100)
    // );
    const traveler = new RectangleBorderTraveler(
      p.createVector(0, 0),
      p.createVector(W, H),
      steps,
      steps
    );
    const pLen = traveler.points.length;
    // const midIndex = pLen / 2;
    const [intervals, intervals2] = [
      [
        [0, steps],
        [steps * 2, steps],
      ],
      [
        [steps * 4, steps * 3],
        [steps * 2, steps * 3],
      ],
      [
        [0, pLen],
        [steps, pLen + steps],
      ],
    ] as any;
    const cb = ([a, b]: [p5.Vector, p5.Vector]) => {
      drawLightning(p, a.x, a.y, b.x, b.y, "violet");
      // p.line(a.x, a.y, b.x, b.y);
    };
    traveler.combineIntervals(intervals[0], intervals[1], cb);
    traveler.combineIntervals(intervals2[0], intervals2[1], cb);
    // drawLightning(p, W, H, 0, 0, "violet");

    // traveler.combineIntervals([0, pLen], [steps, pLen + steps], ([a, b]) =>
    //   p.line(a.x, a.y, b.x, b.y)
    // );
    // console.log(midIndex, pairs, pLen);
    // let pairs = [];
    // for (let index = 0; index < points.length / 2; index++) {
    //   let top = points[index];
    //   let bottom = points[midIndex - index];
    //   pairs.push([top, bottom]);

    //   top = points[index];
    //   bottom = points[points.length - 1 - index];
    //   pairs.push([top, bottom]);
    //   // const second = points[p.floor(points.length / 2) + index];
    //   const second = points[p.floor(points.length / 2) - index];
    //   const secondMirrored =
    //     points[points.length - 1 - p.floor(points.length / 2) + index];
    //   pairs.push([secondMirrored, firstMirrored]);
    // }
    // pairs.forEach(([a, b]) => {
    //   p.line(a.x, a.y, b.x, b.y);
    // });
  };
};

function drawLightning(
  p: p5,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  stroke: string = "black"
): void {
  const startToEndAngle = p.PI / 2 + p.atan(p.abs(x1 - x0) / p.abs(y1 - y0));
  // const stepAngle = startToEndAngle;
  const stepAngle = p.map(
    p.abs((p.frameCount % 120) - 60),
    0,
    60,
    startToEndAngle,
    p.PI / 4
  );
  const stepsCount = 20;
  // const orientation: "v" | "h" = "h";

  const dropsCount = stepsCount - 1;
  let stepLength = 1 / stepsCount,
    dropHeight = 1 / dropsCount,
    dropShift = dropHeight / p.tan(stepAngle) / 2;

  // if (orientation === "h") {
  //   stepLength = p.floor((y1 - y0) / stepsCount);
  //   dropHeight = p.floor((x1 - x0) / dropsCount);
  //   dropShift = dropHeight / p.tan(stepAngle);
  // }

  // debugger;
  let scaleX = x1 - x0;
  let scaleY = y1 - y0;

  p.push();
  {
    p.stroke(stroke);
    p.translate(x0, y0);
    p.scale(scaleX, scaleY);
    p.strokeWeight(2 / p.max(scaleX, scaleY));

    let vertices: [number, number][] = [];

    for (let i = 0; i < stepsCount; i++) {
      // console.log(1);
      // console.log(
      //   i * stepLength - (i === 0 ? 0 : dropShift),
      //   i * dropHeight,
      //   (i + 1) * stepLength - (i === 0 ? 0 : dropShift),
      //   i * dropHeight
      // );

      // original
      // p.line(
      //   i * stepLength - (i === 0 ? 0 : dropShift),
      //   i * dropHeight,
      //   (i + 1) * stepLength - (i === 0 ? 0 : dropShift),
      //   i * dropHeight
      // );

      vertices = vertices.concat([
        [i * stepLength - dropShift, i * dropHeight],
        [(i + 1) * stepLength + dropShift, i * dropHeight],
      ]);

      // p.poly

      // p.line(0, 0, 500, 500);
      // p.line(0, 0, 1, 1);
    }

    p.beginShape();
    p.fill(0, 0, 0, 0);
    vertices.forEach(([x, y]) => {
      p.vertex(x, y);
    });
    p.endShape();
  }
  p.pop();
}

export default sketch;
