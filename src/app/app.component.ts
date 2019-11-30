import { Component } from '@angular/core';
import { MagnifierPackage } from '../app/mmd/MagnifierPackage';
import { Graph } from './mmd/models/Graph';

declare var Ogma;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ogma-magnifier';
  public myOgma;
  public stableGraph;

  public setARandomGraph() {
    this.myOgma = new Ogma({
      container: 'graph-container'
    });

    // tslint:disable-next-line: variable-name
    const div_v = document.getElementById(
      'verticesCount-input'
    ) as HTMLInputElement;
    const v = div_v.valueAsNumber;
    // tslint:disable-next-line: variable-name
    const div_e = document.getElementById(
      'edgesCount-input'
    ) as HTMLInputElement;
    const e = div_e.valueAsNumber;

    this.stableGraph = this.randomGraph(v, e);
    this.drawGraph(this.stableGraph);
  }

  private async drawGraph(g) {
    await this.myOgma.setGraph(g);
    this.myOgma.view.locateGraph();
  }



  private randomGraph(N, E) {
    const graph = { nodes: [], edges: [] };
    for (let i = 0; i < N; i++) {
      graph.nodes.push({
        id: 'n' + i,
        attributes: {
          x:
            Math.random() *
            document.getElementById('graph-container').clientWidth,
          y:
            Math.random() *
            document.getElementById('graph-container').clientHeight,
          text: 'n' + i,
          radius: 3 + 3 * Math.random()
        }
      });
    }
    for (let i = 0; i < E; i++) {
      graph.edges.push({
        id: 'e' + i,
        // tslint:disable-next-line: no-bitwise
        source: 'n' + ((Math.random() * N) | 0),
        // tslint:disable-next-line: no-bitwise
        target: 'n' + ((Math.random() * N) | 0),
        attributes: { text: 'edge' + i }
      });
    }
    return graph;
  }

  public zoom() {
    const minZoom = 0;
    const maxZoom = 100;
    const range = document.getElementById('zoom-range') as HTMLInputElement;
    // tslint:disable-next-line: radix
    const zoomPower = parseInt(range.value);
    const nodesCopy = (JSON.parse(JSON.stringify(this.stableGraph.nodes)));
    const edgesCopy = (JSON.parse(JSON.stringify(this.stableGraph.edges)));
    const g = new Graph(
      nodesCopy,
      edgesCopy
    );
    const container = document.getElementById('graph-container') as HTMLElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const myPackage = new MagnifierPackage(
      width,
      height,
      maxZoom,
      minZoom,
      zoomPower,
      g
    );
    myPackage.process();
    const graph = myPackage.getResultGraph();
    this.drawGraph(graph);
    const nodeMap = myPackage.getNodeMap();
    const edgeMap = myPackage.getEdgeMap();

    console.log('finish method!');
  }
}























