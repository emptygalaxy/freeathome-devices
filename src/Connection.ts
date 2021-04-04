import { ClientConfiguration, Logger, SystemAccessPoint } from 'freeathome-api';
import { Subscriber } from 'freeathome-api/dist/lib/Subscriber';
import { BroadcastMessage } from 'freeathome-api/dist/lib/BroadcastMessage';
import {EventEmitter} from 'events';
import Timeout = NodeJS.Timeout;
import {LogInterface} from "./LogInterface";

export enum ConnectionEvent
{
    CONNECT = 'connect',
    CONNECTED = 'connected',
    DISCONNECT = 'disconnect',
    DISCONNECTED = 'disconnected',
    READY = 'ready',
    DEVICES = 'devices',
    BROADCAST = 'broadcast'
}

export type Devices =
{
    [deviceSerial: string]: DeviceInfo;
}

export type DeviceInfo =
{
    serialNumber: string;
    deviceId: string;
    typeName?: string;
    typeId?: string;
    channels: {[channel: string]: ChannelInfo};
}

export type ChannelInfo = {
    datapoints: {[k: string]: string};
    displayName: string;
    floor: string;
    room: string;
    iconId: string;
    functionId: string;
}

/**
 * @event ConnectionEvent.READY
 * @event ConnectionEvent.CONNECT
 * @event ConnectionEvent.CONNECTED
 * @event ConnectionEvent.DISCONNECT
 * @event ConnectionEvent.DISCONNECTED
 * @event ConnectionEvent.BROADCAST
 */
export class Connection extends EventEmitter implements Subscriber, Logger {
    private readonly sysAccessPoint: SystemAccessPoint;
    public debugEnabled = false;
    public infoEnabled = false;

    private connected = false;
    private ready = false;

    private _lastUpdate?: Date;
    private silenceTimeoutId?: Timeout;
    private readonly silenceTimeoutDuration = 60 * 1000;

    public get lastUpdate(): Date|undefined {
      return this._lastUpdate;
    }

    constructor(
        private readonly config: ClientConfiguration,
        private readonly autoReconnect = false,
        private readonly logger: LogInterface=console,
    ) {
      super();

      this.sysAccessPoint = new SystemAccessPoint(
        config,
        this,
        this,
      );

      // ready event
      this.on(ConnectionEvent.READY, this.onReady.bind(this));
    }

    async start() {
      try {
        this.emit(ConnectionEvent.CONNECT);
        this.ready = false;

        await this.sysAccessPoint.connect();
        this.connected = true;

        this.emit(ConnectionEvent.CONNECTED);
      } catch (e) {
        this.logger.error('Could not connect', e);
        this.connected = false;
        this.ready = false;
      }
    }

    async stop() {
      this.emit(ConnectionEvent.DISCONNECT);

      await this.sysAccessPoint.disconnect();
      this.connected = false;
      this.ready = false;

      this.emit(ConnectionEvent.DISCONNECTED);
    }

    async onReady() {
      const devices: Devices = await this.listDevices();
      this.emit(ConnectionEvent.DEVICES, devices);

      this._lastUpdate = new Date();
      this.breakSilence();
    }

    async listDevices() {
      if (this.connected && this.ready) {
        try {
          return await this.sysAccessPoint.getDeviceData();
        } catch (e) {
          this.logger.error('Error getting device data', e);
          return {};
        }
      }
    }

    broadcastMessage(message: BroadcastMessage): void {
      // console.log('broadcast', message);
      this.emit(ConnectionEvent.BROADCAST, message);


      if(this._lastUpdate !== undefined && this.infoEnabled) {
        const difference = new Date().getTime() - this._lastUpdate.getTime();
        this.logger.log('last log', this._lastUpdate, 'duration:', (difference / 1000), 'seconds ago');
      }
      this.breakSilence();
    }

    public async setDatapoint(serialNo: string, channel: string, datapoint: string, value: string): Promise<void> {
      await this.sysAccessPoint.setDatapoint(serialNo, channel, datapoint, value);
    }

    // Logger
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(...messages: string[] | number[] | Record<string, any>[]): void {
      if(this.debugEnabled) {
        this.logger.log('debug', messages);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...messages: string[] | number[] | Record<string, any>[]): void {
      this.logger.error('error', messages);


      if(messages && messages.length > 0 && messages[0] === 'not paired' && this.autoReconnect) {
          // reconnect automatically
          this.reconnect().then(() => {
              this.logger.info('reconnected');
          });
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(...messages: string[] | number[] | Record<string, any>[]): void {
      this.logger.warn('warn', messages);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async log(...messages: string[] | number[] | Record<string, any>[]) {
      this.logger.log('messages', messages);
      if(messages && messages[0] === 'Sent Subscription Confirmation') {
        this.ready = true;
        this.emit(ConnectionEvent.READY);
        await this.listDevices();
      }
    }

    // self-reconnecting
    private breakSilence() {
      if(this.silenceTimeoutId !== undefined) {
        clearTimeout(this.silenceTimeoutId);
      }

      this.silenceTimeoutId = setTimeout(this.handleSilenceTimout.bind(this), this.silenceTimeoutDuration);
      this._lastUpdate = new Date();
    }

    private async handleSilenceTimout() {
      this.logger.log('Didn\'t hear back for ' + this.silenceTimeoutDuration + 'ms',
        'with last update on ', this._lastUpdate);

      const webUrl = 'http://' + this.config.hostname;
      this.logger.log('Please log in and out of the web interface on', webUrl);
      if(this.autoReconnect) {
          await this.reconnect();
      }
    }

    private async reconnect(): Promise<void> {
        this.logger.log('reconnecting now');
        await this.stop();
        await this.start();
    }
}