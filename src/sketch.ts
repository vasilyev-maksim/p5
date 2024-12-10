import p5 from "p5";
import { Grid } from "./Grid";
import { Point } from "./Point";
import { Size } from "./Size";
import { Matrix } from "./Matrix";
import { Turtle } from "./Turtle";
import { IRectangle } from "./Rectangle";
import { StaggerAnimation } from "./StaggerAnimation";

const sketch = (p: p5) => {
  const WIDTH = 1200,
    HEIGHT = 800,
    GRID_SIZE = new Size(30, 20),
    GRID_ORIGIN = new Point(
      window.innerWidth / 2 - WIDTH / 2,
      window.innerHeight / 2 - HEIGHT / 2
    ),
    grid = new Grid(p, {
      origin: GRID_ORIGIN,
      gridSizeInPixels: new Size(WIDTH, HEIGHT),
      gridSizeInCells: GRID_SIZE,
      color: "#CCC",
    }),
    matrix = new Matrix(GRID_SIZE),
    rectsToDraw: IRectangle[] = [],
    animation: StaggerAnimation = new StaggerAnimation(6);

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();

    while (spawnTurtle()) {}
  };

  const spawnTurtle = () => {
    const randomOrigin = matrix.getRandomTrue();
    if (!randomOrigin) {
      return;
    }
    const turtle = new Turtle(randomOrigin, {
      isForwardPossible: (cell) => {
        return matrix.get(cell);
      },
      onCommit: (rect) => {
        if (!rect) {
          return;
        }
        rect.getPointsRange().forEach((p) => {
          matrix.set(p, false);
        });

        if (rect.getArea() > 0) {
          rectsToDraw.push(rect);
        }
      },
      rectEvaluator: (rect) => {
        const area = rect.getArea();
        const gridArea = GRID_SIZE.getArea();
        const maxArea = 0.08 * gridArea;

        if (area > maxArea || rect.getAspectRatio() > 2) return 0;

        return area;
      },
    });

    turtle.moveInRandomDirection();

    // p.draw();

    return true;
  };

  p.mouseClicked = spawnTurtle;

  p.draw = () => {
    p.background("black");
    grid.render();
    p.fill("#AAA");
    p.strokeWeight(2);

    rectsToDraw.forEach((cellRect, i, arr) => {
      const canvasRect = grid.getCanvasRectangleFromVertexCells(cellRect);
      const scale = animation.getAnimationProgress(p.frameCount, i);
      const color = p.lerpColor(
        p.color("white"),
        p.color("red"),
        i / arr.length
      );
      p.fill(color);
      const scaledRect = canvasRect.scale(scale);
      p.strokeWeight(1);
      p.rect(
        scaledRect.topLeft.x,
        scaledRect.topLeft.y,
        scaledRect.width - 2, // TODO: fix this (-2)
        scaledRect.height - 2
      );
    });
  };
};

export default sketch;
