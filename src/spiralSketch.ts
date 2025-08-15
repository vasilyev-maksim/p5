import p5 from "p5";

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    // ANGULAR_SPEED = 1,
    ANGULAR_SPEED = 2,
    BRUSH_SPEED = 10;

  // let time = 0;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background("black");
    p.fill(255, 0, 0, 10);
    p.stroke(p.color("rgba(255, 0, 0, 1)"));
    p.strokeWeight(1);
    p.angleMode("degrees");
  };

  function getNodes(): [number, number][] {
    return Array.from({ length: 2000 }, (_, i) => {
      return [i * BRUSH_SPEED, i * ANGULAR_SPEED * p.sin(p.frameCount)];
    });
  }

  function drawNode([d, angle]: [number, number], i: number, maxI: number) {
    const adelta = p.frameCount * 1.5;
    const x = d * p.cos(angle + adelta);
    const y = d * p.sin(angle + adelta);
    const color = p.lerpColor(
      p.color("rgba(103, 3, 116, 1)"),
      p.color("rgba(45, 1, 147, 1)"),
      p.sin(p.frameCount * 1 + (i / maxI) * 4 * 360)
    );
    p.fill(color);
    p.circle(WIDTH / 2 + x, HEIGHT / 2 + y, d);
  }

  p.draw = () => {
    p.background("black");
    const nodes = getNodes();
    nodes.forEach((x, i, arr) => drawNode(x, i, arr.length));
  };
  //   if (d > WIDTH) return;

  //   const x = d * p.cos(angle);
  //   const y = d * p.sin(angle);
  //   const color = p.lerpColor(
  //     p.color("rgba(146, 5, 165, 1)"),
  //     p.color("rgba(52, 9, 152, 1)"),
  //     (time % 600) / 600
  //   );
  //   p.fill(color);

  //   p.translate(WIDTH / 2 + x, HEIGHT / 2 + y);
  //   p.circle(0, 0, d);
  // };
};

export default sketch;
