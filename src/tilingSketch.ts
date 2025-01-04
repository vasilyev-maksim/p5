import p5 from "p5";
import { Grid } from "./Grid";
import { Point } from "./Point";
import { Size } from "./Size";
import { Matrix } from "./Matrix";
import { Turtle } from "./Turtle";
import { IRectangle } from "./Rectangle";
import { StaggerAnimation } from "./StaggerAnimation";
import { easeInOutQuad, getQsParam } from "./utils";

const sketch = (p: p5) => {
  const GRID_CELLS_Y = Number(getQsParam("y", "20")),
    WIDTH = window.innerWidth - 50,
    HEIGHT = window.innerHeight - 50,
    GRID_SIZE = new Size(
      Math.round((GRID_CELLS_Y * window.innerWidth) / window.innerHeight),
      GRID_CELLS_Y
    ),
    GRID_ORIGIN = new Point(
      window.innerWidth / 2 - WIDTH / 2,
      window.innerHeight / 2 - HEIGHT / 2
    ),
    MAX_AREA = 0.08,
    grid = new Grid(p, {
      origin: GRID_ORIGIN,
      gridSizeInPixels: new Size(WIDTH, HEIGHT),
      gridSizeInCells: GRID_SIZE,
      color: "#CCC",
    }),
    matrix = new Matrix(GRID_SIZE),
    rectsToDraw: IRectangle[] = [],
    animation: StaggerAnimation = new StaggerAnimation(12);

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    // p.noLoop();

    while (spawnTurtle()) {}
  };

  const spawnTurtle = () => {
    const randomOrigin = matrix.getRandomTrue();
    if (!randomOrigin) {
      return false;
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
        const maxArea = MAX_AREA * gridArea;

        if (area > maxArea || rect.getAspectRatio() > 2) return 0;

        return maxArea - area;
      },
    });

    turtle.coverRandomRectangle();
    return true;
  };

  p.mouseClicked = spawnTurtle;

  p.draw = () => {
    p.background("black");
    // grid.render();
    p.fill("#AAA");
    p.strokeWeight(2);

    const reverse = getQsParam("r", "1") === "1";

    (reverse ? rectsToDraw.slice().reverse() : rectsToDraw).forEach(
      (cellRect, i, arr) => {
        const canvasRect = grid.getCanvasRectangleFromVertexCells(cellRect);
        const animationProgress = animation.getAnimationProgress(
          p.frameCount,
          i
        );
        const colorValue = p.map(1 - i / arr.length, 0, 1, 0.1, 0.75);
        // const area = cellRect.getArea();
        // const gridArea = GRID_SIZE.getArea();

        const color = p.lerpColor(
          p.color("white"),
          i % 3 == 0
            ? p.color("red")
            : i % 3 == 1
            ? p.color("teal")
            : p.color("purple"),
          reverse ? colorValue : 1 - colorValue
          // 1 - area / (MAX_AREA * gridArea)
        );
        p.fill(color);
        const scale = easeInOutQuad(animationProgress);
        const scaledRect = canvasRect.scale(scale);
        const padding = 3;
        p.strokeWeight(1);
        p.rect(
          scaledRect.topLeft.x + padding,
          scaledRect.topLeft.y + padding,
          Math.max(scaledRect.width - 2 - padding * 2, 0), // TODO: fix this (-2)
          Math.max(scaledRect.height - 2 - padding * 2, 0),
          10
        );
      }
    );
  };
};

export default sketch;