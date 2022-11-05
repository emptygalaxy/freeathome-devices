import {Connection} from '../Connection';
import {SubDevice} from '../SubDevice';
import {LogInterface} from '../LogInterface';
// import {FunctionId} from "../FunctionId";
// import {PairingId} from "../PairingId";

export enum BinarySensorEvent {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
}

/**
 * @event DeviceEvent.CHANGE
 * @event BinarySensorEvent.ACTIVATED
 * @event BinarySensorEvent.DEACTIVATED
 */
export class BinarySensor extends SubDevice {
  private active = false;
  private readonly datapoint: string = 'odp0000';
  // private readonly datapointPairingId: PairingId = PairingId.AL_SWITCH_ON_OFF;

  private readonly activeValue: string = '1';
  private readonly inactiveValue: string = '0';

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    channel: number
  ) {
    super(logger, connection, serialNumber, channel);

    // this.on(BinarySensorEvent.ACTIVATED, () => {this.logger.log(this.displayName, 'BinarySensor turned on')});
    // this.on(BinarySensorEvent.DEACTIVATED, () => {this.logger.log(this.displayName, 'BinarySensor turned off')});
  }

  private activated(): void {
    this.active = true;
    this.emit(BinarySensorEvent.ACTIVATED);
    this.changed();
  }

  private deactivated(): void {
    this.active = false;
    this.emit(BinarySensorEvent.DEACTIVATED);
    this.changed();
  }

  public isActive(): boolean {
    return this.active;
  }

  protected handleChannelState(datapoints: {[dp: string]: string}): void {
    super.handleChannelState(datapoints);

    if (datapoints[this.datapoint] === this.activeValue) {
      this.active = true;
    } else if (datapoints[this.datapoint] === this.inactiveValue) {
      this.active = false;
    } else {
      this.logger.log(
        this.serialNumber,
        this.channel.toString(16),
        'unknown initial datapoint value',
        datapoints
      );
    }
  }

  handleChannelUpdate(datapoints: {[dp: string]: string}): void {
    super.handleChannelUpdate(datapoints);

    if (datapoints[this.datapoint] === this.activeValue) {
      this.activated();
    } else if (datapoints[this.datapoint] === this.inactiveValue) {
      this.deactivated();
    } else {
      this.logger.log(
        this.serialNumber,
        this.channel,
        'unknown datapoint value',
        datapoints
      );
    }
  }

  public changed(): void {
    super.changed();

    this.logger.info(
      `[${this.getIdentifierName()}] Binary sensor ` +
        (this.isActive() ? 'active' : 'inactive')
    );

    this.mqttClient?.publish(
      ['freeathome', this.serialNumber, 'binarysensor', this.channel].join('/'),
      this.isActive() ? 'active' : 'inactive'
    );
  }
}
