import {Connection, DeviceInfo} from "./Connection";
const EventEmitter = require('events');

export class Device extends EventEmitter
{
    protected connection:Connection;
    public readonly serialNumber:string;

    constructor(connection:Connection, serialNumber:string)
    {
        super();

        this.connection = connection;
        this.serialNumber = serialNumber;
    }

    public handleState(info: DeviceInfo)
    {

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