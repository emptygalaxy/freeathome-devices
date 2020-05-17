import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";

export enum SchakelAktorEvent
{
    TURN_ON = 'turn on',
    TURNED_ON = 'turned on',
    TURN_OFF = 'turn off',
    TURNED_OFF = 'turned off',
}

export class SchakelAktor extends SubDevice
{
    protected active:boolean = false;

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(SchakelAktorEvent.TURN_ON, () => {console.log(this.displayName, 'SchakelAktor turning on')});
        // this.on(SchakelAktorEvent.TURNED_ON, () => {console.log(this.displayName, 'SchakelAktor turned on')});
        // this.on(SchakelAktorEvent.TURN_OFF, () => {console.log(this.displayName, 'SchakelAktor turning off')});
        // this.on(SchakelAktorEvent.TURNED_OFF, () => {console.log(this.displayName, 'SchakelAktor turned off')});
    }

    public turnOn():void
    {
        this.emit(SchakelAktorEvent.TURN_ON);
    }

    protected turnedOn():void
    {
        this.active = true;
        this.emit(SchakelAktorEvent.TURNED_ON);
    }

    public turnOff():void
    {
        this.emit(SchakelAktorEvent.TURN_OFF);
    }

    protected turnedOff():void
    {
        this.active = false;
        this.emit(SchakelAktorEvent.TURNED_OFF);
    }

    public isOn():boolean
    {
        return this.active;
    }

    protected handleChannelState(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.active = true;
        } else if(datapoints.odp0000 == '0') {
            this.active = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.turnedOn();
        } else if(datapoints.odp0000 == '0') {
            this.turnedOff();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}