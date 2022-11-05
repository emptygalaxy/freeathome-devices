export enum DeviceTypeId {
  HomeTouch = 0x1038,
  SysAP = 0xffff,
  CommunicationInterface1 = 0x1012,
  CommunicationInterface2 = 0x2012,

  Thermostat = 0x1004,

  /**
   * Jalousieaktor 4-fach, REG
   */
  JalousieAktor4Fach = 0xb001,

  /**
   * Sensor/ Jalousieaktor 1/1-fach
   */
  SensorJalousieAktor1Fach = 0x1013,
  Jalousie3 = 0x1015,

  /**
   * Sensor/ Schaltaktor 8/8fach, REG
   */
  SensorSchakelAktor8Fach = 0xb008,

  /**
   * Schaltaktor 4-fach, 16A, REG
   */
  SchakelAktor4Fach = 0xb002,
  SchakelAktor3 = 0x100c,
  SchakelAktor4 = 0x1010,

  /**
   * Sensor/ Schaltaktor 2/1-fach
   */
  SensorSchakelAktor21Fach = 0x100e,
  VirtualSchakelAktor = 0x0001,

  DimmAktor2 = 0x1022,
  /**
   * Dimmaktor 4-fach
   */
  DimmAktor4Fach = 0x101c,
  /**
   * Dimmaktor 4-fach v2
   */
  DimmAktor4FachV2 = 0x1021,
  DimmAktor4 = 0x1017,
  DimmAktor5 = 0x1019,

  BinarySensor1 = 0xb005,
  BinarySensor2 = 0xb007,
  BinarySensor3 = 0x0004,

  /**
   * Hue Aktor (Plug Switch)
   */
  HueAktor = 0x10c4,

  /**
   * Hue Aktor (LED Strip)
   */
  HueAktorLedStrip = 0x10c0,
}
