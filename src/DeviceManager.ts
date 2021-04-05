import {Connection, ConnectionEvent, DeviceInfo, Devices} from './Connection';
import {BroadcastMessage} from 'freeathome-api/dist/lib/BroadcastMessage';
import {Device} from './Device';
import {HomeTouchPanel} from './hardware/HomeTouchPanel';
import {SubDevice} from './SubDevice';
import {BinarySensorDevice} from './hardware/BinarySensorDevice';
import {SchakelAktorDevice} from './hardware/SchakelAktorDevice';
import {SysAP} from './hardware/SysAP';
import {ClientConfiguration} from 'freeathome-api';
import {JalousieDevice} from './hardware/JalousieDevice';
import {ThermostatDevice} from './hardware/ThermostatDevice';
import {FunctionId} from './FunctionId';
import {DeviceTypeId} from './DeviceTypeId';
import {DeviceType} from './DeviceType';
import {EventEmitter} from 'events';
import {MqttClient, connect, IClientOptions} from 'mqtt';
import {LogInterface} from './LogInterface';

export class DeviceManager extends EventEmitter {
    private readonly connection: Connection;

    private hasDevices = false;
    private devices: Device[] = [];
    private allDevices: Device[] = [];

    private mqttClient?: MqttClient;

    constructor(
        private readonly config: ClientConfiguration,
        private readonly autoReconnect = false,
        private readonly mqtt?: IClientOptions,
        private readonly logger: LogInterface=console,
    ) {
      super();

      this.connection = new Connection(this.config, this.autoReconnect, this.logger);

      // this.connection.on(ConnectionEvent.READY, ()=>{
      //   this.logger.log('Ready');
      // });
      this.connection.on(ConnectionEvent.DEVICES, this.handleDevices.bind(this));
      this.connection.on(ConnectionEvent.BROADCAST, this.handleUpdate.bind(this));

      // setup mqtt
      if(mqtt) {
        this.mqttClient = connect(mqtt);
      }

      this.connection.start();
    }

    private handleDevices(devices: Devices) {

      // reset
      this.devices = [];
      this.allDevices = [];

      for (const deviceSerial in devices) {
        const info: DeviceInfo = devices[deviceSerial];
        const device: Device | undefined = this.createDevice(info.serialNumber, info.deviceId);

        if (device !== undefined) {
          // initial
          device.handleState(info);

          this.devices.push(device);
          this.allDevices.push(device);

          if (device instanceof HomeTouchPanel) {
            const subDevices: Device[] = (device as HomeTouchPanel).getSubDevices();
            subDevices.forEach((d: Device) => {
              d.handleState(info);
              this.allDevices.push(d);
            });
          }
        } else {
          this.logger.log('uninstantiable device', info);
        }
      }

      this.hasDevices = true;
      this.emit(ConnectionEvent.DEVICES);
    }

    private handleUpdate(message: BroadcastMessage) {
      const devices: Devices = message.result;
      for (const deviceSerial in devices) {
        const info: DeviceInfo = devices[deviceSerial];
        this.allDevices.forEach((device: Device) => {
          if (device.serialNumber === deviceSerial) {
            device.handleUpdate(info);
          }
        });
      }

      this.emit(ConnectionEvent.BROADCAST);
    }

    public hasDeviceList(): boolean {
      return this.hasDevices;
    }

    public getDevices(): Device[] {
      return this.devices;
    }

    public getDevicesWithFunction(functionId: FunctionId | SupportedFunctionId): Device[] {
      return this.allDevices.filter((device: Device) => {
        return device instanceof SubDevice && device.getFunctionId() === functionId;
      });
    }

    public getDevice(serialNumber: string, channel: number): SubDevice | null {
      const l = this.allDevices.length;
      for (let i = 0; i < l; i++) {
        const device: Device = this.devices[i];
        if (device.serialNumber === serialNumber) {
          if (channel && device instanceof SubDevice) {
            const subDevice: SubDevice = device as SubDevice;
            if (subDevice.channel === channel) {
              return subDevice;
            }
          }
        }
      }
      return null;
    }

    private createDevice(serialNumber: string, typeId: string): Device | undefined {
      const deviceType: DeviceType | undefined = DeviceManager.getDeviceType(typeId);
      switch (deviceType) {
        case DeviceType.HomeTouch:
          return new HomeTouchPanel(this.logger, this.connection, serialNumber, this.mqttClient);

        case DeviceType.BinarySensory:
          return new BinarySensorDevice(this.logger, this.connection, serialNumber, 1, this.mqttClient);

        case DeviceType.SchakelAktor:
          return new SchakelAktorDevice(this.logger, this.connection, serialNumber, 1, this.mqttClient);

        case DeviceType.Jalousie:
          return new JalousieDevice(this.logger, this.connection, serialNumber, 1, this.mqttClient);

        case DeviceType.Thermostat:
          return new ThermostatDevice(this.logger, this.connection, serialNumber, 1, this.mqttClient);

        case DeviceType.SystemAccessPoint:
          return new SysAP(this.logger, this.connection, serialNumber, this.mqttClient);

        default:
          this.logger.info(serialNumber, typeId);
          break;
      }
    }

    private static getDeviceType(typeId: string): DeviceType | undefined {
      const typeNumber: number = Number.parseInt(typeId, 16);

      switch (typeNumber) {
        case DeviceTypeId.SysAP:
        case DeviceTypeId.CommunicationInterface1:
        case DeviceTypeId.CommunicationInterface2:
          return DeviceType.SystemAccessPoint;

        case DeviceTypeId.Thermostat:
          return DeviceType.Thermostat;

        case DeviceTypeId.SensorJalousieAktor1Fach:
        case DeviceTypeId.JalousieAktor4Fach:
        case DeviceTypeId.Jalousie3:
          return DeviceType.Jalousie;

        case DeviceTypeId.SchakelAktor4Fach:
        case DeviceTypeId.SensorSchakelAktor21Fach:
        case DeviceTypeId.SensorSchakelAktor8Fach:
        case DeviceTypeId.SchakelAktor3:
        case DeviceTypeId.SchakelAktor4:
        case DeviceTypeId.VirtualSchakelAktor:
          return DeviceType.SchakelAktor;

        case DeviceTypeId.DimmAktor2:
        case DeviceTypeId.DimmAktor4:
        case DeviceTypeId.DimmAktor5:
        case DeviceTypeId.DimmAktor4Fach:
        case DeviceTypeId.DimmAktor4FachV2:
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
            //     this.logger.log('Unknown typeId:', typeId);
      }
    }
}

export enum SupportedFunctionId {
    DOOR_OPENER_ACTUATOR = FunctionId.FID_DES_DOOR_OPENER_ACTUATOR,
    AUTOMATIC_DOOR_OPENER_ACTUATOR = FunctionId.FID_DES_AUTOMATIC_DOOR_OPENER_ACTUATOR,
    LEVEL_CALL_ACTUATOR = FunctionId.FID_DES_LEVEL_CALL_ACTUATOR,
    LEVEL_CALL_SENSOR = FunctionId.FID_DES_LEVEL_CALL_SENSOR,
}