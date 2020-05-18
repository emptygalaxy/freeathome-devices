import {Connection} from "../Connection";
import {BinarySensor} from "./BinarySensor";
import {BridgeDevice} from "./BridgeDevice";

export class BinarySensorDevice extends BridgeDevice
{
    constructor(connection:Connection, serialNumber:string, channels:number)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.devices.push(new BinarySensor(connection, serialNumber, channel));
        }
    }
}