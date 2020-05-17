import {Connection} from "../Connection";
import {SubDevice} from "../SubDevice";

export enum DoorOpenerEvent{
    OPEN,
    OPENED,
    CLOSE,
    CLOSED
}

export class DoorOpener extends SubDevice
{
    public isOpen: boolean = false;
    private readonly actuatorDataPoint: string = 'idp0000';
    private readonly actuatorValue: string = '1';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(DoorOpenerEvent.OPEN, () => {console.log(this.displayName, 'Door opening')});
        // this.on(DoorOpenerEvent.CLOSE, () => {console.log(this.displayName, 'Door closing')});
        // this.on(DoorOpenerEvent.OPENED, () => {console.log(this.displayName, 'Door opened')});
        // this.on(DoorOpenerEvent.CLOSED, () => {console.log(this.displayName, 'Door closed')});
    }

    public open()
    {
        this.emit(DoorOpenerEvent.OPEN);
        this.setDatapoint(this.channel, this.actuatorDataPoint, this.actuatorValue);
    }

    private opened()
    {
        this.isOpen = true;
        this.emit(DoorOpenerEvent.OPENED);
    }


    // public close()
    // {
    //     this.emit(DoorOpenerEvent.CLOSE);
    //     this.setDatapoint(this.actuatorChannel, this.actuatorDataPoint, this.actuatorValue);
    // }

    private closed()
    {
        this.isOpen = false;
        this.emit(DoorOpenerEvent.CLOSED);
    }

    handleChannelState(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.isOpen = true;
        } else if(datapoints.odp0000 == '0') {
            this.isOpen = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.odp0000 == '1') {
            this.opened();
        } else if(datapoints.idp0000 == '1') {
            this.emit(DoorOpenerEvent.OPEN);
        } else if(datapoints.odp0000 == '0') {
            this.closed();
        } else if(datapoints.idp0000 == '0') {
            this.emit(DoorOpenerEvent.CLOSE);
        } else {
            console.log(this.serialNumber, this.channel, 'unknown datapoint value', datapoints);
        }
    }
}