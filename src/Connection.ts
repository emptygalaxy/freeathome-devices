import { ClientConfiguration, Logger, SystemAccessPoint } from "freeathome-api";
import { Subscriber } from "freeathome-api/dist/lib/Subscriber";
import { BroadcastMessage } from "freeathome-api/dist/lib/BroadcastMessage";
const EventEmitter = require('events');

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
    typeId: string;
    channels: {[channel: string]: ChannelInfo};
}

export type ChannelInfo =
    {
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
export class Connection extends EventEmitter implements Subscriber, Logger
{
    private connected: boolean = false;
    private ready:boolean = false;
    private sysAccessPoint:SystemAccessPoint;

    constructor(config:ClientConfiguration)
    {
        super();

        this.sysAccessPoint = new SystemAccessPoint(
            config,
            this,
            this);

        // ready event
        this.on(ConnectionEvent.READY, this.onReady.bind(this));
    }

    async start()
    {
        try
        {
            this.emit(ConnectionEvent.CONNECT);
            this.ready = false;

            await this.sysAccessPoint.connect();
            this.connected = true;

            this.emit(ConnectionEvent.CONNECTED);
        }
        catch (e)
        {
            console.error('Could not connect', e);
            this.connected = false;
            this.ready = false;
        }
    }

    async stop()
    {
        this.emit(ConnectionEvent.DISCONNECT);

        await this.sysAccessPoint.disconnect();
        this.connected = false;
        this.ready = false;

        this.emit(ConnectionEvent.DISCONNECTED);
    }

    async onReady()
    {
        let devices:Devices = await this.listDevices();
        this.emit(ConnectionEvent.DEVICES, devices);
    }

    async listDevices()
    {
        if (this.connected && this.ready)
        {
            try
            {
                return await this.sysAccessPoint.getDeviceData();
            }
            catch (e)
            {
                console.error("Error getting device data", e);
                return {};
            }
        }
    }

    broadcastMessage(message: BroadcastMessage): void
    {
        // console.log(message);
        this.emit(ConnectionEvent.BROADCAST, message);
    }

    public setDatapoint(serialNo:string, channel:string, datapoint:string, value:string)
    {
        this.sysAccessPoint.setDatapoint(serialNo, channel, datapoint, value);
    }

    // Logger
    debugEnabled: Boolean = false;
    debug(...messages: string[] | number[] | Object[]): void {
        if(this.debugEnabled)
            console.log('debug', messages);
    }

    error(...messages: string[] | number[] | Object[]): void {
        console.error('error', messages);
    }

    async log(...messages: string[] | number[] | Object[])
    {
        if(messages && messages[0] == 'Sent Subscription Confirmation')
        {
            this.ready = true;
            this.emit(ConnectionEvent.READY);
            await this.listDevices();
        }

        // console.log('log', messages);
    }
}