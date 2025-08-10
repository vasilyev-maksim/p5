import p5 from "p5";

export function getRandomPartition(
  n: number,
  minPart: number,
  maxPart: number
): number[] {
  if (n <= 0) {
    return [];
  }
  const part = Math.floor(minPart + Math.random() * (maxPart - minPart));
  return [part, ...getRandomPartition(n - part, minPart, maxPart)];
}

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    GAP_X = 10,
    GAP_Y = 10,
    PARTS = getRandomPartition(WIDTH, WIDTH / 26, WIDTH / 12);

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.noStroke();
    // p.angleMode("degrees");
    // p.background("black");
  };

  p.draw = () => {
    p.background("black");

    let start = 0;
    PARTS.forEach((w, i) => {
      drawColumn(
        start,
        0,
        w - GAP_X,
        HEIGHT,
        HEIGHT / 2 +
          (HEIGHT / 4) *
            p.sin((p.PI * i * 2) / PARTS.length + p.PI * p.frameCount * 0.005),
        GAP_Y
      );
      start += w;
    });

    function drawColumn(
      x: number,
      y: number,
      w: number,
      h: number,
      gapY: number,
      gapH: number
    ) {
      const gd = gapH / 2;
      drawPill(x, y, w, gapY - gd, "down");
      drawPill(x, gapY + gd, w, h - gapY + gd, "up");
    }

    function drawPill(
      x: number,
      y: number,
      w: number,
      h: number,
      direction: "up" | "down"
    ) {
      const color = p.lerpColor(
        p.color("rgba(52, 9, 152, 1)"),
        p.color("rgba(234, 114, 247, 1)"),
        h / HEIGHT
      );
      console.log(h / HEIGHT, h, HEIGHT);

      p.fill(color);

      const tl = p.createVector(x, y);
      const r = w / 2,
        c = tl
          .copy()
          .add(
            p.createVector(...(direction === "up" ? [r, r] : [w - r, h - r]))
          );
      p.circle(c.x, c.y, r * 2);

      const rtl = direction === "up" ? tl.copy().add(p.createVector(0, r)) : tl;
      p.rect(rtl.x, rtl.y, w, Math.max(h - r, 0));
    }
  };
};

export default sketch;
