import {Connection, ConnectionEvent, DeviceInfo, Devices} from "./Connection";
import {BroadcastMessage} from "freeathome-api/dist/lib/BroadcastMessage";
import {Device} from "./Device";
import {HomeTouchPanel} from "./hardware/HomeTouchPanel";
import {SubDevice} from "./SubDevice";
import {BinarySensorDevice} from "./hardware/BinarySensorDevice";
import {SchakelAktorDevice} from "./hardware/SchakelAktorDevice";
import {SysAP} from "./hardware/SysAP";
import {ClientConfiguration} from "freeathome-api";

export class DeviceManager {

    private connection:Connection;

    private devices:Device[] = [];
    private allDevices:Device[] = [];

    constructor(config:ClientConfiguration)
    {
        this.connection = new Connection(config);

        this.connection.on(ConnectionEvent.READY, ()=>{console.log('Ready')});
        this.connection.on(ConnectionEvent.DEVICES, this.handleDevices.bind(this));
        this.connection.on(ConnectionEvent.BROADCAST, this.handleUpdate.bind(this));

        this.connection.start();
    }

    private handleDevices(devices:Devices)
    {
        for(let deviceSerial in devices)
        {
            let info:DeviceInfo = devices[deviceSerial];
            let device:Device|undefined = this.createDevice(info.serialNumber, info.deviceId);

            if(device != undefined)
            {
                // initial
                device.handleState(info);

                // console.log(info);
                this.devices.push(device);
                this.allDevices.push(device);

                if(device instanceof HomeTouchPanel)
                {
                    let subDevices: Device[] = (device as HomeTouchPanel).getSubDevices();
                    subDevices.forEach((d: Device) => {
                        d.handleState(info);
                        this.allDevices.push(d);
                    });
                }
            }
            else
            {
                console.log(info);
            }
        }
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

            case DeviceType.SystemAccessPoint:
                return new SysAP(this.connection, serialNumber);

            default:
                console.log(serialNumber, typeId);
                break;
        }
    }

    private static getDeviceType(typeId:string): DeviceType|undefined
    {
        switch(typeId)
        {
            case 'FFFF':
            case '1012':
            case '2012':
                return DeviceType.SystemAccessPoint;

            case '1004':
                return DeviceType.Thermostat;

            case 'B001':
            case '1013':
            case '1015':
                return DeviceType.Jalousie;

            case 'B008':
            case 'B002':
            case '100C':
            case '1010':
            case '100E':
            case '0001':
                return DeviceType.SchakelAktor;

            case '1021':
            case '1022':
            case '101C':
            case '1017':
            case '1019':
                return DeviceType.DimmAktor;

            // case '0001':
            //     return DeviceType.MediaPlayer;

            case '1038':
                return DeviceType.HomeTouch;

            case 'B005':
            case 'B007':
            case '0004':
                return DeviceType.BinarySensory;

            // default:
            //     console.log('Unknown typeId:', typeId);
        }
    }
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