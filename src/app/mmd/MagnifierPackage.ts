import { MagnifierBusiness } from './logic/MagnifierBusiness';
import { MyNode } from './models/Node';
import { Graph } from './models/Graph';
import { Point } from './models/Point';
import { Edge } from './models/Edge';
import { PointPack } from './models/PointPack';

export class MagnifierPackage {
  public minZoom: number;
  public maxZoom: number;
  public zoomPower: number;
  public height: number;
  public width: number;

  public points: Point[];

  public graph: Graph;

  public resultPointPacks: PointPack[];
  public nodeMap: Map<string, string>;
  public edgeMap: Map<string, string>;
  public resultGraph: Graph;

  constructor(
    width: number,
    height: number,
    maxZoom: number,
    minZoom: number,
    zoomPower: number,
    graph: Graph
  ) {
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
    this.width = width;
    this.height = height;
    this.zoomPower = zoomPower;
    this.graph = graph;
  }

  public process(): void {
    this.convertDataType();

    const zoomDegree = this.zoomPower / (this.maxZoom - this.minZoom);
    const business: MagnifierBusiness = new MagnifierBusiness(
      this.width,
      this.height,
      this.points,
      zoomDegree
    );
    this.resultPointPacks = business.process();

    this.returnDataType();
  }

  public getResultGraph(): Graph {
    return this.resultGraph;
  }

  public getEdgeMap(): Map<string, string> {
    return this.edgeMap;
  }

  public getNodeMap(): Map<string, string> {
    return this.nodeMap;
  }

  private convertDataType(): void {
    this.points = new Array(this.graph.nodes.length);

    this.graph.nodes.forEach((node, index) => {
      this.points[index] = new Point(
        node.id,
        node.attributes.x,
        node.attributes.y,
        1
      );
    });
  }

  private returnDataType(): void {
    this.nodeMap = new Map<string, string>();
    this.edgeMap = new Map<string, string>();
    const resultNodes = new Array(this.resultPointPacks.length);
    this.resultPointPacks.forEach((pointpack, index) => {
      // ساختن آی دی جدید برای نود های جدید
      const newId: string = 'cluster' + index;
      resultNodes[index] = new MyNode(
        newId,
        pointpack.x,
        pointpack.y,
        pointpack.pointCounter
      );
      pointpack.points.forEach(point => {
        this.nodeMap.set(point.id, resultNodes[index].id);
      });
    });

    const resultEdges = [];
    const edgesSet = new Set<string>();
    let edgeIndex = 0;
    this.graph.edges.forEach(edge => {
      // ساختن آی دی جدید برای یال های جدید
      const mappedId =
        this.nodeMap.get(edge.source) + '-' + this.nodeMap.get(edge.target);
      if (!edgesSet.has(mappedId)) {
        edgesSet.add(mappedId);
        const newEdge = new Edge(this.nodeMap.get(edge.source), this.nodeMap.get(edge.target), mappedId);
        resultEdges.push(newEdge);
        edgeIndex ++;
      }
      this.edgeMap.set(edge.id, mappedId);
    });

    this.resultGraph = new Graph(resultNodes, resultEdges);
  }
}
