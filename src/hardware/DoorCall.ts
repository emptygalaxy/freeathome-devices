import {ChannelInfo, Connection, DeviceInfo} from "../Connection";
import {SubDevice} from "../SubDevice";
import {DoorOpener} from "./DoorOpener";
import {FunctionId} from "../FunctionId";
import {PairingId} from "../PairingId";


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
    public static functionIds: FunctionId[] = [FunctionId.FID_DES_DOOR_RINGING_SENSOR, FunctionId.FID_DES_LEVEL_CALL_SENSOR, FunctionId.FID_DES_LEVEL_CALL_ACTUATOR];

    public readonly doorOpener?:DoorOpener;

    private readonly sensorDataPoint:string = 'odp0000';
    private readonly sensorDataPointPairingId: PairingId = PairingId.AL_TIMED_START_STOP;
    private readonly sensorValue:string = '1';

    private actuatorChannel?:number;

    private readonly actuatorDataPoint:string = 'idp0000';
    private readonly actuatorDataPointPairingId: PairingId = PairingId.AL_INFO_ON_OFF;
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
        if(datapoints[this.sensorDataPoint] == this.sensorValue) {
            this.triggered();
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}