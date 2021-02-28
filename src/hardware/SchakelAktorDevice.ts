import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";
import {BridgeDevice} from "./BridgeDevice";
import {MqttClient} from "mqtt";

export class SchakelAktorDevice extends BridgeDevice
{
    constructor(connection:Connection, serialNumber:string, channels:number, mqttClient?: MqttClient)
    {
        super(connection, serialNumber, mqttClient);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new SchakelAktor(connection, serialNumber, channel));
        }
    }
}