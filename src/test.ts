import {DeviceManager} from "./DeviceManager";
import {ClientConfiguration} from "freeathome-api";
import {ConnectionEvent} from "./Connection";
import {Device} from "./Device";
import {BridgeDevice} from "./hardware/BridgeDevice";
import {SubDevice} from "./SubDevice";

let config: ClientConfiguration = require('../sysap.json');
let dm = new DeviceManager(config);

dm.on(ConnectionEvent.DEVICES, () => {
    let devices:Device[] = dm.getDevices();
    devices.forEach((device:Device) => {
        console.log('Device', device.constructor.name);

        if(device instanceof BridgeDevice) {
            (device as BridgeDevice).getSubDevices().forEach((subDevice: Device) => {
                console.log('SubDevice', subDevice.constructor.name, subDevice.getFloor(), subDevice.getRoom());
            });
        }
    });
});