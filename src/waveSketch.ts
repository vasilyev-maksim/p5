import p5 from "p5";

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    N = 30,
    // N = 3,
    Y_DLT = 30,
    // Y_DLT = 220,
    Y_AMPL_MIN = 0,
    Y_AMPL_MAX = 35,
    // DIAM = 10,
    X_SPD = 2,
    Y_SPD = 5,
    DLY_MS = 0;

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.noStroke();
    p.angleMode("degrees");
    p.background("black");
  };

  p.draw = () => {
    // p.background("black");

    for (let i = -4; i < N; i++) {
      setTimeout(() => {
        const lColor = p.lerpColor(
          p.color("#ea72f7ff"),
          p.color("#08055aff"),
          i / N
        );
        const t1 = ((p.frameCount * 2) % 100) / 100;
        const color = p.lerpColor(
          lColor,
          p.color("#00eae6ff"),
          t1 > 0.5 ? 1 - t1 : t1
        );
        p.fill(color);
        drawWave(Y_DLT * (i + 1));
      }, DLY_MS * i);
    }

    function drawWave(yd: number) {
      const _x = Math.min(p.frameCount * X_SPD, WIDTH);
      // const t1 = ((p.frameCount * 2) % 100) / 100;
      // const _y_ampl = p.lerp(Y_AMPL_MIN, Y_AMPL_MAX, t1 > 0.5 ? 1 - t1 : t1);
      const _y_ampl = p.lerp(Y_AMPL_MIN, Y_AMPL_MAX, p.mouseY / HEIGHT);
      const _y = Math.min(
        p.sin(p.frameCount * Y_SPD) * _y_ampl - _y_ampl / 2,
        HEIGHT
      );
      // const t = (p.frameCount % 100) / 100;
      // const diam = p.lerp(3, 20, t > 0.5 ? 1 - t : t);
      const diam = p.lerp(3, 15, p.mouseX / WIDTH);
      console.log(_x);
      p.circle(_x, _y + yd, diam);
    }

    p.textSize(400);
    p.textStyle("bold");
    p.fill("black");
    p.text("SHOW", 100, 400);
    p.textSize(300);
    p.text("BOOBS!", 100, 700);
  };
};

export default sketch;
