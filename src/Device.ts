import {Connection, DeviceInfo} from "./Connection";
const EventEmitter = require('events');

export class Device extends EventEmitter
{
    protected connection:Connection;
    public readonly serialNumber:string;

    protected displayName?: string;
    protected floor?: string;
    protected room?: string;

    constructor(connection:Connection, serialNumber:string)
    {
        super();

        this.connection = connection;
        this.serialNumber = serialNumber;
    }

    public getDisplayName(): string|undefined
    {
        return this.displayName;
    }

    public getFloor(): string|undefined
    {
        return this.floor;
    }

    public getRoom(): string|undefined
    {
        return this.room;
    }

    public handleState(info: DeviceInfo)
    {
        this.displayName = info.typeName;
        console.log(this.displayName);
    }

    public handleUpdate(info:DeviceInfo)
    {

    }

    protected setDatapoint(channel:number, datapoint:string, value:string)
    {
        let channelString = Device.formatChannelString(channel);
        this.connection.setDatapoint(this.serialNumber, channelString, datapoint, value);
    }

    static parseChannelString(channel:string):number
    {
        let num:string = channel.substr(2);
        return parseInt(num, 16);
    }

    static formatChannelString(channel:number):string
    {
        return 'ch' + ("0000" + channel.toString(16).toUpperCase()).substr(-4);
    }
}