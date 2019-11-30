export class Pair {
  public a: number;
  public b: number;
  public stringForm: string;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
    this.stringForm = String(a) + '-' + String(b);
  }

}
