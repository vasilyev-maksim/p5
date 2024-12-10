export interface IPoint {
  x: number;
  y: number;
  clone: () => IPoint;
  add: (coords: IPoint) => IPoint;
  subtract: (coords: IPoint) => IPoint;
}
