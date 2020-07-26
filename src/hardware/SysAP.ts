import {Device} from "../Device";
import {DeviceInfo} from "../Connection";

export class SysAP extends Device
{
    public handleState(info: DeviceInfo) {
        super.handleState(info);
        console.log('SysAP state', info);
    }

    public handleUpdate(info: DeviceInfo) {
        super.handleUpdate(info);
        console.log('SysAP update', info.channels);
    }
}