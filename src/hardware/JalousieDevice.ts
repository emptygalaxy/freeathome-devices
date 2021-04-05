import {Connection} from "../Connection";
import {Jalousie} from "./Jalousie";
import {BridgeDevice} from "./BridgeDevice";
import {MqttClient} from "mqtt";
import {LogInterface} from "../LogInterface";

export class JalousieDevice extends BridgeDevice
{
    public readonly jalousie?:Jalousie;

    constructor(logger: LogInterface, connection:Connection, serialNumber:string, channels:number=1, mqttClient?: MqttClient)
    {
        super(logger, connection, serialNumber, mqttClient);

        for(let channel=0; channel<channels; channel++)
        {
            this.jalousie = new Jalousie(this.logger, this.connection, this.serialNumber, channel);
            this.devices.push(this.jalousie);
        }
    }
}