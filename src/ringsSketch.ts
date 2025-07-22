import p5 from "p5";

class Ring {
  public constructor(
    private readonly center: p5.Vector,
    private readonly radius: number,
    private readonly fillColor: p5.Color,
    private readonly rotationCenter: p5.Vector
  ) {}

  public render = (p: p5, angle: number) => {
    p.push();

    // Перенос системы координат в точку вращения
    p.translate(this.rotationCenter.x, this.rotationCenter.y);

    // Поворот всей системы координат
    p.rotate(angle);

    // Рисуем окружность в её локальной позиции (относительно rotationCenter)
    const localX = this.center.x - this.rotationCenter.x;
    const localY = this.center.y - this.rotationCenter.y;
    p.fill(this.fillColor);
    p.circle(localX, localY, this.radius * 2);

    // p.fill("black");
    // p.circle(0, 0, 5);

    p.pop();
  };
}

const sketch = (p: p5) => {
  function getDirection(i: number) {
    return [
      p.createVector(1, 0),
      p.createVector(-1, 0),
      p.createVector(0, 1),
      p.createVector(0, -1),
    ][i % 2];
  }

  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    CENTER_VEC = p.createVector(WIDTH / 2, HEIGHT / 2),
    RINGS_COUNT = 20,
    RD = WIDTH / 120,
    RINGS = Array.from({ length: RINGS_COUNT }, (_, i) => {
      const dir = getDirection(i);
      const rotationShiftDelta = (RD / 2) * (i + 1);
      return new Ring(
        CENTER_VEC,
        RD * (i + 1),
        p.lerpColor(
          p.color("#ea72f7ff"),
          p.color("#530984ff"),
          i / RINGS_COUNT
        ),
        p5.Vector.add(
          CENTER_VEC,
          p.createVector(dir.x * rotationShiftDelta, dir.y * rotationShiftDelta)
          // p.createVector((RD / 2) * (i + 1) * (i % 2 == 0 ? 1 : -1), 0)
        )
      );
    });

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.noStroke();
    p.angleMode("degrees");
  };

  p.draw = () => {
    const mouseVec = p.createVector(
      p.mouseX - CENTER_VEC.x,
      p.mouseY - CENTER_VEC.y
    );
    const angle = (p.frameCount * 2) % 360;
    // const angle = mouseVec.angleBetween(p.createVector(1, 0));

    p.background("#530984ff");

    [...RINGS].reverse().forEach((r, i) => {
      const delta = 10 * i;
      const ang = (angle + delta) * (i % 2 == 0 ? 1 : -1);
      r.render(p, ang);
    });

    // const r = [
    //   new Ring(
    //     CENTER_VEC,
    //     RD,
    //     p.lerpColor(p.color("violet"), p.color("purple"), 0),
    //     p5.Vector.add(CENTER_VEC, p.createVector(RD / 2, 0)),
    //     0
    //   ),
    //   new Ring(
    //     CENTER_VEC,
    //     2 * RD,
    //     p.lerpColor(p.color("violet"), p.color("purple"), 0.5),
    //     p5.Vector.add(CENTER_VEC, p.createVector(-RD, 0)),
    //     0
    //   ),
    //   new Ring(
    //     CENTER_VEC,
    //     3 * RD,
    //     p.lerpColor(p.color("violet"), p.color("purple"), 1),
    //     p5.Vector.add(CENTER_VEC, p.createVector((RD * 3) / 2, 0)),
    //     0
    //   ),
    // ];

    // // RINGS[2].render(p, angle);
    // r[2].render(p, angle);
    // r[1].render(p, angle);
    // r[0].render(p, angle);

    // p.fill("red");
    // p.circle(CENTER_VEC.x, CENTER_VEC.y, 10);
  };
};

export default sketch;
