import { IPoint } from "./IPoint";
import { Point } from "./Point";
import { IRectangle, Rectangle } from "./Rectangle";
import { Vector } from "./Vector";

interface IProviders {
  // onMove: (cell: IPoint) => Promise<void>;
  onCommit: (rectangle: IRectangle) => void;
  isForwardPossible: (cell: IPoint) => boolean;
  rectEvaluator: (rect: IRectangle) => number;
}

export class Turtle {
  public start: IPoint;
  // public end: IPoint;
  // public direction: Vector;
  public movesLimit: number;
  public moves: number;

  constructor(public origin: IPoint, private providers: IProviders) {
    this.start = origin.clone();
    // this.end = origin.clone();

    // this.direction =
    //   providers?.getRandomDirection?.() ?? Turtle.getRandomDirection();
    this.providers = providers;
    this.movesLimit = 10;
    this.moves = 0;
  }

  // async forward() {
  //   this.end = this.end.add(this.direction);
  //   // await this.providers.onMove(this.end);
  // }

  // static getRandomDirection() {
  //   const directions = [
  //     [1, 1],
  //     [1, -1],
  //     [-1, 1],
  //     [-1, -1],
  //   ] as [number, number][];
  //   return new Vector(
  //     ...directions[Math.floor(Math.random() * directions.length)]
  //   );
  // }

  // findValidDirection() {
  //   let i = 0;

  //   while (i < 4) {
  //     // debugger;
  //     if (!this.isForwardPossible(this.end)) {
  //       this.turnLeft();
  //       i++;
  //     } else {
  //       break;
  //     }
  //   }

  //   return i < 4;
  // }

  // isForwardPossible(origin: IPoint) {
  //   return (
  //     this.direction &&
  //     this.providers.isForwardPossible(origin.add(this.direction))
  //   );
  // }

  // travelRandomRectangle() {
  //   const direction = this.findValidDiagonalDirection();
  //   const variations = this.getRectangleVariations(direction);
  // }

  async moveInRandomDirection() {
    const rects = this.getRectangleVariations();
    this.providers.onCommit(rects[0]);
  }

  // turnLeft() {
  //   this.direction = new Vector(this.direction.x, -this.direction.y);
  // }

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
    const origin = this.start;
    let maxY = origin.y + this.getEmptyPathLengthByDirection(new Vector(0, 1));
    const maxX =
      origin.x + this.getEmptyPathLengthByDirection(new Vector(1, 0));
    const variations = [];

    for (let x = origin.x + 1; x <= maxX; x++) {
      for (let y = origin.y + 1; y <= maxY; y++) {
        const isEmpty = this.providers.isForwardPossible(new Point(x, y));
        if (!isEmpty) {
          const newMaxY = y - 1;
          if (newMaxY < maxY) {
            variations.push(new Point(x - 1, maxY));
          }
          maxY = newMaxY;
          break;
        }
      }
    }

    variations.push(new Point(maxX, maxY));

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
