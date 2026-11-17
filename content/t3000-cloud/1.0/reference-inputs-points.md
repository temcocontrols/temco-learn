---
title: "Input Types: Inputs, Outputs and Variables"
order: 130
---

Write-model input types for input, output and variable points, and their bulk-envelope variants.

## InputCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[InputCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## InputCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
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
| `status` | `String` |
| `signalType` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## InputCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[InputCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[InputCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `InputCreateManyDeviceInputEnvelope` |
| `connect` | `[InputFilterUnique!]` |

## InputCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `InputFilterUnique!` |
| `create` | `InputCreateWithoutDeviceInput!` |

## InputCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
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
| `status` | `String` |
| `signalType` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## InputFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `InputIndexDeviceIdCompoundUniqueInput` |

## InputFilter

| Field | Type |
| --- | --- |
| `AND` | `[InputFilter!]` |
| `OR` | `[InputFilter!]` |
| `NOT` | `[InputFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `panel` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `range` | `StringNullableFilter` |
| `calibration` | `FloatNullableFilter` |
| `sign` | `StringNullableFilter` |
| `filter` | `IntNullableFilter` |
| `status` | `StringFilter` |
| `signalType` | `StringNullableFilter` |
| `type` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## InputIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## InputListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `InputFilter` |
| `some` | `InputFilter` |
| `none` | `InputFilter` |

## InputOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## InputOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `panel` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `value` | `SortOrder` |
| `units` | `SortOrder` |
| `range` | `SortOrder` |
| `calibration` | `SortOrder` |
| `sign` | `SortOrder` |
| `filter` | `SortOrder` |
| `status` | `SortOrder` |
| `signalType` | `SortOrder` |
| `type` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## InputScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[InputScalarFilter!]` |
| `OR` | `[InputScalarFilter!]` |
| `NOT` | `[InputScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `panel` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `range` | `StringNullableFilter` |
| `calibration` | `FloatNullableFilter` |
| `sign` | `StringNullableFilter` |
| `filter` | `IntNullableFilter` |
| `status` | `StringFilter` |
| `signalType` | `StringNullableFilter` |
| `type` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## InputUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `panel` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `units` | `String` |
| `range` | `String` |
| `calibration` | `Float` |
| `sign` | `String` |
| `filter` | `Int` |
| `status` | `String` |
| `signalType` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## InputUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `InputScalarFilter!` |
| `data` | `InputUpdateManyMutationInput!` |

## InputUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[InputCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[InputCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[InputUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `InputCreateManyDeviceInputEnvelope` |
| `set` | `[InputFilterUnique!]` |
| `disconnect` | `[InputFilterUnique!]` |
| `delete` | `[InputFilterUnique!]` |
| `connect` | `[InputFilterUnique!]` |
| `update` | `[InputUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[InputUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[InputScalarFilter!]` |

## InputUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `InputFilterUnique!` |
| `data` | `InputUpdateWithoutDeviceInput!` |

## InputUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `panel` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `units` | `String` |
| `range` | `String` |
| `calibration` | `Float` |
| `sign` | `String` |
| `filter` | `Int` |
| `status` | `String` |
| `signalType` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## InputUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `InputFilterUnique!` |
| `update` | `InputUpdateWithoutDeviceInput!` |
| `create` | `InputCreateWithoutDeviceInput!` |

## OutputCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[OutputCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## OutputCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
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
| `status` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## OutputCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[OutputCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[OutputCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `OutputCreateManyDeviceInputEnvelope` |
| `connect` | `[OutputFilterUnique!]` |

## OutputCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `OutputFilterUnique!` |
| `create` | `OutputCreateWithoutDeviceInput!` |

## OutputCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
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
| `status` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## OutputFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `OutputIndexDeviceIdCompoundUniqueInput` |

## OutputFilter

| Field | Type |
| --- | --- |
| `AND` | `[OutputFilter!]` |
| `OR` | `[OutputFilter!]` |
| `NOT` | `[OutputFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `panel` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualNullableFilter` |
| `hoaSwitch` | `StringNullableFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `range` | `StringNullableFilter` |
| `lowVoltage` | `FloatNullableFilter` |
| `highVoltage` | `FloatNullableFilter` |
| `pwmPeriod` | `IntNullableFilter` |
| `status` | `StringFilter` |
| `type` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## OutputIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## OutputListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `OutputFilter` |
| `some` | `OutputFilter` |
| `none` | `OutputFilter` |

## OutputOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## OutputOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `panel` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `hoaSwitch` | `SortOrder` |
| `value` | `SortOrder` |
| `units` | `SortOrder` |
| `range` | `SortOrder` |
| `lowVoltage` | `SortOrder` |
| `highVoltage` | `SortOrder` |
| `pwmPeriod` | `SortOrder` |
| `status` | `SortOrder` |
| `type` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## OutputScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[OutputScalarFilter!]` |
| `OR` | `[OutputScalarFilter!]` |
| `NOT` | `[OutputScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `panel` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualNullableFilter` |
| `hoaSwitch` | `StringNullableFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `range` | `StringNullableFilter` |
| `lowVoltage` | `FloatNullableFilter` |
| `highVoltage` | `FloatNullableFilter` |
| `pwmPeriod` | `IntNullableFilter` |
| `status` | `StringFilter` |
| `type` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## OutputUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `panel` | `Int` |
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
| `status` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## OutputUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `OutputScalarFilter!` |
| `data` | `OutputUpdateManyMutationInput!` |

## OutputUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[OutputCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[OutputCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[OutputUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `OutputCreateManyDeviceInputEnvelope` |
| `set` | `[OutputFilterUnique!]` |
| `disconnect` | `[OutputFilterUnique!]` |
| `delete` | `[OutputFilterUnique!]` |
| `connect` | `[OutputFilterUnique!]` |
| `update` | `[OutputUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[OutputUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[OutputScalarFilter!]` |

## OutputUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `OutputFilterUnique!` |
| `data` | `OutputUpdateWithoutDeviceInput!` |

## OutputUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `panel` | `Int` |
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
| `status` | `String` |
| `type` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## OutputUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `OutputFilterUnique!` |
| `update` | `OutputUpdateWithoutDeviceInput!` |
| `create` | `OutputCreateWithoutDeviceInput!` |

## VariableCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[VariableCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## VariableCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `units` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## VariableCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[VariableCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[VariableCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `VariableCreateManyDeviceInputEnvelope` |
| `connect` | `[VariableFilterUnique!]` |

## VariableCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `VariableFilterUnique!` |
| `create` | `VariableCreateWithoutDeviceInput!` |

## VariableCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual!` |
| `value` | `String` |
| `units` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## VariableFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `VariableIndexDeviceIdCompoundUniqueInput` |

## VariableFilter

| Field | Type |
| --- | --- |
| `AND` | `[VariableFilter!]` |
| `OR` | `[VariableFilter!]` |
| `NOT` | `[VariableFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## VariableIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## VariableListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `VariableFilter` |
| `some` | `VariableFilter` |
| `none` | `VariableFilter` |

## VariableOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## VariableOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `autoManual` | `SortOrder` |
| `value` | `SortOrder` |
| `units` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## VariableScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[VariableScalarFilter!]` |
| `OR` | `[VariableScalarFilter!]` |
| `NOT` | `[VariableScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `autoManual` | `EnumAutoManualFilter` |
| `value` | `StringNullableFilter` |
| `units` | `StringNullableFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## VariableUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `units` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## VariableUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `VariableScalarFilter!` |
| `data` | `VariableUpdateManyMutationInput!` |

## VariableUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[VariableCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[VariableCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[VariableUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `VariableCreateManyDeviceInputEnvelope` |
| `set` | `[VariableFilterUnique!]` |
| `disconnect` | `[VariableFilterUnique!]` |
| `delete` | `[VariableFilterUnique!]` |
| `connect` | `[VariableFilterUnique!]` |
| `update` | `[VariableUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[VariableUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[VariableScalarFilter!]` |

## VariableUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `VariableFilterUnique!` |
| `data` | `VariableUpdateWithoutDeviceInput!` |

## VariableUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `autoManual` | `AutoManual` |
| `value` | `String` |
| `units` | `String` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## VariableUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `VariableFilterUnique!` |
| `update` | `VariableUpdateWithoutDeviceInput!` |
| `create` | `VariableCreateWithoutDeviceInput!` |
