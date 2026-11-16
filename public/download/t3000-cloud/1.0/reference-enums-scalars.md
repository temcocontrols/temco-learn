---
title: "Enums and Scalars"
order: 80
---

The enumerations used by the API, with the values each one accepts.

## AutoManual

`AUTO`, `MANUAL`

## BuildingProtocol

`AUTO`, `MODBUS_485`, `MODBUS_TCP`, `BACNET_MSTP`, `REMOTE_DEVICE`

## BuildingScalarFieldEnum

`id`, `title`, `protocol`, `ip`, `modbusTcpPort`, `comPort`, `baudRate`, `country`, `state`, `city`, `street`, `zip`, `engineering`, `createdAt`, `updatedAt`, `projectId`

## DeviceConnection

`LOCAL_NETWORK`, `SERIAL_PORT`, `VIRTUAL_DEVICE`

## DeviceScalarFieldEnum

`id`, `connection`, `productType`, `alias`, `serialNumber`, `networkId`, `floor`, `room`, `buildingId`, `createdAt`, `updatedAt`

## GraphicScalarFieldEnum

`id`, `index`, `label`, `fullLabel`, `fileId`, `elementCount`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## HolidayScalarFieldEnum

`id`, `index`, `label`, `fullLabel`, `autoManual`, `value`, `days`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## InputScalarFieldEnum

`id`, `index`, `panel`, `label`, `fullLabel`, `autoManual`, `value`, `units`, `range`, `calibration`, `sign`, `filter`, `status`, `signalType`, `type`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## OutputScalarFieldEnum

`id`, `index`, `panel`, `label`, `fullLabel`, `autoManual`, `hoaSwitch`, `value`, `units`, `range`, `lowVoltage`, `highVoltage`, `pwmPeriod`, `status`, `type`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## PidScalarFieldEnum

`id`, `index`, `input`, `inputValue`, `inputUnits`, `autoManual`, `output`, `setpoint`, `setpointValue`, `setpointUnits`, `action`, `pidProp`, `pidInt`, `pidTime`, `pidDer`, `bias`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## ProgramScalarFieldEnum

`id`, `index`, `label`, `fullLabel`, `status`, `autoManual`, `size`, `executionTime`, `sourceCode`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## ProjectScalarFieldEnum

`id`, `name`, `slug`, `description`, `imageFileId`, `createdAt`, `updatedAt`

## QueryMode

`default`, `insensitive`

## ScheduleScalarFieldEnum

`id`, `index`, `label`, `fullLabel`, `autoManual`, `output`, `holiday1`, `status1`, `holiday2`, `status2`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`

## ScheduleTimeScalarFieldEnum

`id`, `status`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saterday`, `sunday`, `holiday1`, `holiday2`, `createdAt`, `updatedAt`, `scheduleId`

## SortOrder

`asc`, `desc`

## VariableScalarFieldEnum

`id`, `index`, `label`, `fullLabel`, `autoManual`, `value`, `units`, `binaryArray`, `createdAt`, `updatedAt`, `deviceId`
