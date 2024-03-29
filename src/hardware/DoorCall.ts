import {ChannelInfo, Connection, DeviceInfo} from '../Connection';
import {SubDevice} from '../SubDevice';
import {DoorOpener} from './DoorOpener';
import {FunctionId} from '../FunctionId';
import {MqttClient} from 'mqtt';
import {LogInterface} from '../LogInterface';
// import {PairingId} from "../PairingId";

export enum DoorCallEvent {
  TRIGGER = 'trigger',
  TRIGGERED = 'triggered',
}

/**
 * @event DoorCallEvent.TRIGGER
 */
export class DoorCall extends SubDevice {
  public static functionIds: FunctionId[] = [
    FunctionId.FID_DES_DOOR_RINGING_SENSOR,
    FunctionId.FID_DES_LEVEL_CALL_SENSOR,
    FunctionId.FID_DES_LEVEL_CALL_ACTUATOR,
  ];

  public readonly doorOpener?: DoorOpener;

  private readonly sensorDataPoint: string = 'odp0000';
  // private readonly sensorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;
  private readonly sensorValue: string = '1';

  private readonly actuatorChannel?: number;

  private readonly actuatorDataPoint: string = 'idp0000';
  // private readonly actuatorDataPointPairingId: PairingId = PairingId.AL_INFO_ON_OFF;
  private readonly actuatorValue: string = '1';

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    doorOpener: DoorOpener | undefined,
    channel: number,
    actuatorChannel?: number,
    mqttClient?: MqttClient
  ) {
    super(logger, connection, serialNumber, channel, mqttClient);

    this.doorOpener = doorOpener;
    this.actuatorChannel = actuatorChannel;

    // this.on(DoorCallEvent.TRIGGER, () => { this.logger.log(this.displayName, 'Calling'); });
    // this.on(DoorCallEvent.TRIGGERED, () => { this.logger.log(this.displayName, 'RING!'); });

    // if(this.triggerEnabled())
    // {
    //     setTimeout(() => {
    //         this.trigger();
    //     }, 2000);
    // }
  }

  public triggerEnabled(): boolean {
    return this.actuatorChannel !== null;
  }

  public async trigger() {
    if (this.triggerEnabled()) {
      this.emit(DoorCallEvent.TRIGGER);
      await this.setDatapoint(
        Number(this.actuatorChannel),
        this.actuatorDataPoint,
        this.actuatorValue
      );
    } else {
      this.logger.error('Illegal DoorCall trigger');
    }
  }

  private triggered() {
    this.emit(DoorCallEvent.TRIGGERED);

    this.logger.info(`[${this.getIdentifierName()}] DoorCall called`);

    this.mqttClient?.publish(
      ['freeathome', this.serialNumber, 'doorcall', this.channel].join('/'),
      'call'
    );
  }

  public handleState(info: DeviceInfo) {
    // this.logger.log(info);
    super.handleState(info);

    if (this.actuatorChannel) {
      const ch: string = SubDevice.formatChannelString(this.actuatorChannel);
      if (info.channels[ch]) {
        const channel: ChannelInfo = info.channels[ch];
        this.displayName = channel.displayName;
        this.floor = channel.floor;
        this.room = channel.room;
      }
    }

    if (this.doorOpener) {
      this.floor = this.doorOpener.getFloor();
      this.room = this.doorOpener.getRoom();
    }
  }

  protected handleChannelUpdate(datapoints: {[dp: string]: string}) {
    super.handleChannelUpdate(datapoints);

    if (datapoints[this.sensorDataPoint] === this.sensorValue) {
      this.triggered();
    } else {
      this.logger.warn(
        this.serialNumber,
        this.channel,
        'unknown datapoint value',
        datapoints
      );
    }
  }
}
