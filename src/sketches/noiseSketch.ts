import p5 from "p5";

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
  };

  p.draw = () => {
    p.background("black");
    p.stroke("white");
    const r = p.noise(p.frameCount / 100) * 100;
    p.circle(r, r, r);
  };
};

export default sketch;
