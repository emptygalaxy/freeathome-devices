import {Light} from "./Light";
import {Connection} from "../Connection";
import {FunctionId} from "../FunctionId";

export class DimmableLight extends Light
{
    public static functionIds: FunctionId[] = [FunctionId.FID_DIMMING_ACTUATOR];

    private mininumBrightness: number = 1;
    private minimumBrightnessDataPoint: string = 'pm0001';

    private brightness: number = 0;
    private brightnessDataPointGet: string = 'odp0001';
    private brightnessDataPointSet: string = 'odp0001';

    constructor(connection:Connection, serialNumber:string, channel:number)
    {
        super(connection, serialNumber, channel);

        // this.on(LightEvent.TURNED_ON, () => {console.log(this.displayName, 'Light turned on')});
        // this.on(LightEvent.TURNED_OFF, () => {console.log(this.displayName, 'Light turned off')});
    }

    public getMinimumBrightness(): number
    {
        return this.mininumBrightness;
    }

    public getBrightness(): number
    {
        return this.brightness;
    }

    public setBrightness(brightness:number): void
    {
        this.brightness = brightness;
        this.setDatapoint(this.channel, this.brightnessDataPointSet, Math.round(this.brightness).toString());
    }

    protected handleChannelState(datapoints:{[dp:string]: string}): void
    {
        super.handleChannelState(datapoints);

        if(datapoints[this.minimumBrightnessDataPoint]) {
            this.mininumBrightness = parseInt(datapoints[this.minimumBrightnessDataPoint]);
        }
        if(datapoints[this.brightnessDataPointGet]) {
            this.brightness = parseInt(datapoints[this.brightnessDataPointGet]);
        }
    }

    protected handleChannelUpdate(datapoints:{[dp:string]: string}): void
    {
        if(datapoints[this.minimumBrightnessDataPoint]) {
            this.mininumBrightness = parseInt(datapoints[this.minimumBrightnessDataPoint]);
        }

        if(datapoints[this.brightnessDataPointGet]) {
            this.brightness = parseInt(datapoints[this.brightnessDataPointGet]);
            this.changed();
        }
    }
}