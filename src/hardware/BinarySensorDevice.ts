import {Connection} from "../Connection";
import {BinarySensor} from "./BinarySensor";
import {BridgeDevice} from "./BridgeDevice";

export class BinarySensorDevice extends BridgeDevice
{
    public readonly binarySensor?: BinarySensor;

    constructor(connection:Connection, serialNumber:string, channels:number)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.binarySensor = new BinarySensor(connection, serialNumber, channel);
            this.devices.push(this.binarySensor);
        }
    }
}