import {Device} from "./Device";
import {ChannelInfo, Connection, DeviceInfo} from "./Connection";
import {FunctionId} from "./FunctionId";

export enum DeviceEvent {
    CHANGE = 'change'
}

export class SubDevice extends Device
{
    public readonly channel:number;
    private functionId?: FunctionId;

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber);

        this.channel = channel;
    }

    public changed(): void
    {
        this.emit(DeviceEvent.CHANGE);
    }

    public getFunctionId(): FunctionId|undefined
    {
        return this.functionId;
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

                this.functionId = SubDevice.parseFunctionId(channel.functionId);

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

    public static parseFunctionId(functionId: string): FunctionId|undefined
    {
        let functionIdNumber: number = Number.parseInt(functionId, 16);
        if(functionIdNumber in FunctionId)
            return functionIdNumber;

        return undefined;
    }
}