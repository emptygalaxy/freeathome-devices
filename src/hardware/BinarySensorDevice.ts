import {Device} from "../Device";
import {Connection} from "../Connection";
import {BinarySensor} from "./BinarySensor";

export class BinarySensorDevice extends Device
{
    private devices:Device[] = [];

    constructor(connection:Connection, serialNumber:string, channels:number)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new BinarySensor(connection, serialNumber, channel));
        }
    }

    public getSubDevices():Device[]
    {
        return this.devices;
    }
}