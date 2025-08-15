import p5 from "p5";

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    Y_SIZE = 30,
    POINTS_PER_LINE = 5,
    X_DISPERSION = 0.3,
    SPEED = 10,
    Y_DELTA = HEIGHT / Y_SIZE,
    CURVES_COUNT = 1,
    OPACITY = 20,
    BG = [0, 0, 0];
  // COLORS = [
  //   [255, 0, 0],
  //   [255, 255, 255],
  //   [0, 0, 0],
  //   [52, 9, 152],
  //   [234, 114, 247],
  // ];
  let NODES: [number, number][][] = [];
  let NEXT_NODES: [number, number][][] = [];

  function getNextNodes() {
    const nodes: typeof NODES = [];

    for (let l = 0; l < CURVES_COUNT; l++) {
      const arr: (typeof NODES)[0] = [];
      for (let i = 1; i < Y_SIZE; i++) {
        const y = i * Y_DELTA;
        // p.line(0, y, WIDTH, y);

        const xs = [];
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const node = p.random(
            (WIDTH / 2) * (1 - X_DISPERSION),
            (WIDTH / 2) * (1 + X_DISPERSION)
          );
          xs.push(node);
          // p.circle(node, y, 10);
        }

        const avgX = xs.reduce((acc, x) => acc + x, 0) / POINTS_PER_LINE;
        arr.push([avgX, y]);
      }
      nodes.push(arr);
    }

    return nodes;
  }

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    // p.noStroke();
    // p.angleMode("degrees");
    const [r, g, b] = BG;
    p.background(r, g, b);
    p.stroke(255, 0, 0, 255);
    p.strokeWeight(2);
    NODES = getNextNodes();
    NEXT_NODES = getNextNodes();

    // p.noFill();
  };

  p.draw = () => {
    console.log(NEXT_NODES);
    if (p.frameCount % SPEED === 0) {
      NEXT_NODES = getNextNodes();
    }

    p.noStroke();
    const [r, g, b] = BG;
    p.fill(p.color(r, g, b, OPACITY));
    p.rect(0, 0, WIDTH, HEIGHT);
    p.noFill();
    // p.stroke(p.color(255, 0, 0, 255));
    // drawLines();
    penderNodesDeltaPerFrame();
    drawLines();

    function penderNodesDeltaPerFrame() {
      NODES = NODES.map((arr, j) =>
        arr.map(([x, y], i) => {
          const nextX = NEXT_NODES[j][i][0];
          const distance = nextX - x;
          if (i == 2) {
            // console.log(distance);
          }
          const newX = x + distance / SPEED;
          return [newX, y];
        })
      );
    }

    function drawLines() {
      for (let j = 0; j < CURVES_COUNT; j++) {
        // const color = p.lerpColor(
        //   p.color("rgba(52, 9, 152, 1)"),
        //   p.color("rgba(234, 114, 247, 1)"),
        //   j / CURVES_COUNT
        // );

        p.stroke("red");
        // p.stroke(color);
        p.beginShape();
        for (let i = 0; i < NODES[j].length; i++) {
          const [x, y] = NODES[j][i];
          p.curveVertex(x, y);
        }
        p.endShape();
        // p.endShape("close");
      }
    }
  };
};

export default sketch;
