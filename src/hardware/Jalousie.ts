import {SubDevice} from "../SubDevice";
import {Connection} from "../Connection";
import {FunctionId} from "../FunctionId";

export class Jalousie extends SubDevice
{
    public static functionIds: FunctionId[] = [];

    private state:JalousieState = JalousieState.Stopped;
    private stateDataPointGet: string = 'odp0000';

    private currentPosition: number = 0;
    private currentPositionDataPointGet: string = 'odp0001';
    private currentPositionDataPointUpdate: string = 'idp0001';

    private targetPosition: number = 0;
    private targetPositionDataPointGet: string = 'odp0002';
    private targetPositionDataPointSet: string = 'idp0002';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);
    }

    public getState(): JalousieState
    {
        return this.state;
    }

    public getCurrentPosition(): number
    {
        return this.currentPosition;
    }

    public getTargetPosition(): number
    {
        return this.targetPosition;
    }

    public setTargetPosition(position: number): void
    {
        this.targetPosition = position;
        this.setDatapoint(this.channel, this.targetPositionDataPointSet, Math.round(this.targetPosition).toString());
    }

    public async hold(): Promise<void>
    {
        await this.setDatapoint(this.channel, this.currentPositionDataPointUpdate, '1');
    }

    public isOpen(): boolean
    {
        return this.currentPosition <= 1;
    }

    public isClosed(): boolean
    {
        return this.currentPosition >= 100;
    }

    protected handleChannelState(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelState(datapoints);

        if(datapoints[this.currentPositionDataPointGet]) {
            this.currentPosition = parseInt(datapoints[this.currentPositionDataPointGet]);
        }

        if(datapoints[this.targetPositionDataPointGet]) {
            this.targetPosition = parseInt(datapoints[this.targetPositionDataPointGet]);
        }

        if(datapoints[this.stateDataPointGet]) {
            this.state = Jalousie.parseJalousieState(datapoints[this.stateDataPointGet]);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelUpdate(datapoints);

        let changed:boolean = false;
        if(datapoints[this.currentPositionDataPointGet]) {
            this.currentPosition = parseInt(datapoints[this.currentPositionDataPointGet]);
            changed = true;
        }

        if(datapoints[this.targetPositionDataPointGet]) {
            this.targetPosition = parseInt(datapoints[this.targetPositionDataPointGet]);
            changed = true;
        }

        if(datapoints[this.stateDataPointGet]) {
            this.state = Jalousie.parseJalousieState(datapoints[this.stateDataPointGet]);
            changed = true;
        }

        if(changed)
            this.changed();
    }

    private static parseJalousieState(value:string): JalousieState
    {
        switch (value) {
            default:
            case '0':
            case '1':
                return JalousieState.Stopped;
            case '2':
                return JalousieState.Increasing;
            case '3':
                return JalousieState.Decreasing;
        }
    }
}

export enum JalousieState
{
    Stopped = 0,
    Increasing = 2,
    Decreasing = 3
}
