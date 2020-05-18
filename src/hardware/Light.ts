import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";

export enum LightEvent
{
    TURN_ON = 'turn on',
    TURNED_ON = 'turned on',
    TURN_OFF = 'turn off',
    TURNED_OFF = 'turned off',
}

export class Light extends SchakelAktor
{
    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(LightEvent.TURNED_ON, () => {console.log(this.displayName, 'Light turned on')});
        // this.on(LightEvent.TURNED_OFF, () => {console.log(this.displayName, 'Light turned off')});
    }

    public turnOn():void
    {
        this.emit(LightEvent.TURN_ON);
    }

    protected turnedOn():void
    {
        this.active = true;
        this.emit(LightEvent.TURNED_ON);
        this.changed();
    }

    public turnOff():void
    {
        this.emit(LightEvent.TURN_OFF);
    }

    protected turnedOff():void
    {
        this.active = false;
        this.emit(LightEvent.TURNED_OFF);
        this.changed();
    }
}