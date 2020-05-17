import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";


export enum DoorCallEvent
{
    TRIGGER = 'trigger',
    TRIGGERED = 'triggered'
}

/**
 * @event DoorCallEvent.TRIGGER
 */
export  class DoorCall extends SubDevice
{
    private actuatorChannel?:number;
    private readonly actuatorDataPoint:string = 'idp0000';
    private readonly actuatorValue:string = '1';

    constructor(connection:Connection, serialNumber:string, channel:number, actuatorChannel?:number)
    {
        super(connection, serialNumber, channel);

        this.actuatorChannel = actuatorChannel;

        // this.on(DoorCallEvent.TRIGGER, () => { console.log(this.displayName, 'Calling'); });
        // this.on(DoorCallEvent.TRIGGERED, () => { console.log(this.displayName, 'RING!'); });

        // if(this.triggerEnabled())
        // {
        //     setTimeout(() => {
        //         this.trigger();
        //     }, 2000);
        // }
    }

    public triggerEnabled(): boolean
    {
        return this.actuatorChannel != null;
    }

    public trigger()
    {
        if(this.triggerEnabled())
        {
            this.emit(DoorCallEvent.TRIGGER);
            this.setDatapoint(Number(this.actuatorChannel), this.actuatorDataPoint, this.actuatorValue);

        } else {
            console.error('Illegal DoorCall trigger');
        }
    }


    private triggered()
    {
        this.emit(DoorCallEvent.TRIGGERED);
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.triggered();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}