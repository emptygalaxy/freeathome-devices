import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";

export enum BinarySensorEvent
{
    ACTIVATED = 'activated',
    DEACTIVATED = 'deactivated',
}

/**
 * @event DeviceEvent.CHANGE
 * @event BinarySensorEvent.ACTIVATED
 * @event BinarySensorEvent.DEACTIVATED
 */
export class BinarySensor extends SubDevice
{
    private active:boolean = false;
    private readonly datapoint:string = 'odp0000';
    private readonly activeValue:string = '1';
    private readonly inactiveValue:string = '0';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(BinarySensorEvent.ACTIVATED, () => {console.log(this.displayName, 'BinarySensor turned on')});
        // this.on(BinarySensorEvent.DEACTIVATED, () => {console.log(this.displayName, 'BinarySensor turned off')});
    }

    private activated(): void
    {
        this.active = true;
        this.emit(BinarySensorEvent.ACTIVATED);
        this.changed();
    }

    private deactivated(): void
    {
        this.active = false;
        this.emit(BinarySensorEvent.DEACTIVATED);
        this.changed();
    }

    public isActive(): boolean
    {
        return this.active;
    }

    handleChannelState(datapoints:{[dp:string]: string}): void
    {
        if(datapoints[this.datapoint] == this.activeValue) {
            this.active = true;
        } else if(datapoints[this.datapoint] == this.inactiveValue) {
            this.active = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string}): void
    {
        if(datapoints[this.datapoint] == this.activeValue) {
            this.activated();
        } else if(datapoints[this.datapoint] == this.inactiveValue) {
            this.deactivated();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}