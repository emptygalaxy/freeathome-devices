import {Connection} from "../Connection";
import {Thermostat} from "./Thermostat";
import {BridgeDevice} from "./BridgeDevice";
import {MqttClient} from "mqtt";

export class ThermostatDevice extends BridgeDevice
{
    public readonly thermostat?:Thermostat;

    constructor(connection:Connection, serialNumber:string, channels:number=1, mqttClient?: MqttClient)
    {
        super(connection, serialNumber, mqttClient);

        for(let channel=0; channel<channels; channel++)
        {
            this.thermostat = new Thermostat(connection, serialNumber, channel);
            this.devices.push(this.thermostat);
        }
    }
}