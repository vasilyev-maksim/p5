import { Point } from "./Point";

export class Vector extends Point {
  getXComponent(): Vector {
    return new Vector(this.x, 0);
  }

  getYComponent(): Vector {
    return new Vector(0, this.y);
  }

  getLength(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
