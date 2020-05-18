import {Connection} from "../Connection";
import {SchakelAktor} from "./SchakelAktor";
import {BridgeDevice} from "./BridgeDevice";

export class SchakelAktorDevice extends BridgeDevice
{
    constructor(connection:Connection, serialNumber:string, channels:number)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new SchakelAktor(connection, serialNumber, channel));
        }
    }
}