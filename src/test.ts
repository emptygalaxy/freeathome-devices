import {DeviceManager} from './DeviceManager';
// import {ClientConfiguration} from 'freeathome-api';
import {ConnectionEvent} from './Connection';
import {Device} from './Device';
import {BridgeDevice} from './hardware/BridgeDevice';

// const config: ClientConfiguration = require('../sysap.json');
import * as config from './sysap.json';
const dm = new DeviceManager(config);

const logger = console;

dm.on(ConnectionEvent.DEVICES, () => {
  const devices: Device[] = dm.getDevices();
  devices.forEach((device: Device) => {
    logger.log('Device', device.constructor.name);

    if(device instanceof BridgeDevice) {
      (device as BridgeDevice).getSubDevices().forEach((subDevice: Device) => {
        logger.log('SubDevice', subDevice.constructor.name, subDevice.getFloor(), subDevice.getRoom());
      });
    }
  });
});