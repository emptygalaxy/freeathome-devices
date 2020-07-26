import { ClientConfiguration, Logger, SystemAccessPoint } from 'freeathome-api';
import { Subscriber } from 'freeathome-api/dist/lib/Subscriber';
import { BroadcastMessage } from 'freeathome-api/dist/lib/BroadcastMessage';
import {EventEmitter} from 'events';
import Timeout = NodeJS.Timeout;

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
    private readonly logger = console;
    private readonly debugEnabled = false;

    private connected = false;
    private ready = false;

    private autoReconnect = false;
    private _lastUpdate?: Date;
    private silenceTimeoutId?: Timeout;
    private readonly silenceTimeoutDuration = 60 * 1000;

    public get lastUpdate(): Date|undefined {
      return this._lastUpdate;
    }

    constructor(config: ClientConfiguration, autoReconnect = false) {
      super();

      this.autoReconnect = autoReconnect;

      this.sysAccessPoint = new SystemAccessPoint(
        config,
        this,
        this);

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


      if(this._lastUpdate !== null) {
        const difference = new Date().getTime() - this._lastUpdate.getTime();
        this.logger.log('last log', this._lastUpdate, 'duration:', (difference / 1000), 'seconds ago');
      }
      this.breakSilence();
    }

    public setDatapoint(serialNo: string, channel: string, datapoint: string, value: string) {
      this.sysAccessPoint.setDatapoint(serialNo, channel, datapoint, value);
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
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async log(...messages: string[] | number[] | Record<string, any>[]) {
      this.logger.log(messages);
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
        'with last update on ', this._lastUpdate,
        'reconnecting now');

      await this.stop();

      await this.start();
    }
}