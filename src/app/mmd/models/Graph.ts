import { MyNode } from './Node';
import { Edge } from './Edge';

export class Graph {
  public nodes: MyNode[];
  public edges: Edge[];

  constructor(nodes: MyNode[], edges: Edge[]) {
    this.edges = edges;
    this.nodes = nodes;
  }
}
