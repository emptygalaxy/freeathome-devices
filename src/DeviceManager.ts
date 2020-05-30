import {Connection, ConnectionEvent, DeviceInfo, Devices} from "./Connection";
import {BroadcastMessage} from "freeathome-api/dist/lib/BroadcastMessage";
import {Device} from "./Device";
import {HomeTouchPanel} from "./hardware/HomeTouchPanel";
import {SubDevice} from "./SubDevice";
import {BinarySensorDevice} from "./hardware/BinarySensorDevice";
import {SchakelAktorDevice} from "./hardware/SchakelAktorDevice";
import {SysAP} from "./hardware/SysAP";
import {ClientConfiguration} from "freeathome-api";
import {JalousieDevice} from "./hardware/JalousieDevice";
import {ThermostatDevice} from "./hardware/ThermostatDevice";
import {FunctionId} from "./FunctionId";
const EventEmitter = require("events");

export class DeviceManager extends EventEmitter
{
    private readonly connection:Connection;

    private hasDevices:boolean = false;
    private devices:Device[] = [];
    private allDevices:Device[] = [];

    constructor(config:ClientConfiguration)
    {
        super();

        this.connection = new Connection(config);

        this.connection.on(ConnectionEvent.READY, ()=>{console.log('Ready')});
        this.connection.on(ConnectionEvent.DEVICES, this.handleDevices.bind(this));
        this.connection.on(ConnectionEvent.BROADCAST, this.handleUpdate.bind(this));

        this.connection.start();
    }

    private handleDevices(devices:Devices) {
        for (let deviceSerial in devices) {
            let info: DeviceInfo = devices[deviceSerial];
            let device: Device | undefined = this.createDevice(info.serialNumber, info.deviceId);

            if (device != undefined) {
                // initial
                // console.log(info.channels);
                device.handleState(info);

                // console.log(info);
                this.devices.push(device);
                this.allDevices.push(device);

                if (device instanceof HomeTouchPanel) {
                    let subDevices: Device[] = (device as HomeTouchPanel).getSubDevices();
                    subDevices.forEach((d: Device) => {
                        d.handleState(info);
                        this.allDevices.push(d);
                    });
                }
            } else {
                console.log(info);
            }
        }

        this.hasDevices = true;
        this.emit(ConnectionEvent.DEVICES);
    }

    private handleUpdate(message:BroadcastMessage)
    {
        let devices:Devices = message.result;
        for(let deviceSerial in devices)
        {
            let info: DeviceInfo = devices[deviceSerial];
            this.allDevices.forEach((device:Device) => {
                if(device.serialNumber == deviceSerial)
                {
                    device.handleUpdate(info);
                }
            });
        }

        this.emit(ConnectionEvent.BROADCAST);
    }

    public hasDeviceList(): boolean
    {
        return this.hasDevices;
    }

    public getDevices():Device[]
    {
        return this.devices;
    }

    public getDevicesWithFunction(functionId:FunctionId|SupportedFunctionId):Device[]
    {
        return this.allDevices.filter((device:Device) => { return device instanceof SubDevice && device.getFunctionId() == functionId; });
    }

    public getDevice(serialNumber:string, channel:number):SubDevice|null
    {
        let l = this.allDevices.length;
        for(let i=0; i<l; i++)
        {
            let device:Device = this.devices[i];
            if(device.serialNumber == serialNumber)
            {
                if(channel && device instanceof SubDevice)
                {
                    let subDevice:SubDevice = device as SubDevice;
                    if(subDevice.channel == channel)
                    {
                        return subDevice;
                    }
                }
            }
        }
        return null;
    }

    private createDevice(serialNumber:string, typeId:string):Device|undefined
    {
        let deviceType:DeviceType|undefined = DeviceManager.getDeviceType(typeId);
        switch(deviceType)
        {
            case DeviceType.HomeTouch:
                return new HomeTouchPanel(this.connection, serialNumber);

            case DeviceType.BinarySensory:
                return new BinarySensorDevice(this.connection, serialNumber, 1);

            case DeviceType.SchakelAktor:
                return new SchakelAktorDevice(this.connection, serialNumber, 1);

            case DeviceType.Jalousie:
                return new JalousieDevice(this.connection, serialNumber, 1);

            case DeviceType.Thermostat:
                return new ThermostatDevice(this.connection, serialNumber, 1);

            case DeviceType.SystemAccessPoint:
                return new SysAP(this.connection, serialNumber);

            default:
                console.log(serialNumber, typeId);
                break;
        }
    }

