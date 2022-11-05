import {Device} from './Device';
import {ChannelInfo, Connection, DeviceInfo} from './Connection';
import {FunctionId} from './FunctionId';
import {MqttClient} from 'mqtt';
import {LogInterface} from './LogInterface';

export enum DeviceEvent {
  CHANGE = 'change',
}

export class SubDevice extends Device {
  public readonly channel: number;

  private functionId?: FunctionId;
  protected lastChannelUpdate?: {[dp: string]: string};

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    channel: number,
    mqttClient?: MqttClient
  ) {
    super(logger, connection, serialNumber, mqttClient);

    this.channel = channel;
  }

  public changed(): void {
    this.emit(DeviceEvent.CHANGE);
  }

  public getFunctionId(): FunctionId | undefined {
    return this.functionId;
  }

  public handleState(info: DeviceInfo) {
    super.handleState(info);

    for (const channelId in info.channels) {
      const channelNumber: number = SubDevice.parseChannelString(channelId);
      if (channelNumber === this.channel) {
        const channel: ChannelInfo = info.channels[channelId];

        this.displayName = channel.displayName;
        this.floor = channel.floor;
        this.room = channel.room;

        this.functionId = SubDevice.parseFunctionId(channel.functionId);

        this.handleChannelState(channel.datapoints);
      }
    }
  }

  protected handleChannelState(datapoints: {[dp: string]: string}) {
    this.lastChannelUpdate = datapoints;
  }

  public handleUpdate(info: DeviceInfo) {
    super.handleUpdate(info);

    for (const channelId in info.channels) {
      const channelNumber: number = SubDevice.parseChannelString(channelId);
      if (channelNumber === this.channel) {
        const channel: ChannelInfo = info.channels[channelId];
        this.handleChannelUpdate(channel.datapoints);
      }
    }
  }

  protected handleChannelUpdate(datapoints: {[dp: string]: string}) {
    this.lastChannelUpdate = datapoints;
  }

  public static parseFunctionId(functionId: string): FunctionId | undefined {
    const functionIdNumber: number = Number.parseInt(functionId, 16);
    if (functionIdNumber in FunctionId) {
      return functionIdNumber;
    }

    return undefined;
  }
}
