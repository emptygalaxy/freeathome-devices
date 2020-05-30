export enum FunctionId
{
    /**
     * Control element
     */
    FID_SWITCH_SENSOR = 0x0000,

    /**
     * Dimming sensor
     */
    FID_DIMMING_SENSOR = 0x0001,

    /**
     * Blind sensor
     */
    FID_BLIND_SENSOR = 0x0003,

    /**
     * Stairwell light sensor
     */
    FID_STAIRCASE_LIGHT_SENSOR = 0x0004,

    /**
     * Force On/Off sensor
     */
    FID_FORCE_ON_OFF_SENSOR = 0x0005,

    /**
     * Scene sensor
     */
    FID_SCENE_SENSOR = 0x0006,

    /**
     * Switch actuator
     */
    FID_SWITCH_ACTUATOR = 0x0007,

    /**
     * Blind actuator
     */
    FID_SHUTTER_ACTUATOR = 0x0009,

    /**
     * Room temperature controller with fan speed level
     */
    FID_ROOM_TEMPERATURE_CONTROLLER_MASTER_WITH_FAN = 0x000A,

    /**
     * Room temperature controller extension unit
     */
    FID_ROOM_TEMPERATURE_CONTROLLER_SLAVE = 0x000B,

    /**
     * Wind Alarm
     */
    FID_WIND_ALARM_SENSOR = 0x000C,

    /**
     * Frost Alarm
     */
    FID_FROST_ALARM_SENSOR = 0x000D,

    /**
     * Rain Alarm
     */
    FID_RAIN_ALARM_SENSOR = 0x000E,

    /**
     * Window sensor
     */
    FID_WINDOW_DOOR_SENSOR = 0x000F,

    /**
     * Movement Detector
     */
    FID_MOVEMENT_DETECTOR = 0x0011,

    /**
     * Dim actuator
     */
    FID_DIMMING_ACTUATOR = 0x0012,

    /**
     * Radiator
     */
    FID_RADIATOR_ACTUATOR = 0x0014,

    /**
     * Underfloor heating
     */
    FID_UNDERFLOOR_HEATING = 0x0015,

    /**
     * Fan Coil
     */
    FID_FAN_COIL = 0x0016,

    /**
     * Two-level controller
     */
    FID_TWO_LEVEL_CONTROLLER = 0x0017,

    /**
     * Door opener
     */
    FID_DES_DOOR_OPENER_ACTUATOR = 0x001A,

    /**
     * Proxy
     */
    FID_PROXY = 0x001B,

    /**
     * Door Entry System Call Level Actuator
     */
    FID_DES_LEVEL_CALL_ACTUATOR = 0x001D,

    /**
     * Door Entry System Call Level Sensor
     */
    FID_DES_LEVEL_CALL_SENSOR = 0x001E,

    /**
     * Door call
     */
    FID_DES_DOOR_RINGING_SENSOR = 0x001F,

    /**
     * Automatic door opener
     */
    FID_DES_AUTOMATIC_DOOR_OPENER_ACTUATOR = 0x0020,

    /**
     * Corridor light
     */
    FID_DES_LIGHT_SWITCH_ACTUATOR = 0x0021,

    /**
     * Room temperature controller
     */
    FID_ROOM_TEMPERATURE_CONTROLLER_MASTER_WITHOUT_FAN = 0x0023,

    /**
     * Cooling mode
     */
    FID_COOLING_ACTUATOR = 0x0024,

    /**
     * Heating mode
     */
    FID_HEATING_ACTUATOR = 0x0027,

    /**
     * Force-position blind
     */
    FID_FORCE_UP_DOWN_SENSOR = 0x0028,

    /**
     * Auto. heating/cooling mode
     */
    FID_HEATING_COOLING_ACTUATOR = 0x0029,

    /**
     * Switchover heating/cooling
     */
    FID_HEATING_COOLING_SENSOR = 0x002A,

    /**
     * Device settings
     */
    FID_DES_DEVICE_SETTINGS = 0x002B,

    /**
     * Dim actuator
     */
    FID_RGB_W_ACTUATOR = 0x002E,

    /**
     * Dim actuator
     */
    FID_RGB_ACTUATOR = 0x002F,

    /**
     * Control element
     */
    FID_PANEL_SWITCH_SENSOR = 0x0030,

    /**
     * Dimming sensor
     */
    FID_PANEL_DIMMING_SENSOR = 0x0031,

    /**
     * Blind sensor
     */
    FID_PANEL_BLIND_SENSOR = 0x0033,

    /**
     * Stairwell light sensor
     */
    FID_PANEL_STAIRCASE_LIGHT_SENSOR = 0x0034,

    /**
     * Force On/Off sensor
     */
    FID_PANEL_FORCE_ON_OFF_SENSOR = 0x0035,

    /**
     * Force-position blind
     */
    FID_PANEL_FORCE_UP_DOWN_SENSOR = 0x0036,

    /**
     * Scene sensor
     */
    FID_PANEL_SCENE_SENSOR = 0x0037,

    /**
     * Room temperature controller extension unit
     */
    FID_PANEL_ROOM_TEMPERATURE_CONTROLLER_SLAVE = 0x0038,

    /**
     * Fan coil sensor
     */
    FID_PANEL_FAN_COIL_SENSOR = 0x0039,

    /**
     * RGB + warm white/cold white sensor
     */
    FID_PANEL_RGB_CT_SENSOR = 0x003A,

    /**
     * RGB sensor
     */
    FID_PANEL_RGB_SENSOR = 0x003B,

    /**
     * Warm white/cold white sensor
     */
    FID_PANEL_CT_SENSOR = 0x003C,

    /**
     * Add. stage for heating mode
     */
    FID_ADDITIONAL_HEATING_ACTUATOR = 0x003D,

    /**
     * Radiator thermostate
     */
    FID_RADIATOR_ACTUATOR_MASTER = 0x003E,

    /**
     * Room temperature controller extension unit
     */
    FID_RADIATOR_ACTUATOR_SLAVE = 0x003F,

    /**
     * Brightness sensor
     */
    FID_BRIGHTNESS_SENSOR = 0x0041,

    /**
     * Rain sensor
     */
    FID_RAIN_SENSOR = 0x0042,

    /**
     * Temperature sensor
     */
    FID_TEMPERATURE_SENSOR = 0x0043,

    /**
     * Wind sensor
     */
    FID_WIND_SENSOR = 0x0044,

    /**
     * Trigger
     */
    FID_TRIGGER = 0x0045,

    /**
     * Heating mode
     */
    FID_FCA_2_PIPE_HEATING = 0x0047,

    /**
     * Cooling mode
     */
    FID_FCA_2_PIPE_COOLING = 0x0048,

    /**
     * Auto. heating/cooling mode
     */
    FID_FCA_2_PIPE_HEATING_COOLING = 0x0049,

    /**
     * Two valves for heating and cooling
     */
    FID_FCA_4_PIPE_HEATING_AND_COOLING = 0x004A,

    /**
     * Window/Door
     */
    FID_WINDOW_DOOR_ACTUATOR = 0x004B,

    /**
     * ABC
     */
    FID_INVERTER_INFO = 0x004E,

    /**
     * ABD
     */
    FID_METER_INFO = 0x004F,

    /**
     * ACD
     */
    FID_BATTERY_INFO = 0x0050,

    /**
     * Timer program switch sensor
     */
    FID_PANEL_TIMER_PROGRAM_SWITCH_SENSOR = 0x0051,

    /**
     * Zone
     */
    FID_DOMUSTECH_ZONE = 0x0055,

    /**
     * Central heating actuator
     */
    FID_CENTRAL_HEATING_ACTUATOR = 0x0056,

    /**
     * Central cooling actuator
     */
    FID_CENTRAL_COOLING_ACTUATOR = 0x0057,

    /**
     * Housekeeping
     */
    FID_HOUSE_KEEPING = 0x0059,

    /**
     * Media Player
     */
    FID_MEDIA_PLAYER = 0x005A,

    /**
     * Panel Room Temperature Controller Slave For Battery Device
     */
    FID_PANEL_ROOM_TEMPERATURE_CONTROLLER_SLAVE_FOR_BATTERY_DEVICE = 0x005B,

    /**
     * Media Player Sensor
     */
    FID_PANEL_MEDIA_PLAYER_SENSOR = 0x0060,

    /**
     * Roller blind actuator
     */
    FID_BLIND_ACTUATOR = 0x0061,

    /**
     * Attic window actuator
     */
    FID_ATTIC_WINDOW_ACTUATOR = 0x0062,

    /**
     * Awning actuator
     */
    FID_AWNING_ACTUATOR = 0x0063,

    /**
     * WindowDoor Position Sensor
     */
    FID_WINDOW_DOOR_POSITION_SENSOR = 0x0064,

    /**
     * Window/Door position
     */
    FID_WINDOW_DOOR_POSITION_ACTUATOR = 0x0065,

    /**
     * Media playback control sensor
     */
    FID_MEDIA_PLAYBACK_CONTROL_SENSOR = 0x0066,

    /**
     * Media volume sensor
     */
    FID_MEDIA_VOLUME_SENSOR = 0x0067,

    /**
     * Dishwasher
     */
    FID_DISHWASHER = 0x0068,

    /**
     * Laundry
     */
    FID_LAUNDRY = 0x0069,

    /**
     * Dryer
     */
    FID_DRYER = 0x006A,

    /**
     * Oven
     */
    FID_OVEN = 0x006B,

    /**
     * Fridge
     */
    FID_FRIDGE = 0x006C,

    /**
     * Freezer
     */
    FID_FREEZER = 0x006D,

    /**
     * Hood
     */
    FID_HOOD = 0x006E,

    /**
     * Coffee machine
     */
    FID_COFFEE_MACHINE = 0x006F,

    /**
     * Fridge/Freezer
     */
    FID_FRIDGE_FREEZER = 0x0070,

    /**
     * Timer program switch sensor
     */
    FID_TIMER_PROGRAM_OR_ALERT_SWITCH_SENSOR = 0x0071,

    /**
     * Ceiling fan actuator
     */
    FID_CEILING_FAN_ACTUATOR = 0x0073,

    /**
     * Ceiling fan sensor
     */
    FID_CEILING_FAN_SENSOR = 0x0074,

    /**
     * Room temperature controller with fan speed level
     */
    FID_SPLIT_UNIT_GATEWAY = 0x0075,

    /**
     * Zone
     */
    FID_ZONE = 0x0076,

    /**
     * Safety
     */
    FID_24H_ZONE = 0x0077,

    /**
     * External IR Sensor BX80
     */
    FID_EXTERNAL_IR_SENSOR_BX80 = 0x0078,

    /**
     * External IR Sensor VXI
     */
    FID_EXTERNAL_IR_SENSOR_VXI = 0x0079,

    /**
     * External IR Sensor Mini
     */
    FID_EXTERNAL_IR_SENSOR_MINI = 0x007A,

    /**
     * External IR Sensor High Altitude
     */
    FID_EXTERNAL_IR_SENSOR_HIGH_ALTITUDE = 0x007B,

    /**
     * External IR Sensor Curtain
     */
    FID_EXTERNAL_IR_SENSOR_CURTAIN = 0x007C,

    /**
     * Smoke Detector
     */
    FID_SMOKE_DETECTOR = 0x007D,

    /**
     * Carbon Monoxide Sensor
     */
    FID_CARBON_MONOXIDE_SENSOR = 0x007E,

    /**
     * Methane Detector
     */
    FID_METHANE_DETECTOR = 0x007F,

    /**
     * Gas Sensor LPG
     */
    FID_GAS_SENSOR_LPG = 0x0080,

    /**
     * Flood Detection
     */
    FID_FLOOD_DETECTION = 0x0081,

    /**
     * secure@home Central Unit
     */
    FID_DOMUS_CENTRAL_UNIT_NEXTGEN = 0x0082,

    /**
     * Thermostat
     */
    FID_THERMOSTAT = 0x0083,

    /**
     * secure@home Zone Sensor
     */
    FID_PANEL_DOMUS_ZONE_SENSOR = 0x0084,

    /**
     * Slave thermostat
     */
    FID_THERMOSTAT_SLAVE = 0x0085,

    /**
     * secure@home Integration Logic
     */
    FID_DOMUS_SECURE_INTEGRATION = 0x0086,

    /**
     * Add. stage for cooling mode
     */
    FID_ADDITIONAL_COOLING_ACTUATOR = 0x0087,

    /**
     * Two Level Heating Actuator
     */
    FID_TWO_LEVEL_HEATING_ACTUATOR = 0x0088,

    /**
     * Two Level Cooling Actuator
     */
    FID_TWO_LEVEL_COOLING_ACTUATOR = 0x0089,

    /**
     * Zone
     */
    FID_GLOBAL_ZONE = 0x008E,

    /**
     * Volume up
     */
    FID_VOLUME_UP_SENSOR = 0x008F,

    /**
     * Volume down
     */
    FID_VOLUME_DOWN_SENSOR = 0x0090,

    /**
     * Play/pause
     */
    FID_PLAY_PAUSE_SENSOR = 0x0091,

    /**
     * Next favorite
     */
    FID_NEXT_FAVORITE_SENSOR = 0x0092,

    /**
     * Next song
     */
    FID_NEXT_SONG_SENSOR = 0x0093,

    /**
     * Previous song
     */
    FID_PREVIOUS_SONG_SENSOR = 0x0094,

    /**
     * Home appliance sensor
     */
    FID_HOME_APPLIANCE_SENSOR = 0x0095,

    /**
     * Heat sensor
     */
    FID_HEAT_SENSOR = 0x0096,

    /**
     * Zone switching
     */
    FID_ZONE_SWITCHING = 0x0097,

    /**
     * Button function
     */
    FID_SECURE_AT_HOME_FUNCTION = 0x0098,

    /**
     * Advanced configuration
     */
    FID_COMPLEX_CONFIGURATION = 0x0099,

    /**
     * secure@home Central Unit Basic
     */
    FID_DOMUS_CENTRAL_UNIT_BASIC = 0x009A,

    /**
     * Repeater
     */
    FID_DOMUS_REPEATER = 0x009B,

    /**
     * Remote scene control
     */
    FID_DOMUS_SCENE_TRIGGER = 0x009C,

    /**
     * Window sensor
     */
    FID_DOMUSWINDOWCONTACT = 0x009D,

    /**
     * Movement Detector
     */
    FID_DOMUSMOVEMENTDETECTOR = 0x009E,

    /**
     * External IR Sensor Curtain
     */
    FID_DOMUSCURTAINDETECTOR = 0x009F,

    /**
     * Smoke Detector
     */
    FID_DOMUSSMOKEDETECTOR = 0x00A0,

    /**
     * Flood Detection
     */
    FID_DOMUSFLOODDETECTOR = 0x00A1,

    /**
     * Sensor for air-conditioning unit
     */
    FID_PANEL_SUG_SENSOR = 0x00A3,

    /**
     * Two-point controller for heating or cooling
     */
    FID_TWO_LEVEL_HEATING_COOLING_ACTUATOR = 0x00A4,

    /**
     * Slave thermostat
     */
    FID_PANEL_THERMOSTAT_CONTROLLER_SLAVE = 0x00A5,

    /**
     * Wallbox
     */
    FID_WALLBOX = 0x00A6,

    /**
     * Wallbox
     */
    FID_PANEL_WALLBOX = 0x00A7,

    /**
     * Door lock control
     */
    FID_DOOR_LOCK_CONTROL = 0x00A8,

    /**
     * Room temperature controller with fan speed level
     */
    FID_VRV_GATEWAY = 0x00AA,
}