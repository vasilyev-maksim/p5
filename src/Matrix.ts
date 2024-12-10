import { IPoint } from "./IPoint";
import { Point } from "./Point";
import { Size } from "./Size";

export interface IMatrix {
  get(cell: IPoint): boolean;
  set(cell: IPoint, value: boolean): void;
  getRandomTrue(): IPoint;
}

// 1-based matrix (not 0-based as usual arrays)
export class Matrix implements IMatrix {
  private matrix: boolean[][];

  constructor(public sizes: Size) {
    this.matrix = Array.from({ length: this.sizes.height }, () =>
      Array(this.sizes.width).fill(true)
    );
  }

  public get(cell: IPoint) {
    return this.matrix[cell.y - 1]?.[cell.x - 1];
  }

  public set(cell: IPoint, value: boolean) {
    this.matrix[cell.y - 1][cell.x - 1] = value;
  }

  getAllWithValue(value: boolean): IPoint[] {
    const coords = [];
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        const cell = new Point(x + 1, y + 1);
        if (this.get(cell) === value) {
          coords.push(cell);
        }
      }
    }
    return coords;
  }

  public getRandomTrue() {
    const options = this.getAllWithValue(true);
    return options[Math.floor(Math.random() * options.length)];
  }
}
