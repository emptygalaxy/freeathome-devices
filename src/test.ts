import {DeviceManager} from "./DeviceManager";
import {ClientConfiguration} from "freeathome-api";

let config: ClientConfiguration = require('../sysap.json');
new DeviceManager(config);