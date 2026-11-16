---
title: "Input Types: Schedules, Programs, PIDs and Holidays"
order: 90
---

Write-model input types for the automation objects: schedules, Control Basic programs, PID loops and holidays.

## HolidayCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[HolidayCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## HolidayCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `days` | `[DateTime!]` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## HolidayCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[HolidayCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[HolidayCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `HolidayCreateManyDeviceInputEnvelope` |
| `connect` | `[HolidayFilterUnique!]` |

## HolidayCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `HolidayFilterUnique!` |
| `create` | `HolidayCreateWithoutDeviceInput!` |

## HolidayCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `days` | `[DateTime!]` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## HolidayFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `HolidayIndexDeviceIdCompoundUniqueInput` |

## HolidayFilter

| Field | Type |
| --- | --- |
| `AND` | `[HolidayFilter!]` |
| `OR` | `[HolidayFilter!]` |
| `NOT` | `[HolidayFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `days` | `DateTimeNullableListFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## HolidayIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## HolidayListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `HolidayFilter` |
| `some` | `HolidayFilter` |
| `none` | `HolidayFilter` |

## HolidayOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## HolidayOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `value` | `SortOrder` |
| `days` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## HolidayScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[HolidayScalarFilter!]` |
| `OR` | `[HolidayScalarFilter!]` |
| `NOT` | `[HolidayScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `days` | `DateTimeNullableListFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## HolidayUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `days` | `[DateTime!]` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## HolidayUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `HolidayScalarFilter!` |
| `data` | `HolidayUpdateManyMutationInput!` |

## HolidayUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[HolidayCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[HolidayCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[HolidayUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `HolidayCreateManyDeviceInputEnvelope` |
| `set` | `[HolidayFilterUnique!]` |
| `disconnect` | `[HolidayFilterUnique!]` |
| `delete` | `[HolidayFilterUnique!]` |
| `connect` | `[HolidayFilterUnique!]` |
| `update` | `[HolidayUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[HolidayUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[HolidayScalarFilter!]` |

## HolidayUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `HolidayFilterUnique!` |
| `data` | `HolidayUpdateWithoutDeviceInput!` |

## HolidayUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `days` | `[DateTime!]` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## HolidayUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `HolidayFilterUnique!` |
| `update` | `HolidayUpdateWithoutDeviceInput!` |
| `create` | `HolidayCreateWithoutDeviceInput!` |

## PidCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[PidCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## PidCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## PidCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[PidCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[PidCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `PidCreateManyDeviceInputEnvelope` |
| `connect` | `[PidFilterUnique!]` |

## PidCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `PidFilterUnique!` |
| `create` | `PidCreateWithoutDeviceInput!` |

## PidCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## PidFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `PidIndexDeviceIdCompoundUniqueInput` |

## PidFilter

| Field | Type |
| --- | --- |
| `AND` | `[PidFilter!]` |
| `OR` | `[PidFilter!]` |
| `NOT` | `[PidFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `input` | `StringNullableFilter` |
| `inputValue` | `FloatNullableFilter` |
| `inputUnits` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `output` | `StringNullableFilter` |
| `setpoint` | `StringNullableFilter` |
| `setpointValue` | `FloatNullableFilter` |
| `setpointUnits` | `StringNullableFilter` |
| `action` | `StringNullableFilter` |
| `pidProp` | `IntNullableFilter` |
| `pidInt` | `IntNullableFilter` |
| `pidTime` | `StringNullableFilter` |
| `pidDer` | `FloatNullableFilter` |
| `bias` | `IntNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## PidIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## PidListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `PidFilter` |
| `some` | `PidFilter` |
| `none` | `PidFilter` |

## PidOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## PidOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `input` | `SortOrder` |
| `inputValue` | `SortOrder` |
| `inputUnits` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `output` | `SortOrder` |
| `setpoint` | `SortOrder` |
| `setpointValue` | `SortOrder` |
| `setpointUnits` | `SortOrder` |
| `action` | `SortOrder` |
| `pidProp` | `SortOrder` |
| `pidInt` | `SortOrder` |
| `pidTime` | `SortOrder` |
| `pidDer` | `SortOrder` |
| `bias` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## PidScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[PidScalarFilter!]` |
| `OR` | `[PidScalarFilter!]` |
| `NOT` | `[PidScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `input` | `StringNullableFilter` |
| `inputValue` | `FloatNullableFilter` |
| `inputUnits` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `output` | `StringNullableFilter` |
| `setpoint` | `StringNullableFilter` |
| `setpointValue` | `FloatNullableFilter` |
| `setpointUnits` | `StringNullableFilter` |
| `action` | `StringNullableFilter` |
| `pidProp` | `IntNullableFilter` |
| `pidInt` | `IntNullableFilter` |
| `pidTime` | `StringNullableFilter` |
| `pidDer` | `FloatNullableFilter` |
| `bias` | `IntNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## PidUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `input` | `String` |
| `inputValue` | `Float` |
| `inputUnits` | `String` |
| `autoManual` | `AutoManual` |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## PidUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `PidScalarFilter!` |
| `data` | `PidUpdateManyMutationInput!` |

## PidUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[PidCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[PidCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[PidUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `PidCreateManyDeviceInputEnvelope` |
| `set` | `[PidFilterUnique!]` |
| `disconnect` | `[PidFilterUnique!]` |
| `delete` | `[PidFilterUnique!]` |
| `connect` | `[PidFilterUnique!]` |
| `update` | `[PidUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[PidUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[PidScalarFilter!]` |

## PidUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `PidFilterUnique!` |
| `data` | `PidUpdateWithoutDeviceInput!` |

## PidUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `input` | `String` |
| `inputValue` | `Float` |
| `inputUnits` | `String` |
| `autoManual` | `AutoManual` |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## PidUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `PidFilterUnique!` |
| `update` | `PidUpdateWithoutDeviceInput!` |
| `create` | `PidCreateWithoutDeviceInput!` |

## ProgramCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[ProgramCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## ProgramCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `status` | `String` |
| `autoManual` | `AutoManual!` |
| `size` | `Int` |
| `executionTime` | `Int` |
| `sourceCode` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProgramCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[ProgramCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[ProgramCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `ProgramCreateManyDeviceInputEnvelope` |
| `connect` | `[ProgramFilterUnique!]` |

## ProgramCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ProgramFilterUnique!` |
| `create` | `ProgramCreateWithoutDeviceInput!` |

## ProgramCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `status` | `String` |
| `autoManual` | `AutoManual!` |
| `size` | `Int` |
| `executionTime` | `Int` |
| `sourceCode` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProgramFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `ProgramIndexDeviceIdCompoundUniqueInput` |

## ProgramFilter

| Field | Type |
| --- | --- |
| `AND` | `[ProgramFilter!]` |
| `OR` | `[ProgramFilter!]` |
| `NOT` | `[ProgramFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `status` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `size` | `IntNullableFilter` |
| `executionTime` | `IntFilter` |
| `sourceCode` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## ProgramIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## ProgramListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `ProgramFilter` |
| `some` | `ProgramFilter` |
| `none` | `ProgramFilter` |

## ProgramOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## ProgramOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `status` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `size` | `SortOrder` |
| `executionTime` | `SortOrder` |
| `sourceCode` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## ProgramScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[ProgramScalarFilter!]` |
| `OR` | `[ProgramScalarFilter!]` |
| `NOT` | `[ProgramScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `status` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `size` | `IntNullableFilter` |
| `executionTime` | `IntFilter` |
| `sourceCode` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## ProgramUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `status` | `String` |
| `autoManual` | `AutoManual` |
| `size` | `Int` |
| `executionTime` | `Int` |
| `sourceCode` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProgramUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ProgramScalarFilter!` |
| `data` | `ProgramUpdateManyMutationInput!` |

## ProgramUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[ProgramCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[ProgramCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[ProgramUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `ProgramCreateManyDeviceInputEnvelope` |
| `set` | `[ProgramFilterUnique!]` |
| `disconnect` | `[ProgramFilterUnique!]` |
| `delete` | `[ProgramFilterUnique!]` |
| `connect` | `[ProgramFilterUnique!]` |
| `update` | `[ProgramUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[ProgramUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[ProgramScalarFilter!]` |

## ProgramUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ProgramFilterUnique!` |
| `data` | `ProgramUpdateWithoutDeviceInput!` |

## ProgramUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `status` | `String` |
| `autoManual` | `AutoManual` |
| `size` | `Int` |
| `executionTime` | `Int` |
| `sourceCode` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProgramUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ProgramFilterUnique!` |
| `update` | `ProgramUpdateWithoutDeviceInput!` |
| `create` | `ProgramCreateWithoutDeviceInput!` |

## ScheduleCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[ScheduleCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## ScheduleCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[ScheduleCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[ScheduleCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `ScheduleCreateManyDeviceInputEnvelope` |
| `connect` | `[ScheduleFilterUnique!]` |

## ScheduleCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleFilterUnique!` |
| `create` | `ScheduleCreateWithoutDeviceInput!` |

## ScheduleCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
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
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `times` | `ScheduleTimeCreateNestedManyWithoutScheduleInput` |

## ScheduleFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `ScheduleIndexDeviceIdCompoundUniqueInput` |

## ScheduleFilter

| Field | Type |
| --- | --- |
| `AND` | `[ScheduleFilter!]` |
| `OR` | `[ScheduleFilter!]` |
| `NOT` | `[ScheduleFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `output` | `StringNullableFilter` |
| `holiday1` | `StringNullableFilter` |
| `status1` | `StringNullableFilter` |
| `holiday2` | `StringNullableFilter` |
| `status2` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |
| `times` | `ScheduleTimeListRelationFilter` |

## ScheduleIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## ScheduleListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `ScheduleFilter` |
| `some` | `ScheduleFilter` |
| `none` | `ScheduleFilter` |

## ScheduleOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## ScheduleOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `output` | `SortOrder` |
| `holiday1` | `SortOrder` |
| `status1` | `SortOrder` |
| `holiday2` | `SortOrder` |
| `status2` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |
| `times` | `ScheduleTimeOrderByRelationAggregateInput` |

## ScheduleScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[ScheduleScalarFilter!]` |
| `OR` | `[ScheduleScalarFilter!]` |
| `NOT` | `[ScheduleScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `output` | `StringNullableFilter` |
| `holiday1` | `StringNullableFilter` |
| `status1` | `StringNullableFilter` |
| `holiday2` | `StringNullableFilter` |
| `status2` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## ScheduleTimeCreateManyScheduleInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[ScheduleTimeCreateManyScheduleInput!]!` |
| `skipDuplicates` | `Boolean` |

## ScheduleTimeCreateManyScheduleInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `status` | `String` |
| `monday` | `DateTime` |
| `tuesday` | `DateTime` |
| `wednesday` | `DateTime` |
| `thursday` | `DateTime` |
| `friday` | `DateTime` |
| `saterday` | `DateTime` |
| `sunday` | `DateTime` |
| `holiday1` | `DateTime` |
| `holiday2` | `DateTime` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleTimeCreateNestedManyWithoutScheduleInput

| Field | Type |
| --- | --- |
| `create` | `[ScheduleTimeCreateWithoutScheduleInput!]` |
| `connectOrCreate` | `[ScheduleTimeCreateOrConnectWithoutScheduleInput!]` |
| `createMany` | `ScheduleTimeCreateManyScheduleInputEnvelope` |
| `connect` | `[ScheduleTimeFilterUnique!]` |

## ScheduleTimeCreateOrConnectWithoutScheduleInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleTimeFilterUnique!` |
| `create` | `ScheduleTimeCreateWithoutScheduleInput!` |

## ScheduleTimeCreateWithoutScheduleInput

| Field | Type |
| --- | --- |
| `status` | `String` |
| `monday` | `DateTime` |
| `tuesday` | `DateTime` |
| `wednesday` | `DateTime` |
| `thursday` | `DateTime` |
| `friday` | `DateTime` |
| `saterday` | `DateTime` |
| `sunday` | `DateTime` |
| `holiday1` | `DateTime` |
| `holiday2` | `DateTime` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleTimeFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |

## ScheduleTimeFilter

| Field | Type |
| --- | --- |
| `AND` | `[ScheduleTimeFilter!]` |
| `OR` | `[ScheduleTimeFilter!]` |
| `NOT` | `[ScheduleTimeFilter!]` |
| `id` | `IntFilter` |
| `status` | `StringFilter` |
| `monday` | `DateTimeNullableFilter` |
| `tuesday` | `DateTimeNullableFilter` |
| `wednesday` | `DateTimeNullableFilter` |
| `thursday` | `DateTimeNullableFilter` |
| `friday` | `DateTimeNullableFilter` |
| `saterday` | `DateTimeNullableFilter` |
| `sunday` | `DateTimeNullableFilter` |
| `holiday1` | `DateTimeNullableFilter` |
| `holiday2` | `DateTimeNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Schedule` | `ScheduleFilter` |
| `scheduleId` | `IntNullableFilter` |

## ScheduleTimeListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `ScheduleTimeFilter` |
| `some` | `ScheduleTimeFilter` |
| `none` | `ScheduleTimeFilter` |

## ScheduleTimeOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## ScheduleTimeOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `status` | `SortOrder` |
| `monday` | `SortOrder` |
| `tuesday` | `SortOrder` |
| `wednesday` | `SortOrder` |
| `thursday` | `SortOrder` |
| `friday` | `SortOrder` |
| `saterday` | `SortOrder` |
| `sunday` | `SortOrder` |
| `holiday1` | `SortOrder` |
| `holiday2` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Schedule` | `ScheduleOrderByWithRelationInput` |
| `scheduleId` | `SortOrder` |

## ScheduleTimeScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[ScheduleTimeScalarFilter!]` |
| `OR` | `[ScheduleTimeScalarFilter!]` |
| `NOT` | `[ScheduleTimeScalarFilter!]` |
| `id` | `IntFilter` |
| `status` | `StringFilter` |
| `monday` | `DateTimeNullableFilter` |
| `tuesday` | `DateTimeNullableFilter` |
| `wednesday` | `DateTimeNullableFilter` |
| `thursday` | `DateTimeNullableFilter` |
| `friday` | `DateTimeNullableFilter` |
| `saterday` | `DateTimeNullableFilter` |
| `sunday` | `DateTimeNullableFilter` |
| `holiday1` | `DateTimeNullableFilter` |
| `holiday2` | `DateTimeNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `scheduleId` | `IntNullableFilter` |

## ScheduleTimeUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `status` | `String` |
| `monday` | `DateTime` |
| `tuesday` | `DateTime` |
| `wednesday` | `DateTime` |
| `thursday` | `DateTime` |
| `friday` | `DateTime` |
| `saterday` | `DateTime` |
| `sunday` | `DateTime` |
| `holiday1` | `DateTime` |
| `holiday2` | `DateTime` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleTimeUpdateManyWithWhereWithoutScheduleInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleTimeScalarFilter!` |
| `data` | `ScheduleTimeUpdateManyMutationInput!` |

## ScheduleTimeUpdateManyWithoutScheduleInput

| Field | Type |
| --- | --- |
| `create` | `[ScheduleTimeCreateWithoutScheduleInput!]` |
| `connectOrCreate` | `[ScheduleTimeCreateOrConnectWithoutScheduleInput!]` |
| `upsert` | `[ScheduleTimeUpsertWithWhereUniqueWithoutScheduleInput!]` |
| `createMany` | `ScheduleTimeCreateManyScheduleInputEnvelope` |
| `set` | `[ScheduleTimeFilterUnique!]` |
| `disconnect` | `[ScheduleTimeFilterUnique!]` |
| `delete` | `[ScheduleTimeFilterUnique!]` |
| `connect` | `[ScheduleTimeFilterUnique!]` |
| `update` | `[ScheduleTimeUpdateWithWhereUniqueWithoutScheduleInput!]` |
| `updateMany` | `[ScheduleTimeUpdateManyWithWhereWithoutScheduleInput!]` |
| `deleteMany` | `[ScheduleTimeScalarFilter!]` |

## ScheduleTimeUpdateWithWhereUniqueWithoutScheduleInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleTimeFilterUnique!` |
| `data` | `ScheduleTimeUpdateWithoutScheduleInput!` |

## ScheduleTimeUpdateWithoutScheduleInput

| Field | Type |
| --- | --- |
| `status` | `String` |
| `monday` | `DateTime` |
| `tuesday` | `DateTime` |
| `wednesday` | `DateTime` |
| `thursday` | `DateTime` |
| `friday` | `DateTime` |
| `saterday` | `DateTime` |
| `sunday` | `DateTime` |
| `holiday1` | `DateTime` |
| `holiday2` | `DateTime` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleTimeUpsertWithWhereUniqueWithoutScheduleInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleTimeFilterUnique!` |
| `update` | `ScheduleTimeUpdateWithoutScheduleInput!` |
| `create` | `ScheduleTimeCreateWithoutScheduleInput!` |

## ScheduleUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `output` | `String` |
| `holiday1` | `String` |
| `status1` | `String` |
| `holiday2` | `String` |
| `status2` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ScheduleUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleScalarFilter!` |
| `data` | `ScheduleUpdateManyMutationInput!` |

## ScheduleUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[ScheduleCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[ScheduleCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[ScheduleUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `ScheduleCreateManyDeviceInputEnvelope` |
| `set` | `[ScheduleFilterUnique!]` |
| `disconnect` | `[ScheduleFilterUnique!]` |
| `delete` | `[ScheduleFilterUnique!]` |
| `connect` | `[ScheduleFilterUnique!]` |
| `update` | `[ScheduleUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[ScheduleUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[ScheduleScalarFilter!]` |

## ScheduleUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleFilterUnique!` |
| `data` | `ScheduleUpdateWithoutDeviceInput!` |

## ScheduleUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `output` | `String` |
| `holiday1` | `String` |
| `status1` | `String` |
| `holiday2` | `String` |
| `status2` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `times` | `ScheduleTimeUpdateManyWithoutScheduleInput` |

## ScheduleUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `ScheduleFilterUnique!` |
| `update` | `ScheduleUpdateWithoutDeviceInput!` |
| `create` | `ScheduleCreateWithoutDeviceInput!` |