    private static getDeviceType(typeId:string): DeviceType|undefined
    {
        let typeNumber: number = Number.parseInt(typeId, 16);

        switch(typeNumber)
        {
            case DeviceTypeId.SysAP:
            case DeviceTypeId.CommunicationInterface1:
            case DeviceTypeId.CommunicationInterface2:
                return DeviceType.SystemAccessPoint;

            case DeviceTypeId.Thermostat:
                return DeviceType.Thermostat;

            case DeviceTypeId.SensorJalousieAktor_1_fach:
            case DeviceTypeId.JalousieAktor_4_fach:
            case DeviceTypeId.Jalousie3:
                return DeviceType.Jalousie;

            case DeviceTypeId.SchakelAktor_4_fach:
            case DeviceTypeId.SensorSchakelAktor_2_1_fach:
            case DeviceTypeId.SensorSchakelAktor_8_fach:
            case DeviceTypeId.SchakelAktor3:
            case DeviceTypeId.SchakelAktor4:
            case DeviceTypeId.VirtualSchakelAktor:
                return DeviceType.SchakelAktor;

            case DeviceTypeId.DimmAktor2:
            case DeviceTypeId.DimmAktor4:
            case DeviceTypeId.DimmAktor5:
            case DeviceTypeId.DimmAktor_4_fach:
            case DeviceTypeId.DimmAktor_4_fach_v2:
                return DeviceType.DimmAktor;

            // case '0001':
            //     return DeviceType.MediaPlayer;

            case DeviceTypeId.HomeTouch:
                return DeviceType.HomeTouch;

            case DeviceTypeId.BinarySensor1:
            case DeviceTypeId.BinarySensor2:
            case DeviceTypeId.BinarySensor3:
                return DeviceType.BinarySensory;

            // default:
            //     console.log('Unknown typeId:', typeId);
        }
    }
}

export enum DeviceTypeId
{
    HomeTouch = 0x1038,
    SysAP = 0xFFFF,
    CommunicationInterface1  = 0x1012,
    CommunicationInterface2  = 0x2012,

    Thermostat = 0x1004,

    /**
     * Jalousieaktor 4-fach, REG
     */
    JalousieAktor_4_fach = 0xB001,

    /**
     * Sensor/ Jalousieaktor 1/1-fach
     */
    SensorJalousieAktor_1_fach = 0x1013,
    Jalousie3 = 0x1015,

    /**
     * Sensor/ Schaltaktor 8/8fach, REG
     */
    SensorSchakelAktor_8_fach = 0xB008,

    /**
     * Schaltaktor 4-fach, 16A, REG
     */
    SchakelAktor_4_fach = 0xB002,
    SchakelAktor3 = 0x100C,
    SchakelAktor4 = 0x1010,

    /**
     * Sensor/ Schaltaktor 2/1-fach
     */
    SensorSchakelAktor_2_1_fach = 0x100E,
    VirtualSchakelAktor = 0x0001,

    DimmAktor2 = 0x1022,
    /**
     * Dimmaktor 4-fach
     */
    DimmAktor_4_fach = 0x101C,
    /**
     * Dimmaktor 4-fach v2
     */
    DimmAktor_4_fach_v2 = 0x1021,
    DimmAktor4 = 0x1017,
    DimmAktor5 = 0x1019,

    BinarySensor1 = 0xB005,
    BinarySensor2 = 0xB007,
    BinarySensor3 = 0x0004,

    /**
     * Hue Aktor (Plug Switch)
     */
    HueAktor = 0x10C4,

    /**
     * Hue Aktor (LED Strip)
     */
    HueAktorLedStrip = 0x10C0,
}

export enum DeviceType
{
    Thermostat,
    Jalousie,
    SchakelAktor,
    DimmAktor,
    MediaPlayer,
    HomeTouch,
    BinarySensory,
    SystemAccessPoint,
}

export enum SupportedFunctionId
{
    DOOR_OPENER_ACTUATOR = FunctionId.FID_DES_DOOR_OPENER_ACTUATOR,
    AUTOMATIC_DOOR_OPENER_ACTUATOR = FunctionId.FID_DES_AUTOMATIC_DOOR_OPENER_ACTUATOR,
    LEVEL_CALL_ACTUATOR = FunctionId.FID_DES_LEVEL_CALL_ACTUATOR,
    LEVEL_CALL_SENSOR = FunctionId.FID_DES_LEVEL_CALL_SENSOR,
}