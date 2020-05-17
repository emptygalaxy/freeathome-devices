import {DeviceManager} from "./DeviceManager";
import {ClientConfiguration} from "freeathome-api";

let config:ClientConfiguration = new ClientConfiguration(
    'hostname',
    'username',
    'password',
);
new DeviceManager(config);