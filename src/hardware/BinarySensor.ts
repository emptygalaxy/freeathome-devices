import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";

export enum BinarySensorEvent
{
    ACTIVATED = 'activated',
    DEACTIVATED = 'deactivated',
}

export class BinarySensor extends SubDevice
{
    private active:boolean = false;

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(BinarySensorEvent.ACTIVATED, () => {console.log(this.displayName, 'BinarySensor turned on')});
        // this.on(BinarySensorEvent.DEACTIVATED, () => {console.log(this.displayName, 'BinarySensor turned off')});
    }

    private activated():void
    {
        this.active = true;
        this.emit(BinarySensorEvent.ACTIVATED);
    }

    private deactivated():void
    {
        this.active = false;
        this.emit(BinarySensorEvent.DEACTIVATED);
    }

    public isActive():boolean
    {
        return this.active;
    }

    handleChannelState(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.active = true;
        } else if(datapoints.odp0000 == '0') {
            this.active = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.activated();
        } else if(datapoints.odp0000 == '0') {
            this.deactivated();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}