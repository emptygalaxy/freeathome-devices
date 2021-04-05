import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";
import {FunctionId} from "../FunctionId";
import {MqttClient} from "mqtt";
import {LogInterface} from "../LogInterface";

export enum LightEvent
{
    TURN_ON = 'turn on',
    TURNED_ON = 'turned on',
    TURN_OFF = 'turn off',
    TURNED_OFF = 'turned off',
}

export class Light extends SchakelAktor
{
    public static functionIds: FunctionId[] = [FunctionId.FID_DES_LIGHT_SWITCH_ACTUATOR];

    constructor(logger: LogInterface, connection: Connection, serialNumber: string, channel: number, mqttClient?: MqttClient)
    {
        super(logger, connection, serialNumber, channel, mqttClient);

        // this.on(LightEvent.TURNED_ON, () => {this.logger.log(this.displayName, 'Light turned on')});
        // this.on(LightEvent.TURNED_OFF, () => {this.logger.log(this.displayName, 'Light turned off')});
    }

    public async turnOn(): Promise<void>
    {
        this.emit(LightEvent.TURN_ON);
        await this.setDatapoint(this.channel, this.actuatorDatapoint, this.onValue);
    }

    protected turnedOn(): void
    {
        this.active = true;
        this.emit(LightEvent.TURNED_ON);
        this.changed();
    }

    public async turnOff(): Promise<void>
    {
        this.emit(LightEvent.TURN_OFF);
        await this.setDatapoint(this.channel, this.actuatorDatapoint, this.offValue);
    }

    protected turnedOff(): void
    {
        this.active = false;
        this.emit(LightEvent.TURNED_OFF);
        this.changed();
    }

    public changed(): void {
        super.changed();

        this.logger.info(`[${this.getIdentifierName()}] Light ` + (this.isOn() ? 'on' : 'off'));

        this.mqttClient?.publish(
            ['freeathome', this.serialNumber, 'light', this.channel].join('/'),
            this.active?'on':'off'
        );
    }
}