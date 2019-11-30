import { PointPack } from '../models/PointPack';
import {Partitioner} from '../logic/Engines/Partioner'
import { Point } from '../models/Point';


export class MagnifierBusiness
{
    public zoomDegree: number;
    public height: number;
    public width: number;

    public points: Point[];
    

    constructor(width: number, height: number, points: Point[], zoomDegree: number)
    {
        this.zoomDegree = zoomDegree;
        this.points = points;
        this.width = width;
        this.height = height;
    }

    public process(): PointPack[]
    {
        let side = Math.max(this.width, this.height) * this.zoomDegree;
        side = Math.max(0.000001, side);
        let partitioner : Partitioner = new Partitioner(side,this.points);
        let pointPacks : PointPack[] = partitioner.partition();
        return pointPacks;
    }
}

