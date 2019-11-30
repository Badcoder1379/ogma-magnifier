export class Edge {
  public source: string;
  public target: string;
  public id: string;

  constructor(from: string, to: string, id: string) {
    this.source = from;
    this.target = to;
    this.id = id;
  }
}
