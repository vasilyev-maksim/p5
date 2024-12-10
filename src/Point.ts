import { IPoint } from "./IPoint";

export class Point implements IPoint {
  constructor(public x: number, public y: number) {}

  clone(): Point {
    return new Point(this.x, this.y);
  }

  add(point: IPoint): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  subtract(point: IPoint): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }
}
