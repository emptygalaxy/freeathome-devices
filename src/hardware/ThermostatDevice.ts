import {Connection} from '../Connection';
import {Thermostat} from './Thermostat';
import {BridgeDevice} from './BridgeDevice';
import {MqttClient} from 'mqtt';
import {LogInterface} from '../LogInterface';

export class ThermostatDevice extends BridgeDevice {
  public readonly thermostat?: Thermostat;

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    channels = 1,
    mqttClient?: MqttClient
  ) {
    super(logger, connection, serialNumber, mqttClient);

    for (let channel = 0; channel < channels; channel++) {
      this.thermostat = new Thermostat(
        this.logger,
        this.connection,
        this.serialNumber,
        channel
      );
      this.devices.push(this.thermostat);
    }
  }
}
