import {Connection} from "../Connection";
import {BinarySensor} from "./BinarySensor";
import {BridgeDevice} from "./BridgeDevice";
import {MqttClient} from "mqtt";

export class BinarySensorDevice extends BridgeDevice
{
    public readonly binarySensor?: BinarySensor;

    constructor(connection:Connection, serialNumber:string, channels:number, mqttClient?: MqttClient)
    {
        super(connection, serialNumber, mqttClient);

        for(let channel=0; channel<channels; channel++)
        {
            this.binarySensor = new BinarySensor(connection, serialNumber, channel);
            this.devices.push(this.binarySensor);
        }
    }
}