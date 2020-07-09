import {Connection} from "../Connection";
import {Jalousie} from "./Jalousie";
import {BridgeDevice} from "./BridgeDevice";

export class JalousieDevice extends BridgeDevice
{
    public readonly jalousie?:Jalousie;

    constructor(connection:Connection, serialNumber:string, channels:number=1)
    {
        super(connection, serialNumber);

        for(let channel=0; channel<channels; channel++)
        {
            this.jalousie = new Jalousie(connection, serialNumber, channel);
            this.devices.push(this.jalousie);
        }
    }
}