import {Connection} from "../Connection";
import {DeviceEvent, SubDevice} from "../SubDevice";
import {FunctionId} from "../FunctionId";
import {MqttClient} from "mqtt";
import {LogInterface} from "../LogInterface";
// import {PairingId} from "../PairingId";

export enum DoorOpenerEvent{
    OPEN = 'open',
    OPENED = 'opened',
    CLOSE = 'close',
    CLOSED = 'closed'
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
    // private readonly sensorDataPointPairingId: PairingId = PairingId.AL_INFO_ON_OFF;

    private readonly actuatorDataPoint: string = 'idp0000';
    // private readonly actuatorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;

    private readonly openValue: string = '1';
    private readonly closeValue: string = '0';

    constructor(logger: LogInterface, connection: Connection, serialNumber: string, channel: number, mqttClient?: MqttClient)
    {
        super(logger, connection, serialNumber, channel, mqttClient);

        // this.on(DoorOpenerEvent.OPEN, () => {this.logger.log(this.displayName, 'Door opening')});
        // this.on(DoorOpenerEvent.CLOSE, () => {this.logger.log(this.displayName, 'Door closing')});
        // this.on(DoorOpenerEvent.OPENED, () => {this.logger.log(this.displayName, 'Door opened')});
        // this.on(DoorOpenerEvent.CLOSED, () => {this.logger.log(this.displayName, 'Door closed')});
        // this.on(DeviceEvent.CHANGE, () => {this.logger.log(this.displayName, 'Door updated')});
    }

    public async open()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener open`);

        this._isOpening = true;
        this.emit(DoorOpenerEvent.OPEN);
        this.changed();

        await this.setDatapoint(this.channel, this.actuatorDataPoint, this.openValue);
    }

    private opening()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener opening`);

        this._isOpening = true;

        this.emit(DoorOpenerEvent.OPEN);
        this.changed();
    }

    private opened()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener opened`);

        this._isOpening = false;
        this._isOpen = true;

        this.emit(DoorOpenerEvent.OPENED);
        this.changed();
    }

    public async close()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener close`);

        this._isOpening = false;

        this.emit(DoorOpenerEvent.CLOSE);
        this.changed();

        await this.setDatapoint(this.channel, this.actuatorDataPoint, this.closeValue);
    }

    private closing()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener closing`);

        this._isOpening = false;

        this.emit(DoorOpenerEvent.CLOSE);
        this.changed();
    }

    private closed()
    {
        this.logger.info(`[${this.getIdentifierName()}] DoorOpener closed`);

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


    protected handleChannelState(datapoints:{[dp:string]: string})
    {
        super.handleChannelState(datapoints);

        if(datapoints[this.sensorDataPoint] == this.openValue) {
            this._isOpen = true;
        } else if(datapoints[this.sensorDataPoint] == this.closeValue) {
            this._isOpen = false;
        } else {
            this.logger.warn(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        // this.logger.log('handleChannelUpdate', datapoints);
        super.handleChannelUpdate(datapoints);

        if(datapoints[this.sensorDataPoint] == this.openValue) {
            this.opened();
        } else if(datapoints[this.actuatorDataPoint] == this.openValue) {
            this.opening();
        } else if(datapoints[this.sensorDataPoint] == this.closeValue) {
            this.closed();
        } else if(datapoints[this.actuatorDataPoint] == this.closeValue) {
            this.closing();
        } else {
            this.logger.warn(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }

    public changed(): void {
        super.changed();

        this.mqttClient?.publish(
            ['freeathome', this.serialNumber, 'dooropener', this.channel].join('/'),
            this._isOpen?'open':'closed'
        );
    }
}