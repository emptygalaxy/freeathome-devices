import {Device} from "./Device";
import {ChannelInfo, Connection, DeviceInfo} from "./Connection";

export enum DeviceEvent {
    CHANGE = 'change'
}

export class SubDevice extends Device
{
    public readonly channel:number;

    protected displayName?: string;
    protected floor?: string;
    protected room?: string;

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber);

        this.channel = channel;
    }

    public changed(): void
    {
        this.emit(DeviceEvent.CHANGE);
    }

    public handleState(info: DeviceInfo)
    {
        for(let channelId in info.channels)
        {
            let channelNumber:number = SubDevice.parseChannelString(channelId);
            if(channelNumber == this.channel)
            {
                let channel:ChannelInfo = info.channels[channelId];

                this.displayName = channel.displayName;
                this.floor = channel.floor;
                this.room = channel.room;

                this.handleChannelState(channel.datapoints);
            }
        }
    }

    protected handleChannelState(datapoints:{[dp:string]: string})
    {

    }

    public handleUpdate(info: DeviceInfo)
    {
        super.handleUpdate(info);

        for(let channelId in info.channels)
        {
            let channelNumber:number = SubDevice.parseChannelString(channelId);
            if(channelNumber == this.channel)
            {
                let channel:ChannelInfo = info.channels[channelId];
                this.handleChannelUpdate(channel.datapoints);
            }
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string})
    {

    }
}