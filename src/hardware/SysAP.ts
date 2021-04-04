import {Device} from "../Device";
import {DeviceInfo} from "../Connection";

export class SysAP extends Device
{
    public handleState(info: DeviceInfo) {
        super.handleState(info);
        this.logger?.log('SysAP state', info);
    }

    public handleUpdate(info: DeviceInfo) {
        super.handleUpdate(info);
        this.logger?.log('SysAP update', info.channels);
    }
}