import { IPoint } from "./IPoint";
import { Point } from "./Point";
import { ISize, Size } from "./Size";

export interface IRectangle extends ISize {
  topLeft: IPoint;
  bottomRight: IPoint;
  center: IPoint;
  width: number;
  height: number;
  getPointsRange: () => IPoint[];
  scale: (factor: number) => IRectangle;
}

export class Rectangle extends Size implements IRectangle {
  public topLeft: IPoint;
  public bottomRight: IPoint;
  public center: IPoint;

  constructor(p1: IPoint, p2: IPoint = p1) {
    const topLeft = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
    const bottomRight = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));

    const width = bottomRight.x - topLeft.x + 1;
    const height = bottomRight.y - topLeft.y + 1;

    super(width, height);

    this.bottomRight = bottomRight;
    this.topLeft = topLeft;
    this.center = this.topLeft.add(new Point(width / 2, height / 2));
  }

  public getPointsRange() {
    const points = [];
    for (let x = this.topLeft.x; x <= this.bottomRight.x; x++) {
      for (let y = this.topLeft.y; y <= this.bottomRight.y; y++) {
        points.push(new Point(x, y));
      }
    }
    return points;
  }

  public scale(factor: number) {
    const newWidth = this.width * factor;
    const newHeight = this.height * factor;
    const newTopLeft = this.center.add(
      new Point(-newWidth / 2, -newHeight / 2)
    );
    const newBottomRight = this.center.add(
      new Point(newWidth / 2, newHeight / 2)
    );

    return new Rectangle(newTopLeft, newBottomRight);
  }
}
