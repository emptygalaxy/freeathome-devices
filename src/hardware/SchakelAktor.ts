import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";
import {FunctionId} from "../FunctionId";
// import {PairingId} from "../PairingId";
import {MqttClient} from "mqtt";

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
    private readonly sensorDatapoint:string = 'odp0000';
    // private readonly sensorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;

    private readonly actuatorDatapoint:string = 'idp0000';
    // private readonly actuatorDataPointPairingId: PairingId = PairingId.AL_SWITCH_ON_OFF;

    private readonly onValue:string = '1';
    private readonly offValue:string = '0';

    constructor(connection:Connection, serialNumber:string, channel:number, mqttClient?: MqttClient)
    {
        super(connection, serialNumber, channel, mqttClient);

        // this.on(SchakelAktorEvent.TURN_ON, () => {console.log(this.displayName, 'SchakelAktor turning on')});
        // this.on(SchakelAktorEvent.TURNED_ON, () => {console.log(this.displayName, 'SchakelAktor turned on')});
        // this.on(SchakelAktorEvent.TURN_OFF, () => {console.log(this.displayName, 'SchakelAktor turning off')});
        // this.on(SchakelAktorEvent.TURNED_OFF, () => {console.log(this.displayName, 'SchakelAktor turned off')});
    }

    public turnOn(): void
    {
        this.emit(SchakelAktorEvent.TURN_ON);
        this.setDatapoint(this.channel, this.actuatorDatapoint, this.onValue);
    }

    protected turnedOn(): void
    {
        this.active = true;
        this.emit(SchakelAktorEvent.TURNED_ON);
        this.changed();
    }

    public turnOff(): void
    {
        this.emit(SchakelAktorEvent.TURN_OFF);
        this.setDatapoint(this.channel, this.actuatorDatapoint, this.offValue);
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
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
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
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}