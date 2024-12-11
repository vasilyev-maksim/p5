import { IPoint } from "./IPoint";
import { Point } from "./Point";
import { IRectangle, Rectangle } from "./Rectangle";
import { Vector } from "./Vector";

interface IProviders {
  onCommit: (rectangle: IRectangle) => void;
  isForwardPossible: (cell: IPoint) => boolean;
  rectEvaluator: (rect: IRectangle) => number;
}

export class Turtle {
  public start: IPoint;

  constructor(public origin: IPoint, private providers: IProviders) {
    this.start = origin.clone();
    this.providers = providers;
  }

  coverRandomRectangle() {
    const rects = this.getRectangleVariations();
    this.providers.onCommit(rects[0]);
  }

  getEmptyPathLengthByDirection(direction: Vector) {
    if (direction.getLength() === 0) return 0;

    let length = 0;
    let current = this.start;

    while (true) {
      current = current.add(direction);
      if (this.providers.isForwardPossible(current)) {
        length++;
      } else {
        break;
      }
    }

    return length;
  }

  getRectangleVariations() {
    return [
      ...this.getRectangleVariationsByDirection(new Vector(1, 1)),
      ...this.getRectangleVariationsByDirection(new Vector(-1, 1)),
      ...this.getRectangleVariationsByDirection(new Vector(1, -1)),
      ...this.getRectangleVariationsByDirection(new Vector(-1, -1)),
    ];
  }

  getRectangleVariationsByDirection(direction: Vector) {
    const directionX = direction.x;
    const directionY = direction.y;

    let maxDY = this.getEmptyPathLengthByDirection(direction.getYComponent());
    const maxDX = this.getEmptyPathLengthByDirection(direction.getXComponent());
    const variations = [];

    for (let dx = 1; dx <= maxDX; dx++) {
      const x = this.start.x + dx * directionX;
      for (let dy = 1; dy <= maxDY; dy++) {
        const y = this.start.y + dy * directionY;
        const isEmpty = this.providers.isForwardPossible(new Point(x, y));
        if (!isEmpty) {
          const newMaxDY = dy - 1;
          if (newMaxDY < maxDY) {
            variations.push(
              new Point(x - directionX, this.start.y + maxDY * directionY)
            );
          }
          maxDY = newMaxDY;
          break;
        }
      }
    }

    variations.push(
      this.start.add(new Point(maxDX * directionX, maxDY * directionY))
    );

    return variations
      .map((x) => {
        const rect = new Rectangle(this.start, x);
        const value = this.providers.rectEvaluator(rect);
        return { rect, value };
      })
      .filter(({ value }) => value > 0)
      .sort((a, b) => b.value - a.value)
      .map((x) => x.rect);
  }
}
