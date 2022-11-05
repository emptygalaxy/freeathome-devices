import {Connection, DeviceInfo} from '../Connection';
import {DoorCall} from './DoorCall';
import {DoorOpener} from './DoorOpener';
import {Light} from './Light';
import {AutomaticDoorOpener} from './AutomaticDoorOpener';
import {BridgeDevice} from './BridgeDevice';
import {FunctionId} from '../FunctionId';
import {MqttClient} from 'mqtt';
import {LogInterface} from '../LogInterface';

export class HomeTouchPanel extends BridgeDevice {
  public static functionIds: FunctionId[] = [
    FunctionId.FID_DES_DEVICE_SETTINGS,
    FunctionId.FID_DES_DOOR_RINGING_SENSOR,
    FunctionId.FID_DES_LEVEL_CALL_SENSOR,
    FunctionId.FID_DES_LEVEL_CALL_ACTUATOR,
    FunctionId.FID_DES_LIGHT_SWITCH_ACTUATOR,
    FunctionId.FID_DES_DOOR_OPENER_ACTUATOR,
    FunctionId.FID_DES_AUTOMATIC_DOOR_OPENER_ACTUATOR,
  ];

  public readonly hallwayLight: Light;
  public readonly doorOpener1: DoorOpener;
  public readonly doorOpener2: DoorOpener;
  public readonly doorOpener3: DoorOpener;
  public readonly doorOpener4: DoorOpener;
  public readonly defaultDoorOpener: DoorOpener;
  public readonly doorCall1: DoorCall;
  public readonly doorCall2: DoorCall;
  public readonly doorCall3: DoorCall;
  public readonly doorCall4: DoorCall;
  public readonly callLevelDoorCall: DoorCall;
  public readonly automaticDoorOpener: AutomaticDoorOpener;

  constructor(
    logger: LogInterface,
    connection: Connection,
    serialNumber: string,
    mqttClient?: MqttClient
  ) {
    super(logger, connection, serialNumber, mqttClient);

    this.hallwayLight = new Light(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.CORRIDOR_LIGHT,
      this.mqttClient
    );
    this.devices.push(this.hallwayLight);

    this.doorOpener1 = new DoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.DOOR_OPENER_1,
      this.mqttClient
    );
    this.doorOpener2 = new DoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.DOOR_OPENER_2,
      this.mqttClient
    );
    this.doorOpener3 = new DoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.DOOR_OPENER_3,
      this.mqttClient
    );
    this.doorOpener4 = new DoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.DOOR_OPENER_4,
      this.mqttClient
    );
    this.devices.push(
      this.doorOpener1,
      this.doorOpener2,
      this.doorOpener3,
      this.doorOpener4
    );

    this.defaultDoorOpener = new DoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.DOOR_OPENER_DEFAULT,
      this.mqttClient
    );
    this.devices.push(this.defaultDoorOpener);

    this.doorCall1 = new DoorCall(
      this.logger,
      this.connection,
      this.serialNumber,
      this.doorOpener1,
      HomeTouchPanelChannels.DOOR_CALL_1,
      undefined,
      this.mqttClient
    );
    this.doorCall2 = new DoorCall(
      this.logger,
      this.connection,
      this.serialNumber,
      this.doorOpener2,
      HomeTouchPanelChannels.DOOR_CALL_2,
      undefined,
      this.mqttClient
    );
    this.doorCall3 = new DoorCall(
      this.logger,
      this.connection,
      this.serialNumber,
      this.doorOpener3,
      HomeTouchPanelChannels.DOOR_CALL_3,
      undefined,
      this.mqttClient
    );
    this.doorCall4 = new DoorCall(
      this.logger,
      this.connection,
      this.serialNumber,
      this.doorOpener4,
      HomeTouchPanelChannels.DOOR_CALL_4,
      undefined,
      this.mqttClient
    );
    this.devices.push(
      this.doorCall1,
      this.doorCall2,
      this.doorCall3,
      this.doorCall4
    );

    this.automaticDoorOpener = new AutomaticDoorOpener(
      this.logger,
      this.connection,
      this.serialNumber,
      HomeTouchPanelChannels.AUTOMATIC_DOOR_OPENER,
      this.mqttClient
    );
    this.devices.push(this.automaticDoorOpener);

    this.callLevelDoorCall = new DoorCall(
      this.logger,
      this.connection,
      this.serialNumber,
      undefined,
      HomeTouchPanelChannels.DOOR_ENTRY_SYSTEM_CALL_LEVEL_SENSOR,
      HomeTouchPanelChannels.DOOR_ENTRY_SYSTEM_CALL_LEVEL_ACTUATOR,
      this.mqttClient
    );
    this.devices.push(this.callLevelDoorCall);
  }

  public handleUpdate(info: DeviceInfo) {
    super.handleUpdate(info);
    this.logger.debug('HomeTouchPanel update', JSON.stringify(info, null, 4));
  }
}

export enum HomeTouchPanelChannels {
  DOOR_OPENER_1 = 0x0010,
  DOOR_OPENER_2 = 0x0011,
  DOOR_OPENER_3 = 0x0012,
  DOOR_OPENER_4 = 0x0013,

  DOOR_OPENER_DEFAULT = 0x0014,

  CORRIDOR_LIGHT = 0x0015,

  DOOR_ENTRY_SYSTEM_CALL_LEVEL_ACTUATOR = 0x0016,
  DOOR_ENTRY_SYSTEM_CALL_LEVEL_SENSOR = 0x0017,

  DOOR_CALL_1 = 0x0018,
  DOOR_CALL_2 = 0x0019,
  DOOR_CALL_3 = 0x001a,
  DOOR_CALL_4 = 0x001b,

  AUTOMATIC_DOOR_OPENER = 0x001c,
}
