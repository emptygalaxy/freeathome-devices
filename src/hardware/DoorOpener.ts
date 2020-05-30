import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";
import {FunctionId} from "../FunctionId";
import {PairingId} from "../PairingId";

export enum DoorOpenerEvent{
    OPEN,
    OPENED,
    CLOSE,
    CLOSED
}

/**
 * @event DeviceEvent.CHANGE
 * @event DoorOpenerEvent.OPEN
 * @event DoorOpenerEvent.OPENED
 * @event DoorOpenerEvent.CLOSE
 * @event DoorOpenerEvent.CLOSED
 */
export class DoorOpener extends SubDevice
{
    public static functionIds: FunctionId[] = [FunctionId.FID_DES_DOOR_OPENER_ACTUATOR];

    public _isOpening: boolean = false;
    public _isOpen: boolean = false;
    private readonly sensorDataPoint: string = 'odp0000';
    private readonly sensorDataPointPairingId: PairingId = PairingId.AL_INFO_ON_OFF;

    private readonly actuatorDataPoint: string = 'idp0000';
    private readonly actuatorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;

    private readonly openValue: string = '1';
    private readonly closeValue: string = '0';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(DoorOpenerEvent.OPEN, () => {console.log(this.displayName, 'Door opening')});
        // this.on(DoorOpenerEvent.CLOSE, () => {console.log(this.displayName, 'Door closing')});
        // this.on(DoorOpenerEvent.OPENED, () => {console.log(this.displayName, 'Door opened')});
        // this.on(DoorOpenerEvent.CLOSED, () => {console.log(this.displayName, 'Door closed')});
    }

    public open()
    {
        this._isOpening = true;
        this.emit(DoorOpenerEvent.OPEN);
        this.changed();

        this.setDatapoint(this.channel, this.actuatorDataPoint, this.openValue);
    }

    private opening()
    {
        this._isOpening = true;

        this.emit(DoorOpenerEvent.OPEN);
        this.changed();
    }

    private opened()
    {
        this._isOpening = false;
        this._isOpen = true;

        this.emit(DoorOpenerEvent.OPENED);
        this.changed();
    }

    public close()
    {
        this._isOpening = false;

        this.emit(DoorOpenerEvent.CLOSE);
        this.setDatapoint(this.actuatorChannel, this.actuatorDataPoint, this.closeValue);
    }

    private closing()
    {
        this._isOpening = false;

        this.emit(DoorOpenerEvent.CLOSE);
        this.changed();
    }

    private closed()
    {
        this._isOpening = false;
        this._isOpen = false;

        this.emit(DoorOpenerEvent.CLOSED);
        this.changed();
    }

    public isOpening(): boolean
    {
        return this._isOpening;
    }

    public isOpen(): boolean
    {
        return this._isOpen;
    }


    handleChannelState(datapoints:{[dp:string]: string})
    {
        if(datapoints[this.sensorDataPoint] == this.openValue) {
            this._isOpen = true;
        } else if(datapoints[this.sensorDataPoint] == this.closeValue) {
            this._isOpen = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints[this.sensorDataPoint] == this.openValue) {
            this.opened();
        } else if(datapoints[this.actuatorDataPoint] == this.openValue) {
            this.opening();
        } else if(datapoints[this.sensorDataPoint] == this.closeValue) {
            this.closed();
        } else if(datapoints[this.actuatorDataPoint] == this.closeValue) {
            this.closing();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}