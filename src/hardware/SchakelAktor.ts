import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";
import {FunctionId} from "../FunctionId";
// import {PairingId} from "../PairingId";
import {MqttClient} from "mqtt";
import {LogInterface} from "../LogInterface";

export enum SchakelAktorEvent
{
    TURN_ON = 'turn on',
    TURNED_ON = 'turned on',
    TURN_OFF = 'turn off',
    TURNED_OFF = 'turned off',
}

export class SchakelAktor extends SubDevice
{
    public static functionIds: FunctionId[] = [FunctionId.FID_SWITCH_ACTUATOR, FunctionId.FID_DES_LIGHT_SWITCH_ACTUATOR, FunctionId.FID_BLIND_ACTUATOR];

    protected active:boolean = false;
    protected readonly sensorDatapoint:string = 'odp0000';
    // protected readonly sensorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;

    protected readonly actuatorDatapoint:string = 'idp0000';
    // protected readonly actuatorDataPointPairingId: PairingId = PairingId.AL_SWITCH_ON_OFF;

    protected readonly onValue:string = '1';
    protected readonly offValue:string = '0';

    constructor(logger: LogInterface, connection: Connection, serialNumber: string, channel: number, mqttClient?: MqttClient)
    {
        super(logger, connection, serialNumber, channel, mqttClient);

        // this.on(SchakelAktorEvent.TURN_ON, () => {this.logger.log(this.displayName, 'SchakelAktor turning on')});
        // this.on(SchakelAktorEvent.TURNED_ON, () => {this.logger.log(this.displayName, 'SchakelAktor turned on')});
        // this.on(SchakelAktorEvent.TURN_OFF, () => {this.logger.log(this.displayName, 'SchakelAktor turning off')});
        // this.on(SchakelAktorEvent.TURNED_OFF, () => {this.logger.log(this.displayName, 'SchakelAktor turned off')});
    }

    public async turnOn(): Promise<void>
    {
        this.emit(SchakelAktorEvent.TURN_ON);
        await this.setDatapoint(this.channel, this.actuatorDatapoint, this.onValue);
    }

    protected turnedOn(): void
    {
        this.active = true;
        this.emit(SchakelAktorEvent.TURNED_ON);
        this.changed();
    }

    public async turnOff(): Promise<void>
    {
        this.emit(SchakelAktorEvent.TURN_OFF);
        await this.setDatapoint(this.channel, this.actuatorDatapoint, this.offValue);
    }

    protected turnedOff(): void
    {
        this.active = false;
        this.emit(SchakelAktorEvent.TURNED_OFF);
        this.changed();
    }

    public isOn():boolean
    {
        return this.active;
    }

    protected handleChannelState(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelState(datapoints);

        if(datapoints[this.sensorDatapoint] == this.onValue) {
            this.active = true;
        } else if(datapoints[this.sensorDatapoint] == this.offValue) {
            this.active = false;
        } else {
            this.logger.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelUpdate(datapoints);

        if(datapoints[this.sensorDatapoint] == this.onValue) {
            this.turnedOn();
        } else if(datapoints[this.sensorDatapoint] == this.offValue) {
            this.turnedOff();
        } else {
            this.logger.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }

    public changed(): void {
        super.changed();

        this.logger.info(`[${this.getIdentifierName()}] Schakel Aktor ` + (this.isOn() ? 'on' : 'off'));

        this.mqttClient?.publish(
            ['freeathome', this.serialNumber, 'schakelaktor', this.channel].join('/'),
            this.active?'on':'off'
        );
    }
}