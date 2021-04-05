import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";
import {BridgeDevice} from "./BridgeDevice";
import {MqttClient} from "mqtt";
import {LogInterface} from "../LogInterface";

export class SchakelAktorDevice extends BridgeDevice
{
    constructor(logger: LogInterface, connection:Connection, serialNumber:string, channels:number, mqttClient?: MqttClient)
    {
        super(logger, connection, serialNumber, mqttClient);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new SchakelAktor(this.logger, this.connection, this.serialNumber, channel));
        }
    }
}