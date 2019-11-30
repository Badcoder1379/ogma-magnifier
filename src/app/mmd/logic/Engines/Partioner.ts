import { PointPack } from "../../models/PointPack";
import { Point } from "../../models/Point";
import {  Pair } from "../../models/Pair";

export class Partitioner {
  public side: number;
  public points: Point[];

  constructor(side: number, points: Point[]) {
    this.side = side;
    this.points = points;
  }

  public partition(): PointPack[] {
    const pointPacks: Map<string, PointPack> = new Map<string, PointPack>();

    this.points.forEach(point => {
      const x: number = Math.floor(point.x / this.side);
      const y: number = Math.floor(point.y / this.side);
      const location: Pair = new Pair(x, y);

      if (pointPacks.get(location.stringForm) == null) {
        pointPacks.set(location.stringForm, new PointPack());
      }

      pointPacks.get(location.stringForm).addPoint(point);
    });

    Array.from(pointPacks.values()).forEach(pointPack => {
      pointPack.calcuteLocation();
    });
    return Array.from(pointPacks.values());
  }
}
