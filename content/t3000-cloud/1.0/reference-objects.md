---
title: "Object Types"
order: 140
---

The GraphQL object types the API returns. Relation fields take filter, order, cursor and paging arguments; only the returned type is listed here.

## AffectedRowsOutput

| Field | Type |
| --- | --- |
| `count` | `Int!` |

## AuthPayloadUser

| Field | Type |
| --- | --- |
| `id` | `String` |
| `role` | `String!` |

## BuildingCountOutputType

| Field | Type |
| --- | --- |
| `devices` | `Int` |

## Building

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `title` | `String!` |
| `protocol` | `BuildingProtocol` |
| `ip` | `String` |
| `modbusTcpPort` | `String` |
| `comPort` | `String` |
| `baudRate` | `Int` |
| `country` | `String` |
| `state` | `String` |
| `city` | `String` |
| `street` | `String` |
| `zip` | `String` |
| `engineering` | `String!` |
| `devices` | `[Device!]!` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Project` | `Project!` |
| `projectId` | `String!` |
| `_count` | `BuildingCountOutputType` |

## DeviceCountOutputType

| Field | Type |
| --- | --- |
| `inputs` | `Int` |
| `outputs` | `Int` |
| `pids` | `Int` |
| `variables` | `Int` |
| `graphics` | `Int` |
| `programs` | `Int` |
| `holidays` | `Int` |
| `schedules` | `Int` |

## Device

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `connection` | `DeviceConnection!` |
| `productType` | `String!` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `buildingId` | `Int` |
| `building` | `Building` |
| `inputs` | `[Input!]!` |
| `outputs` | `[Output!]!` |
| `pids` | `[Pid!]!` |
| `variables` | `[Variable!]!` |
| `graphics` | `[Graphic!]!` |
| `programs` | `[Program!]!` |
| `holidays` | `[Holiday!]!` |
| `schedules` | `[Schedule!]!` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `_count` | `DeviceCountOutputType` |

## FileCountOutputType

| Field | Type |
| --- | --- |
| `Graphic` | `Int` |
| `Project` | `Int` |

## File

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `name` | `String!` |
| `mimeType` | `String!` |
| `path` | `String!` |
| `size` | `Int` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `meta` | `JSON` |
| `tags` | `[String!]!` |
| `Graphic` | `[Graphic!]!` |
| `Project` | `[Project!]!` |
| `_count` | `FileCountOutputType` |

## Graphic

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `fileId` | `Int` |
| `picture` | `File` |
| `elementCount` | `Int!` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## Holiday

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `days` | `[DateTime!]!` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## Input

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `panel` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `units` | `String` |
| `range` | `String` |
| `calibration` | `Float` |
| `sign` | `String` |
| `filter` | `Int` |
| `status` | `String!` |
| `signalType` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## Output

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `panel` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `hoaSwitch` | `String` |
| `value` | `String` |
| `units` | `String` |
| `range` | `String` |
| `lowVoltage` | `Float` |
| `highVoltage` | `Float` |
| `pwmPeriod` | `Int` |
| `status` | `String!` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## Pid

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `input` | `String` |
| `inputValue` | `Float` |
| `inputUnits` | `String` |
| `autoManual` | `AutoManual!` |
| `output` | `String` |
| `setpoint` | `String` |
| `setpointValue` | `Float` |
| `setpointUnits` | `String` |
| `action` | `String` |
| `pidProp` | `Int` |
| `pidInt` | `Int` |
| `pidTime` | `String` |
| `pidDer` | `Float` |
| `bias` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## Program

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `status` | `String` |
| `autoManual` | `AutoManual!` |
| `size` | `Int` |
| `executionTime` | `Int!` |
| `sourceCode` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |

## ProjectCountOutputType

| Field | Type |
| --- | --- |
| `buildings` | `Int` |

## Project

| Field | Type |
| --- | --- |
| `id` | `String!` |
| `name` | `String!` |
| `slug` | `String` |
| `description` | `String` |
| `imageFileId` | `Int` |
| `image` | `File` |
| `buildings` | `[Building!]!` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `_count` | `ProjectCountOutputType` |

## ScheduleCountOutputType

| Field | Type |
| --- | --- |
| `times` | `Int` |

## ScheduleTime

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `status` | `String!` |
| `monday` | `DateTime` |
| `tuesday` | `DateTime` |
| `wednesday` | `DateTime` |
| `thursday` | `DateTime` |
| `friday` | `DateTime` |
| `saterday` | `DateTime` |
| `sunday` | `DateTime` |
| `holiday1` | `DateTime` |
| `holiday2` | `DateTime` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Schedule` | `Schedule` |
| `scheduleId` | `Int` |

## Schedule

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `output` | `String` |
| `holiday1` | `String` |
| `status1` | `String` |
| `holiday2` | `String` |
| `status2` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |
| `times` | `[ScheduleTime!]!` |
| `_count` | `ScheduleCountOutputType` |

## Variable

| Field | Type |
| --- | --- |
| `id` | `Int!` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `units` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime!` |
| `updatedAt` | `DateTime!` |
| `Device` | `Device` |
| `deviceId` | `Int` |
