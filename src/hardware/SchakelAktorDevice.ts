import {Device} from "../Device";
import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";

export class SchakelAktorDevice extends Device
{
    private devices:Device[] = [];

    constructor(connection:Connection, serialNumber:string, channels:number)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new SchakelAktor(connection, serialNumber, channel));
        }
    }

    public getSubDevices():Device[]
    {
        return this.devices;
    }
}