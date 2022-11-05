import {Connection, DeviceInfo} from './Connection';
import {EventEmitter} from 'events';
import {MqttClient} from 'mqtt';
import {LogInterface} from './LogInterface';

export class Device extends EventEmitter {
  protected displayName?: string;
  protected floor?: string;
  protected room?: string;

  constructor(
    public readonly logger: LogInterface,
    public readonly connection: Connection,
    public readonly serialNumber: string,
    protected readonly mqttClient?: MqttClient
  ) {
    super();
  }

  public getDisplayName(): string | undefined {
    return this.displayName;
  }

  public getFloor(): string | undefined {
    return this.floor;
  }

  public getRoom(): string | undefined {
    return this.room;
  }

  public getIdentifierName(): string {
    return [this.floor, this.room, this.displayName, this.constructor.name]
      .filter((value?: string) => {
        return value !== undefined && value !== null && value !== '';
      })
      .join(' ');
  }

  public handleState(info: DeviceInfo) {
    this.displayName = info.typeName;
    // this.logger.log(this.displayName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleUpdate(info: DeviceInfo) {
    // this.logger.info('update', info);
  }

  protected async setDatapoint(
    channel: number,
    datapoint: string,
    value: string
  ): Promise<void> {
    const channelString = Device.formatChannelString(channel);

    try {
      await this.connection.setDatapoint(
        this.serialNumber,
        channelString,
        datapoint,
        value
      );
    } catch (err) {
      this.logger.error(
        'Error with setDatapoint',
        [channel, datapoint, value],
        err
      );
    }
  }

  static parseChannelString(channel: string): number {
    const num: string = channel.substr(2);
    return parseInt(num, 16);
  }

  static formatChannelString(channel: number): string {
    return 'ch' + ('0000' + channel.toString(16).toUpperCase()).substr(-4);
  }
}
