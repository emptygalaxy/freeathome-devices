import {SubDevice} from "../SubDevice";
import {Connection} from "../Connection";


export enum AutomaticDoorOpenerEvent {
    ENABLE = 'enable',
    ENABLED = 'enabled',
    DISABLE = 'disable',
    DISABLED = 'disabled',
}

export class AutomaticDoorOpener extends SubDevice{
    private isEnabled:boolean = false;
    private readonly datapoint: string = 'idp0000';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(AutomaticDoorOpenerEvent.ENABLE, () => {console.log(this.displayName, 'Automatic door opener enabling')});
        // this.on(AutomaticDoorOpenerEvent.DISABLE, () => {console.log(this.displayName, 'Automatic door opener disabling')});
        // this.on(AutomaticDoorOpenerEvent.ENABLED, () => {console.log(this.displayName, 'Automatic door opener enabled')});
        // this.on(AutomaticDoorOpenerEvent.DISABLED, () => {console.log(this.displayName, 'Automatic door opener disabled')});
    }

    public enable()
    {
        this.emit(AutomaticDoorOpenerEvent.ENABLE);
        this.setDatapoint(this.channel, this.datapoint, '1');
    }

    private enabled()
    {
        this.isEnabled = true;
        this.emit(AutomaticDoorOpenerEvent.ENABLED);
    }

    public disable()
    {
        this.emit(AutomaticDoorOpenerEvent.DISABLE);
        this.setDatapoint(this.channel, this.datapoint, '0');
    }

    private disabled()
    {
        this.isEnabled = false;
        this.emit(AutomaticDoorOpenerEvent.DISABLED);
    }

    handleChannelState(datapoints:{[dp:string]: string})
    {
        if(datapoints.idp0000 == '1') {
            this.isEnabled = true;
        } else if(datapoints.idp0000 == '0') {
            this.isEnabled = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial datapoint value', datapoints);
        }
    }

    handleChannelUpdate(datapoints:{[dp:string]: string})
    {
        if(datapoints.idp0000 == '1') { // enabling
            this.emit(AutomaticDoorOpenerEvent.ENABLE);
        } else if(datapoints.idp0000 == '0') { // disabling
            this.emit(AutomaticDoorOpenerEvent.DISABLE);
        } else if(datapoints.odp0000 == '1') { // enabled confirmation
            this.enabled();
        } else if(datapoints.odp0000 == '0') { // disabled confirmation
            this.disabled();
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown datapoint value', datapoints);
        }
    }
}