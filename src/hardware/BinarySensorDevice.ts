import {Connection} from '../Connection';
import {BinarySensor} from './BinarySensor';
import {BridgeDevice} from './BridgeDevice';
import {MqttClient} from 'mqtt';
import {LogInterface} from '../LogInterface';

export class BinarySensorDevice extends BridgeDevice {
  public readonly binarySensor?: BinarySensor;

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    channels: number,
    mqttClient?: MqttClient
  ) {
    super(logger, connection, serialNumber, mqttClient);

    for (let channel = 0; channel < channels; channel++) {
      this.binarySensor = new BinarySensor(
        this.logger,
        this.connection,
        this.serialNumber,
        channel
      );
      this.devices.push(this.binarySensor);
    }
  }
}
