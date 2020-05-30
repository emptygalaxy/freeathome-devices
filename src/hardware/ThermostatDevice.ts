import {Device} from "../Device";
import {Connection} from "../Connection";
import {Thermostat} from "./Thermostat";

export class ThermostatDevice extends Device
{
    public readonly thermostat?:Thermostat;

    constructor(connection:Connection, serialNumber:string, channels:number=1)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.thermostat = new Thermostat(connection, serialNumber, channel);
            this.devices.push(this.thermostat);
        }
    }
}