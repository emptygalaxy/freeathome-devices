export enum PairingId {
  /**
   * Switch On/Off
   * Binary Switch value
   */
  AL_SWITCH_ON_OFF = 0x0001,

  /**
   * Timed Start/Stop
   * For staircase lighning or movement detection
   */
  AL_TIMED_START_STOP = 0x0002,

  /**
   * Force-position
   * Forces value dependent high priority on or off state
   */
  AL_FORCED = 0x0003,

  /**
   * Scene Control
   * Recall or learn the set value related to encoded scene number
   */
  AL_SCENE_CONTROL = 0x0004,

  /**
   * Movement under consideration of brightness
   * Activation of an autonomous switch off function triggered by an movement detector
   */
  AL_TIMED_MOVEMENT = 0x0006,

  /**
   * Presence
   * Announces presence triggered by an movement detector to be used by e.g. RTCs.
   * Is independent of brightness and can be used for alerts e.g.
   */
  AL_TIMED_PRESENCE = 0x0007,

  /**
   * Relative Set Value
   * Relative dimming value
   */
  AL_RELATIVE_SET_VALUE_CONTROL = 0x0010,

  /**
   * Absolute Set Value
   * Absolute control of the set value
   */
  AL_ABSOLUTE_SET_VALUE_CONTROL = 0x0011,

  /**
   * Night
   * Toggle between day and night (where day = 0 / night = 1)
   */
  AL_NIGHT = 0x0012,

  /**
   * invalid string id
   * Resets load failures / short circuits / etc
   */
  AL_RESET_ERROR = 0x0013,

  /**
   * RGB color
   * RGB Color coded in three bytes
   */
  AL_RGB = 0x0015,

  /**
   * Color Temperature
   * Color temperature
   */
  AL_COLOR_TEMPERATURE = 0x0016,

  /**
   * HSV
   * Hue (2 Byte) / Saturation (1 Byte) / Value (1 Byte / brightness)
   */
  AL_HSV = 0x0017,

  /**
   * HUE
   * Hue (2 Byte)
   */
  AL_COLOR = 0x0018,

  /**
   * Saturation
   * Saturation (1 Byte)
   */
  AL_SATURATION = 0x0019,

  /**
   * Move Up/Down
   * Moves sunblind up (0) and down (1)
   */
  AL_MOVE_UP_DOWN = 0x0020,

  /**
   * Adjust Up/Down
   * Stops the sunblind and to step it up/down
   */
  AL_STOP_STEP_UP_DOWN = 0x0021,

  /**
   * Set Absolute Position Blinds
   * Moves the sunblinds into a specified position
   */
  AL_SET_ABSOLUTE_POSITION_BLINDS_PERCENTAGE = 0x0023,

  /**
   * Set Absolute Position Slats
   * Moves the slats into a specified position
   */
  AL_SET_ABSOLUTE_POSITION_SLATS_PERCENTAGE = 0x0024,

  /**
   * Wind Alarm
   * State of the wind sensor (sent cyclically and on COV)
   * Moves the sunblind to a secure position and to block it for any further control
   */
  AL_WIND_ALARM = 0x0025,

  /**
   * Frost Alarm
   * State of the frost sensor (sent cyclically and on COV)
   * Moves the sunblind to a secure position and to block it for any further control
   */
  AL_FROST_ALARM = 0x0026,

  /**
   * Rain Alarm
   * State of the rain sensor (sent cyclically and on COV)
   */
  AL_RAIN_ALARM = 0x0027,

  /**
   * Force-position blind
   * Forces value dependent high priority up or down state
   */
  AL_FORCED_UP_DOWN = 0x0028,

  /**
   * Window/Door position
   * Delivers position for Window/Door (Open / Tilted / Closed)
   */
  AL_WINDOW_DOOR_POSITION = 0x0029,

  /**
   * Actuating Value Heating
   * Determines the through flow volume of the control valve
   */
  AL_ACTUATING_VALUE_HEATING = 0x0030,

  /**
   * Fan Level Heating
   * Display value of the fan coil speed. (0=off / 1=lowest - 5=fastest)
   */
  AL_FAN_COIL_LEVEL = 0x0031,

  /**
   * Actuating Value Cooling
   * Determines the through flow volume of the control valve
   */
  AL_ACTUATING_VALUE_COOLING = 0x0032,

  /**
   * Set Value Temperature
   * Defines the displayed set point temperature of the system
   */
  AL_SET_POINT_TEMPERATURE = 0x0033,

  /**
   * Relative Set Point Temperature
   * Defines the relative set point temperature of the system
   */
  AL_RELATIVE_SET_POINT_TEMPERATURE = 0x0034,

  /**
   * Window/Door
   * Open = 1 / closed = 0
   */
  AL_WINDOW_DOOR = 0x0035,

  /**
   * Status indication
   * states: on/off heating/cooling; eco/comfort; frost/not frost
   */
  AL_STATE_INDICATION = 0x0036,

  /**
   * Fan Manual Heating On/Off
   * Switches Fan in manual control mode (master to slave)
   */
  AL_FAN_MANUAL_ON_OFF = 0x0037,

  /**
   * Controller On/Off
   * Switches controller on or off. Off means protection mode
   */
  AL_CONTROLLER_ON_OFF = 0x0038,

  /**
   * Relative Set Point Request
   * Request for a new relative set point value
   */
  AL_RELATIVE_SET_POINT_REQUEST = 0x0039,

  /**
   * Eco mode On/Off Request
   * Switches eco mode on or off
   */
  AL_ECO_ON_OFF = 0x003a,

  /**
   * Comfort Temperature
   * Sends the current comfort temperature
   */
  AL_COMFORT_TEMPERATURE = 0x003b,

  /**
   * Fan Level Request
   * Request for a new manual fan stage
   */
  AL_FAN_STAGE_REQUEST = 0x0040,

  /**
   * Fan Manual On/Off Request
   * WARNING: DO NOT USE!!!! Request for switching fan in manual/auto mode
   */
  AL_FAN_MANUAL_ON_OFF_REQUEST = 0x0041,

  /**
   * Controller On/Off Request
   * Request for switching controller on or off. Off means protection mode
   */
  AL_CONTROLLER_ON_OFF_REQUEST = 0x0042,

  /**
   * Eco mode On/Off Request
   * Indicates ECO mode
   */
  AL_ECO_ON_OFF_INDICATION = 0x0044,

  /**
   * Info On/Off
   * Reflects the binary state of the actuator
   */
  AL_INFO_ON_OFF = 0x0100,

  /**
   * Force-position info
   * Indicates the cause of forced operation (0 = not forced)
   */
  AL_INFO_FORCE = 0x0101,

  /**
   * SysAP-InfoOnOff
   * Reflects the binary state of the actuator group
   */
  AL_SYSAP_INFO_ON_OFF = 0x0105,

  /**
   * SysAP-InfoForce
   * Indicates whether the actuator group is forced (1) or not forced (0)
   */
  AL_SYSAP_INFO_FORCE = 0x0106,

  /**
   * Info Actual Dimming Value
   * Reflects the actual value of the actuator
   */
  AL_INFO_ACTUAL_DIMMING_VALUE = 0x0110,

  /**
   * Info Error
   * Indicates load failures / short circuits / etc
   */
  AL_INFO_ERROR = 0x0111,

  /**
   * SysAP-InfoCurrentDimmingValue
   * Reflects the actual value of the actuator group
   */
  AL_SYSAP_INFO_ACTUAL_DIMMING_VALUE = 0x0115,

  /**
   * SysAP-InfoError
   * Indicates load failures / short circuits / etc
   */
  AL_SYSAP_INFO_ERROR = 0x0116,

  /**
   * Info Color Temperature
   * Color temperature
   */
  AL_INFO_COLOR_TEMPERATURE = 0x0118,

  /**
   * SysAP-Info Color Temperature
   * Color temperature
   */
  AL_SYSAP_INFO_COLOR_TEMPERATURE = 0x011a,

  /**
   * Info HSV
   * Hue (2 Byte) Saturation (1 Byte); Value (1 Byte - brightness)
   */
  AL_INFO_HSV = 0x011b,

  /**
   * SysAP Info HSV
   * Hue (2 Byte) Saturation (1 Byte); Value (1 Byte - brightness)
   */
  AL_SYSAP_INFO_HSV = 0x011c,

  /**
   * Info Color Mode
   * hsv or ct
   */
  AL_INFO_COLOR_MODE = 0x011d,

  /**
   * SysAP Info Color Mode
   * hsv or ct
   */
  AL_SYSAP_INFO_COLOR_MODE = 0x011e,

  /**
   * Info Move Up/Down
   * Indicates last moving direction and whether moving currently or not
   */
  AL_INFO_MOVE_UP_DOWN = 0x0120,

  /**
   * Current Absolute Position Blinds Percentage
   * Indicate the current position of the sunblinds in percentage
   */
  AL_CURRENT_ABSOLUTE_POSITION_BLINDS_PERCENTAGE = 0x0121,

  /**
   * Current Absolute Position Slats Percentage
   * Indicate the current position of the slats in percentage
   */
  AL_CURRENT_ABSOLUTE_POSITION_SLATS_PERCENTAGE = 0x0122,

  /**
   * SysAP-InfoMoveUpDown
   * Indicates last moving direction and whether moving currently or not of the actuator group
   */
  AL_SYSAP_INFO_MOVE_UP_DOWN = 0x0125,

  /**
   * SysAP-InfoCurrentAbsoluteBlindsPercentage
   * indicate the current position of the sunblinds in percentage of the actuator group
   */
  AL_SYSAP_CURRENT_ABSOLUTE_POSITION_BLINDS_PERCENTAGE = 0x0126,

  /**
   * SysAP-InfoCurrentAbsoluteSlatsPercentage
   * indicate the current position of the slats in percentage of the actuator group
   */
  AL_SYSAP_CURRENT_ABSOLUTE_POSITION_SLATS_PERCENTAGE = 0x0127,

  /**
   * Measured Temperature
   * Indicates the actual measured temperature
   */
  AL_MEASURED_TEMPERATURE = 0x0130,

  /**
   * Info Value Heating
   * States the current flow volume of the conrol valve
   */
  AL_INFO_VALUE_HEATING = 0x0131,

  /**
   * Info value cooling
   * States the current flow volume of the conrol valve
   */
  AL_INFO_VALUE_COOLING = 0x0132,

  /**
   * Switchover heating/cooling
   * switch between heating and cooling: heating = 0 / cooling = 1
   */
  AL_HEATING_COOLING = 0x0135,

  /**
   * Actuating Fan Stage Heating
   * Requests a new manual fan stage from actuator in heating mode
   */
  AL_ACTUATING_FAN_STAGE_HEATING = 0x0136,

  /**
   * Absolute setpoint temperature
   * Absolute set point temperature input for timer
   */
  AL_INFO_ABSOLUTE_SET_POINT_REQUEST = 0x0140,

  /**
   * Additional heating value info
   * Feedback
   */
  AL_INFO_ACTUATING_VALUE_ADD_HEATING = 0x0141,

  /**
   * Additional cooling value info
   * Feedback
   */
  AL_INFO_ACTUATING_VALUE_ADD_COOLING = 0x0142,

  /**
   * Control value additional heating
   *
   */
  AL_ACTUATING_VALUE_ADD_HEATING = 0x0143,

  /**
   * Control value additional cooling
   *
   */
  AL_ACTUATING_VALUE_ADD_COOLING = 0x0144,

  /**
   * Info Actuating Fan Stage Heating
   * Feedback from FCA
   */
  AL_INFO_FAN_ACTUATING_STAGE_HEATING = 0x0145,

  /**
   * Info Actuating Fan Manual On/Off Heating
   * Feedback from FCA
   */
  AL_INFO_FAN_MANUAL_ON_OFF_HEATING = 0x0146,

  /**
   * Actuating Fan Stage Cooling
   * Requests a new manual fan stage from actuator in cooling mode
   */
  AL_ACTUATING_FAN_STAGE_COOLING = 0x0147,

  /**
   * Info Fan Stage Cooling
   * Feedback for current fan stage in cooling mode
   */
  AL_INFO_FAN_ACTUATING_STAGE_COOLING = 0x0149,

  /**
   * Info Fan Manual On/Off Cooling
   * Feedback for manual fan control cooling mode
   */
  AL_INFO_FAN_MANUAL_ON_OFF_COOLING = 0x014a,

  /**
   * Heating active
   *
   */
  AL_HEATING_ACTIVE = 0x014b,

  /**
   * Cooling active
   *
   */
  AL_COOLING_ACTIVE = 0x014c,

  /**
   * Heating demand
   *
   */
  AL_HEATING_DEMAND = 0x014d,

  /**
   * Cooling demand
   *
   */
  AL_COOLING_DEMAND = 0x014e,

  /**
   * Heating demand feedback signal
   *
   */
  AL_INFO_HEATING_DEMAND = 0x014f,

  /**
   * Cooling demand feedback signal
   *
   */
  AL_INFO_COOLING_DEMAND = 0x0150,

  /**
   * Humidity
   * Measured Humidity
   */
  AL_HUMIDITY = 0x0151,

  /**
   * Aux On/Off request
   * Aux On/Off request
   */
  AL_AUX_ON_OFF_REQUEST = 0x0152,

  /**
   * Aux On/Off response
   * Aux On/Off response
   */
  AL_AUX_ON_OFF_RESPONSE = 0x0153,

  /**
   * Heating On/Off request
   * Heating On/Off request
   */
  AL_HEATING_ON_OFF_REQUEST = 0x0154,

  /**
   * Cooling On/Off request
   * Cooling On/Off request
   */
  AL_COOLING_ON_OFF_REQUEST = 0x0155,

  /**
   * Operation mode
   *
   */
  AL_INFO_OPERATION_MODE = 0x0156,

  /**
   * Swing H/V
   *
   */
  AL_INFO_SWING_MODE = 0x0157,

  /**
   * Supported features
   *
   */
  AL_SUPPORTED_FEATURES = 0x0158,

  /**
   * Extended Status Indication
   *
   */
  AL_EXTENDED_STATUS = 0x0159,

  /**
   * Extended Status Indication
   *
   */
  AL_EXTENDED_STATUS_US = 0x015a,

  /**
   * Aux Heating On Off Request
   *
   */
  AL_AUX_HEATING_ON_OFF_REQUEST = 0x015b,

  /**
   * Emergency Heating On Off Request
   *
   */
  AL_EMERGENCY_HEATING_ON_OFF_REQUEST = 0x015c,

  /**
   * Relative fan speed control
   * Relative control of the set value
   */
  AL_RELATIVE_FAN_SPEED_CONTROL = 0x0160,

  /**
   * Absolute fan speed control
   * Absolute control of the set value
   */
  AL_ABSOLUTE_FAN_SPEED_CONTROL = 0x0161,

  /**
   * Info absolute fan speed
   * Reflects the actual value of the actuator
   */
  AL_INFO_ABSOLUTE_FAN_SPEED = 0x0162,

  /**
   * SysAP-InfoActualFanSpeed
   * Reflects the actual value of the actuator
   */
  AL_SYSAP_INFO_ABSOLUTE_FAN_SPEED = 0x0163,

  /**
   * Notification flags
   * Notifications of RF devices (e. g. Battery low)
   */
  AL_NOTIFICATION_FLAGS = 0x01a0,

  /**
   * Power RC
   * Bool Value 1
   */
  AL_BOOL_VALUE_1 = 0x0280,

  /**
   * Power RH
   * Bool Value 2
   */
  AL_BOOL_VALUE_2 = 0x0281,

  /**
   * Proximity status
   * Bool Value 3
   */
  AL_BOOL_VALUE_3 = 0x0282,

  /**
   * Brightness sensor
   * Scaling Value 1
   */
  AL_SCALING_VALUE_1 = 0x0290,

  /**
   * Last touch
   * Scaling Value 2
   */
  AL_SCALING_VALUE_2 = 0x0291,

  /**
   * LED backlighting night mode
   * Scaling Value 3
   */
  AL_SCALING_VALUE_3 = 0x0292,

  /**
   * Locator beep
   * Locator Beep
   */
  AL_LOCATOR_BEEP = 0x02c0,

  /**
   * Switch test alarm
   * Switch Test Alarm
   */
  AL_SWITCH_TEST_ALARM = 0x02c1,

  /**
   * Fire alarm active
   * Fire-Alarm Active
   */
  AL_FIRE_ALARM_ACTIVE = 0x02c3,

  /**
   * Outside temperature
   * Outdoor Temperature
   */
  AL_OUTDOOR_TEMPERATURE = 0x0400,

  /**
   * Wind force
   * Wind force
   */
  AL_WIND_FORCE = 0x0401,

  /**
   * Brightness alarm
   * Brightness alarm
   */
  AL_BRIGHTNESS_ALARM = 0x0402,

  /**
   * Lux value
   * Weatherstation brightness level
   */
  AL_BRIGHTNESS_LEVEL = 0x0403,

  /**
   * Wind speed
   * Wind speed
   */
  AL_WIND_SPEED = 0x0404,

  /**
   * Rain detection
   *
   */
  AL_RAIN_SENSOR_ACTIVATION_PERCENTAGE = 0x0405,

  /**
   * Rain sensor frequency
   *
   */
  AL_RAIN_SENSOR_FREQUENCY = 0x0406,

  /**
   * Play
   * Start playing
   */
  AL_MEDIA_PLAY = 0x0440,

  /**
   * Pause
   * Pause/Stop playing
   */
  AL_MEDIA_PAUSE = 0x0441,

  /**
   * Next
   * Play next title
   */
  AL_MEDIA_NEXT = 0x0442,

  /**
   * Previous
   * Play previous title
   */
  AL_MEDIA_PREVIOUS = 0x0443,

  /**
   * Play mode
   * Play mode (shuffle / repeat)
   */
  AL_MEDIA_PLAY_MODE = 0x0444,

  /**
   * Mute
   * Mute (1) and unmute (0) a player
   */
  AL_MEDIA_MUTE = 0x0445,

  /**
   * Relative volume control
   * Relative volume control. See also relative dimming
   */
  AL_RELATIVE_VOLUME_CONTROL = 0x0446,

  /**
   * Absolute volume control
   * Set player volume
   */
  AL_ABSOLUTE_VOLUME_CONTROL = 0x0447,

  /**
   * Group membership
   *
   */
  AL_GROUP_MEMBERSHIP = 0x0448,

  /**
   * Play favorite
   *
   */
  AL_PLAY_FAVORITE = 0x0449,

  /**
   * Play next favorite
   *
   */
  AL_PLAY_NEXT_FAVORITE = 0x044a,

  /**
   * Playback status
   *
   */
  AL_PLAYBACK_STATUS = 0x0460,

  /**
   * Current item metadata info
   *
   */
  AL_INFO_MEDIA_CURRENT_ITEM_METADATA = 0x0461,

  /**
   * Info mute
   *
   */
  AL_INFO_MUTE = 0x0462,

  /**
   * Info actual volume
   *
   */
  AL_INFO_ACTUAL_VOLUME = 0x0463,

  /**
   * Allowed playback actions
   *
   */
  AL_ALLOWED_PLAYBACK_ACTIONS = 0x0464,

  /**
   * Info group membership
   *
   */
  AL_INFO_GROUP_MEMBERSHIP = 0x0465,

  /**
   * Info playing favorite
   *
   */
  AL_INFO_PLAYING_FAVORITE = 0x0466,

  /**
   * Absolute Group Volume Control
   *
   */
  AL_ABSOLUTE_GROUP_VOLUME_CONTROL = 0x0467,

  /**
   * Info Absolute Group Volume
   *
   */
  AL_INFO_ABSOLUTE_GROUP_VOLUME = 0x0468,

  /**
   * Media source
   *
   */
  AL_INFO_CURRENT_MEDIA_SOURCE = 0x0469,

  /**
   * Solar power production
   * Power from the sun
   */
  AL_SOLAR_POWER_PRODUCTION = 0x04a0,

  /**
   * Inverter output power
   * Output power of inverter (pbatt+Psun)
   */
  AL_INVERTER_OUTPUT_POWER = 0x04a1,

  /**
   * Solar energy (today)
   * Produced Energy
   */
  AL_SOLAR_ENERGY_TODAY = 0x04a2,

  /**
   * Injected energy (today)
   * Energy into the grid
   */
  AL_INJECTED_ENERGY_TODAY = 0x04a3,

  /**
   * Purchased energy (today)
   * Energy from the grid
   */
  AL_PURCHASED_ENERGY_TODAY = 0x04a4,

  /**
   * Inverter alarm
   * Inverter is working in stand alone mode
   */
  AL_NOTIFICATION_RUN_STANDALONE = 0x04a5,

  /**
   * Self-consumption
   * production PV/ Total consumption
   */
  AL_SELF_CONSUMPTION = 0x04a6,

  /**
   * Self-sufficiency
   * Consumption from PV/ Total consumption
   */
  AL_SELF_SUFFICIENCY = 0x04a7,

  /**
   * Home power consumption
   * Power in home (PV and grid)
   */
  AL_HOME_POWER_CONSUMPTION = 0x04a8,

  /**
   * Power to grid
   * Power from and to the grid: Purchased (less than 0), Injection (more than 0)
   */
  AL_POWER_TO_GRID = 0x04a9,

  /**
   * Consumed energy (today)
   * Energy bought from grid per day
   */
  AL_CONSUMED_ENERGY_TODAY = 0x04aa,

  /**
   * Meter alarm
   * Meter communication loss
   */
  AL_NOTIFICATION_METER_COMMUNICATION_ERROR_WARNING = 0x04ab,

  /**
   * Battery level
   * Battery level
   */
  AL_SOC = 0x04ac,

  /**
   * Battery power
   * Batter power: Discharge (less then 0), Charge (more then 0)
   */
  AL_BATTERY_POWER = 0x04ad,

  /**
   * Boost
   * 1: Boost enable request, 0: boost disable request
   */
  AL_BOOST_ENABLE_REQUEST = 0x04b0,

  /**
   * Stop charging reuqest
   * 1: Stop charging session requested, 0: n/a so far, will be resetted when cable is unplugged
   */
  AL_STOP_CHARGING_SESSIONS_REQUEST = 0x04b1,

  /**
   * Enable charging reuqest
   * 1: Enable charging when cable is plugged in, 0: Disable next charging session but charge until cable is plugged
   */
  AL_STOP_ENABLE_CHARGING_REQUEST = 0x04b2,

  /**
   * Info boost
   * 1: Boost enabled, 0: boost disabled
   */
  AL_INFO_BOOST = 0x04b3,

  /**
   * Info wallbox status
   * Wallbox status 00000001: car plugged in,
   *                00000002: Authorization granted,
   *                00000004: Not charging, battery fully loaded,
   *                40000000: charging stopped due to blackout prevention,
   *                80000000: Ground fault error
   */
  AL_INFO_WALLBOX_STATUS = 0x04b4,

  /**
   * Info charging
   * 1: Charging, 0: Not charging
   */
  AL_INFO_CHARGING = 0x04b5,

  /**
   * Info charging enabled
   * 1: Charging enabled for next session, 0: Charging disabled for next session
   */
  AL_INFO_CHARGING_ENABLED = 0x04b6,

  /**
   * Info installed power
   * Installed power (e.g. 20 kW)
   */
  AL_INFO_INSTALLED_POWER = 0x04b7,

  /**
   * Info transmitted energy
   * Energy transmitted so far per session (in Wh)
   */
  AL_INFO_ENERGY_TRANSMITTED = 0x04b8,

  /**
   * Info car range
   * Car range in km per sessions
   */
  AL_INFO_CAR_RANGE = 0x04b9,

  /**
   * Info charging duration
   * Start of charging session (in minutes in UTC)
   */
  AL_INFO_START_OF_CHARGING_SESSION = 0x04ba,

  /**
   * Info current limit
   * Limit for charger (in kW)
   */
  AL_INFO_LIMIT_FOR_CHARGER = 0x04bb,

  /**
   * Info current limit for group
   * Limit for group of charger (in kW)
   */
  AL_INFO_LIMIT_FOR_CHARGER_GROUP = 0x04bc,

  /**
   * Album cover URL
   * Album cover URL
   */
  AL_INFO_ALBUM_COVER_URL = 0x04bd,

  /**
   * secure@home Central Unit
   * Encrypted control datapoint for domus alarm center
   */
  AL_DISARM_SYSTEM = 0x0501,

  /**
   * DomusDisarmCounter
   * Info about the next counter to disarm the system
   */
  AL_DISARM_COUNTER = 0x0502,

  /**
   * Intrusion Alarm
   * Intrusion Alarm
   */
  AL_INFO_INTRUSION_ALARM = 0x0504,

  /**
   * Safety Alarm
   * Safety Alarm
   */
  AL_INFO_SAFETY_ALARM = 0x0505,

  /**
   * InfoConfigurationStatus
   * Domus alarm device negative feedback and configuration info.
   */
  AL_INFO_ERROR_STATUS = 0x0507,

  /**
   * Enable configuration
   * Encrypted control datapoint for entering configuration mode
   */
  AL_ENABLE_CONFIGURATION = 0x0508,

  /**
   * Disarming LED
   * Arm/Disarm a Zone
   */
  AL_DOMUS_ZONE_CONTROL = 0x0509,

  /**
   * AES Key
   * Manufacturer ID + Serial + AES Key
   */
  AL_DOMUS_KEY_INFO = 0x050a,

  /**
   * Zone status
   * Zone status
   */
  AL_ZONE_STATUS = 0x050b,

  /**
   * Time
   * Absolute number of seconds when the zone will be armed
   */
  AL_DOMUS_DISARM_DELAY_TIME = 0x050e,

  /**
   * Start / Stop
   * Starts / Stops operation
   */
  AL_START_STOP = 0x0600,

  /**
   * Pause / Resume
   *
   */
  AL_PAUSE_RESUME = 0x0601,

  /**
   * Select program
   *
   */
  AL_SELECT_PROGRAM = 0x0602,

  /**
   * Delayed start time
   *
   */
  AL_DELAYED_START_TIME = 0x0603,

  /**
   * Info status
   *
   */
  AL_INFO_STATUS = 0x0604,

  /**
   * Info remote start enabled
   *
   */
  AL_INFO_REMOTE_START_ENABLED = 0x0605,

  /**
   * Info program
   *
   */
  AL_INFO_PROGRAM = 0x0606,

  /**
   * Info finish time
   *
   */
  AL_INFO_FINISH_TIME = 0x0607,

  /**
   * Info delayed start
   *
   */
  AL_INFO_DELAYED_START_TIME = 0x0608,

  /**
   * Info door
   *
   */
  AL_INFO_DOOR = 0x0609,

  /**
   * Info door alarm
   *
   */
  AL_INFO_DOOR_ALARM = 0x060a,

  /**
   * Switch supercool
   *
   */
  AL_SWITCH_SUPERCOOL = 0x060b,

  /**
   * Switch superfreeze
   *
   */
  AL_SWITCH_SUPERFREEZE = 0x060c,

  /**
   * Info switch supercool
   *
   */
  AL_INFO_SWITCH_SUPERCOOL = 0x060d,

  /**
   * Info switch superfreeze
   *
   */
  AL_INFO_SWITCH_SUPERFREEZE = 0x060e,

  /**
   * Measured Temperature
   *
   */
  AL_CURRENT_TEMPERATURE_APPLIANCE_1 = 0x060f,

  /**
   * Measured Temperature
   *
   */
  AL_CURRENT_TEMPERATURE_APPLIANCE_2 = 0x0610,

  /**
   * Set Value Temperature
   *
   */
  AL_SETPOINT_TEMPERATURE_APPLIANCE_1 = 0x0611,

  /**
   * Set Value Temperature
   *
   */
  AL_SETPOINT_TEMPERATURE_APPLIANCE_2 = 0x0612,

  /**
   * Change operation
   *
   */
  AL_CHANGE_OPERATION = 0x0613,

  /**
   * Detailed status info
   *
   */
  AL_INFO_VERBOSE_STATUS = 0x0614,

  /**
   * Info remaining time
   * Remaining time till status change (start, finish, etc.)
   */
  AL_INFO_REMAINING_TIME = 0x0615,

  /**
   * Time of last status change (start, finish, etc.)
   * Time of last status change (start, finish, etc.)
   */
  AL_INFO_STATUS_CHANGED_TIME = 0x0616,

  /**
   * Lock/Unlock door command
   * Lock/Unlock door command (1 Bit)
   */
  AL_LOCK_UNLOCK_COMMAND = 0x0618,

  /**
   * Info Locked / Unlocked
   * Info Lock/Unlock door(1 Bit)
   */
  AL_INFO_LOCK_UNLOCK_COMMAND = 0x0619,

  /**
   * Time
   * Current local time
   */
  AL_TIME_OF_DAY = 0xf001,

  /**
   * Date
   * Curent local date
   */
  AL_DATE = 0xf002,

  /**
   * Notification
   * Notification from message center
   */
  AL_MESSAGE_CENTER_NOTIFICATION = 0xf003,

  /**
   * Switch entity On/Off
   * Entity control e.g. activate an alert or timer program
   */
  AL_SWITCH_ENTITY_ON_OFF = 0xf101,

  /**
   * Info switch entity On/Off
   * Reflects the active state of an entity e.g. alert or timer program
   */
  AL_INFO_SWITCH_ENTITY_ON_OFF = 0xf102,

  /**
   * Consistency Tag
   * Notifications of RF devices (e. g. Battery low)
   */
  AL_CONSISTENCY_TAG = 0xf104,

  /**
   * Battery Status
   * Notifications of RF devices (e. g. Battery low)
   */
  AL_BATTERY_STATUS = 0xf105,

  /**
   * Stay awake!
   * Notifications of RF devices (e. g. Battery low)
   */
  AL_STAY_AWAKE = 0xf106,

  /**
   * Proxy switch
   *
   */
  AL_PROXY_1_TO_6_BIT = 0xf107,

  /**
   * Proxy, 1 byte
   *
   */
  AL_PROXY_1_BYTE = 0xf108,

  /**
   * Proxy, 2 byte
   *
   */
  AL_PROXY_2_BYTE = 0xf109,

  /**
   * Proxy, 4 byte
   *
   */
  AL_PROXY_4_BYTE = 0xf10a,

  /**
   * Cyclic sleep time
   * Time of sleep cycles
   */
  AL_CYCLIC_SLEEP_TIME = 0xf10b,

  /**
   * Presence
   * SysAP presence
   */
  AL_SYSAP_PRESENCE = 0xf10c,

  /**
   * Measured temperature 1
   * SysAP temperature
   */
  AL_SYSAP_TEMPERATURE = 0xf10d,

  /**
   * Standby Statistics
   * Statistics about standby usage for battery devices
   */
  AL_STANDBY_STATISTICS = 0xf10e,

  /**
   * Heartbeat delay
   * Time period between two heartbeats
   */
  AL_HEARTBEAT_DELAY = 0xf10f,

  /**
   * Info heartbeat delay
   * Time period between two heartbeats
   */
  AL_INFO_HEARTBEAT_DELAY = 0xf110,

  /**
   * Measured temperature 1
   * For debug purposes
   */
  AL_MEASURED_TEMPERATURE_1 = 0xff01,

  /**
   * Measured temperature 2
   * For debug purposes
   */
  AL_MEASURED_TEMPERATURE_2 = 0xff02,

  /**
   * Measured temperature 3
   * For debug purposes
   */
  AL_MEASURED_TEMPERATURE_3 = 0xff03,

  /**
   * Measured temperature 4
   * For debug purposes
   */
  AL_MEASURED_TEMPERATURE_4 = 0xff04,
}
