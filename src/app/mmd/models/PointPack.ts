import { Point } from "./Point";

export class PointPack{
    public x : number;
    public y : number;
    private xSum : number;
    private ySum: number;
    public pointCounter : number;

    public points : Set<Point>;

    constructor(){
        this.points = new Set<Point>();
        this.pointCounter = 0;
        this.xSum = 0;
        this.ySum = 0;
    }

    public addPoint(point: Point): void{
        this.points.add(point);
        this.pointCounter++;
        this.xSum += point.x;
        this.ySum += point.y;
    }

    public calcuteLocation() : void{
        this.x = this.xSum/this.pointCounter;
        this.y = this.ySum/this.pointCounter;
    }
}