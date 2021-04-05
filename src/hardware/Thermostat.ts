import {SubDevice} from "../SubDevice";
import {Connection} from "../Connection";
import {FunctionId} from "../FunctionId";
import {LogInterface} from "../LogInterface";

export enum ThermostatEvent
{
    HEATING_TURNED_ON = 'heating on',
    HEATING_TURNED_OFF = 'heating off',
    TARGET_TEMPERATURE_CHANGED = 'target temperature changed',
    TEMPERATURE_CHANGED = 'temperature changed'
}

export class Thermostat extends SubDevice
{
    public static functionIds: FunctionId[] = [
        FunctionId.FID_THERMOSTAT,
        FunctionId.FID_FCA_2_PIPE_HEATING,
        FunctionId.FID_UNDERFLOOR_HEATING,
        FunctionId.FID_ADDITIONAL_HEATING_ACTUATOR,
        FunctionId.FID_CENTRAL_HEATING_ACTUATOR,
        FunctionId.FID_FCA_2_PIPE_HEATING_COOLING,
        FunctionId.FID_FCA_4_PIPE_HEATING_AND_COOLING,
        FunctionId.FID_HEATING_ACTUATOR,
        FunctionId.FID_HEATING_COOLING_ACTUATOR,
        FunctionId.FID_HEATING_COOLING_SENSOR,
        FunctionId.FID_TWO_LEVEL_HEATING_ACTUATOR,
        FunctionId.FID_TWO_LEVEL_HEATING_COOLING_ACTUATOR
    ];


    private currentHeatingEnabled: boolean;
    private targetHeatingEnabled: boolean;
    private currentTemperature: number;
    private targetTemperature: number;
    private lastTargetTemperature: number;

    private readonly currentHeatingEnabledDataPoint: string = 'odp0000';

    private readonly getHeatingEnabledDataPoint: string = 'odp0008';
    private readonly setHeatingEnabledDataPoint: string = 'idp0012';
    private readonly heatingEnabledValue: string = '1';
    private readonly heatingDisabledValue: string = '0';

    private readonly currentTemperatureDataPoint: string = 'odp0010';

    private readonly getTargetTemperatureDataPoint: string = 'odp0006';
    private readonly setTargetTemperatureDataPoint: string = 'idp0016';

    constructor(logger: LogInterface, connection: Connection, serialNumber: string, channel: number)
    {
        super(logger, connection, serialNumber, channel);

        this.currentHeatingEnabled = false;
        this.targetHeatingEnabled = false;
        this.currentTemperature = 0;
        this.lastTargetTemperature = this.targetTemperature = 0;
    }

    public async enableAutoHeaing(): Promise<void>
    {
        this.targetHeatingEnabled = true;
        await this.setDatapoint(this.channel, this.setHeatingEnabledDataPoint, this.heatingEnabledValue);
    }

    public async disableHeating(): Promise<void>
    {
        this.targetHeatingEnabled = false;
        await this.setDatapoint(this.channel, this.setHeatingEnabledDataPoint, this.heatingDisabledValue);
    }

    public heatingIsEnabled(): boolean
    {
        return this.targetHeatingEnabled;
    }

    public currentHeatingIsEnabled(): boolean
    {
        return this.currentHeatingEnabled;
    }

    public getCurrentTemperature(): number
    {
        return this.currentTemperature;
    }

    public getTargetTemperature(): number
    {
        return this.targetTemperature;
    }

    public async setTargetTemperature(targetTemperature: number): Promise<void>
    {
        this.lastTargetTemperature = this.targetTemperature = targetTemperature;
        await this.setDatapoint(this.channel, this.setTargetTemperatureDataPoint, targetTemperature.toString());
    }

    protected handleChannelState(datapoints: { [p: string]: string }) {
        super.handleChannelState(datapoints);

        this.currentHeatingEnabled = datapoints[this.currentHeatingEnabledDataPoint] == this.heatingEnabledValue;
        this.targetHeatingEnabled = datapoints[this.getHeatingEnabledDataPoint] == this.heatingEnabledValue;

        this.currentTemperature = parseFloat(datapoints[this.currentTemperatureDataPoint]);
        this.targetTemperature = parseFloat(datapoints[this.getTargetTemperatureDataPoint]);
    }

    protected handleChannelUpdate(datapoints: { [p: string]: string }) {
        super.handleChannelUpdate(datapoints);

        if(datapoints[this.currentHeatingEnabledDataPoint]) {
            let previousHeatingEnabled = this.currentHeatingEnabled;
            this.currentHeatingEnabled = datapoints[this.currentHeatingEnabledDataPoint] == this.heatingEnabledValue;

            if(previousHeatingEnabled && !this.currentHeatingEnabled)
                this.emit(ThermostatEvent.HEATING_TURNED_OFF);
            else if(!previousHeatingEnabled && this.currentHeatingEnabled)
                this.emit(ThermostatEvent.HEATING_TURNED_ON);
        }

        if(datapoints[this.getHeatingEnabledDataPoint]) {
            this.targetHeatingEnabled = datapoints[this.getHeatingEnabledDataPoint] == this.heatingEnabledValue;
        }

        if(datapoints[this.currentTemperatureDataPoint]) {
            this.currentTemperature = parseFloat(datapoints[this.currentTemperatureDataPoint]);
            this.emit(ThermostatEvent.TEMPERATURE_CHANGED);
        }

        if(datapoints[this.getTargetTemperatureDataPoint]) {
            this.targetTemperature = parseFloat(datapoints[this.getTargetTemperatureDataPoint]);
            this.emit(ThermostatEvent.TARGET_TEMPERATURE_CHANGED);
        }
    }
}