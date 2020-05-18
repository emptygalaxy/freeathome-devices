import {ChannelInfo, Connection, DeviceInfo} from "../Connection";
import { SubDevice } from "../SubDevice";
import { DoorOpener } from "./DoorOpener";


export enum DoorCallEvent
{
    TRIGGER = 'trigger',
    TRIGGERED = 'triggered'
}

/**
 * @event DoorCallEvent.TRIGGER
 */
export  class DoorCall extends SubDevice
{
    public readonly doorOpener?:DoorOpener;
    private actuatorChannel?:number;
    private readonly actuatorDataPoint:string = 'idp0000';
    private readonly actuatorValue:string = '1';

    constructor(connection:Connection, serialNumber:string, doorOpener:DoorOpener|undefined, channel:number, actuatorChannel?:number)
    {
        super(connection, serialNumber, channel);

        this.doorOpener = doorOpener;
        this.actuatorChannel = actuatorChannel;

        // this.on(DoorCallEvent.TRIGGER, () => { console.log(this.displayName, 'Calling'); });
        // this.on(DoorCallEvent.TRIGGERED, () => { console.log(this.displayName, 'RING!'); });

        // if(this.triggerEnabled())
        // {
        //     setTimeout(() => {
        //         this.trigger();
        //     }, 2000);
        // }
    }

    public triggerEnabled(): boolean
    {
        return this.actuatorChannel != null;
    }

    public trigger()
    {
        if(this.triggerEnabled())
        {
            this.emit(DoorCallEvent.TRIGGER);
            this.setDatapoint(Number(this.actuatorChannel), this.actuatorDataPoint, this.actuatorValue);

        } else {
            console.error('Illegal DoorCall trigger');
        }
    }


    private triggered()
    {
        this.emit(DoorCallEvent.TRIGGERED);
    }

    public handleState(info: DeviceInfo)
    {
        super.handleState(info);

        if(this.actuatorChannel) {
            let ch:string = SubDevice.formatChannelString(this.actuatorChannel);
            if(info.channels[ch]) {
                let channel: ChannelInfo = info.channels[ch];
                this.displayName = channel.displayName;
                this.floor = channel.floor;
                this.room = channel.room;
            }
        }

        if(this.doorOpener) {
            this.floor = this.doorOpener.getFloor();
            this.room = this.doorOpener.getRoom();
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.triggered();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}