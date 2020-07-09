import {SubDevice} from "../SubDevice";
import {Connection} from "../Connection";
import {FunctionId} from "../FunctionId";
import {PairingId} from "../PairingId";


export enum AutomaticDoorOpenerEvent {
    ENABLE = 'enable',
    ENABLED = 'enabled',
    DISABLE = 'disable',
    DISABLED = 'disabled',
}

/**
 * @event DeviceEvent.CHANGE
 * @event AutomaticDoorOpenerEvent.ENABLE
 * @event AutomaticDoorOpenerEvent.ENABLED
 * @event AutomaticDoorOpenerEvent.DISABLE
 * @event AutomaticDoorOpenerEvent.DISABLED
 */
export class AutomaticDoorOpener extends SubDevice
{
    public static functionIds: FunctionId[] = [FunctionId.FID_DES_AUTOMATIC_DOOR_OPENER_ACTUATOR];

    private active:boolean = false;
    private readonly actuatorDatapoint: string = 'idp0000';
    private readonly actuatorDatapointPairingId: PairingId = PairingId.AL_SWITCH_ON_OFF;

    private readonly sensorDatapoint: string = 'odp0000';
    private readonly sensorDatapointPairingId: PairingId = PairingId.AL_INFO_ON_OFF;

    private readonly activeValue:string = '1';
    private readonly inactiveValue:string = '0';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        this.on(AutomaticDoorOpenerEvent.ENABLE, () => {console.log(this.displayName, 'Automatic door opener enabling')});
        this.on(AutomaticDoorOpenerEvent.DISABLE, () => {console.log(this.displayName, 'Automatic door opener disabling')});
        this.on(AutomaticDoorOpenerEvent.ENABLED, () => {console.log(this.displayName, 'Automatic door opener enabled')});
        this.on(AutomaticDoorOpenerEvent.DISABLED, () => {console.log(this.displayName, 'Automatic door opener disabled')});
    }

    public enable(): void
    {
        this.emit(AutomaticDoorOpenerEvent.ENABLE);
        this.setDatapoint(this.channel, this.actuatorDatapoint, this.activeValue);
    }

    private enabled(): void
    {
        this.active = true;
        this.emit(AutomaticDoorOpenerEvent.ENABLED);
        this.changed();
    }

    public disable(): void
    {
        this.emit(AutomaticDoorOpenerEvent.DISABLE);
        this.setDatapoint(this.channel, this.actuatorDatapoint, this.inactiveValue);
    }

    private disabled(): void
    {
        this.active = false;
        this.emit(AutomaticDoorOpenerEvent.DISABLED);
        this.changed();
    }

    public isEnabled(): boolean
    {
        return this.active;
    }

    protected handleChannelState(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelState(datapoints);

        console.log(this.constructor.name, 'handleChannelState', datapoints[this.actuatorDatapoint]);
        if(datapoints[this.actuatorDatapoint] == this.activeValue) {
            this.active = true;
        } else if(datapoints[this.actuatorDatapoint] == this.inactiveValue) {
            this.active = false;
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown initial actuatorDatapoint value', datapoints);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelUpdate(datapoints);

        if(datapoints[this.actuatorDatapoint] == this.activeValue) { // enabling
            this.emit(AutomaticDoorOpenerEvent.ENABLE);
        } else if(datapoints[this.actuatorDatapoint] == this.inactiveValue) { // disabling
            this.emit(AutomaticDoorOpenerEvent.DISABLE);

        } else if(datapoints[this.sensorDatapoint] == this.activeValue) { // enabled confirmation
            this.enabled();
        } else if(datapoints[this.sensorDatapoint] == this.inactiveValue) { // disabled confirmation
            this.disabled();
        } else {
            console.log(this.serialNumber, this.channel.toString(16), 'unknown actuatorDatapoint value', datapoints);
        }
    }
}