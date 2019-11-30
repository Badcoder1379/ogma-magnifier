
export class MyNode {
  public id: string;
  public attributes: { x: number; y: number };
  public radius: number;

  constructor(id: string, x: number, y: number, weigth: number) {
    this.id = id;
    this.attributes = { x, y };
    this.radius = weigth;
  }
}
