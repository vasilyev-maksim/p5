import p5 from "p5";

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ANGULAR_SPEED = 1 / 70,
    BRUSH_SPEED = 1 / 90;

  let time = 0,
    angle = 0,
    d = 4;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background("black");
    p.fill(255, 0, 0, 10);
    p.stroke(p.color("rgba(255, 0, 0, 1)"));
    p.strokeWeight(1);
    p.angleMode("degrees");
  };

  p.draw = () => {
    time += 1;
    angle += time * ANGULAR_SPEED;
    d += time * BRUSH_SPEED;

    if (d > WIDTH) return;

    const x = d * p.cos(angle);
    const y = d * p.sin(angle);
    const color = p.lerpColor(
      p.color("rgba(146, 5, 165, 1)"),
      p.color("rgba(52, 9, 152, 1)"),
      (time % 600) / 600
    );
    p.fill(color);

    p.translate(WIDTH / 2 + x, HEIGHT / 2 + y);
    p.circle(0, 0, d);
  };
};

export default sketch;
