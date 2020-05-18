import {Device} from "../Device";

export class BridgeDevice extends Device
{
    protected devices:Device[] = [];

    public getSubDevices():Device[]
    {
        return this.devices;
    }
}