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

  static getRandomVector() {
    return [
      new Vector(1, 0),
      new Vector(0, 1),
      new Vector(-1, 0),
      new Vector(0, -1),
    ][Math.floor(Math.random() * 4)];
  }
}
