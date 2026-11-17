---
title: "Input Types: Buildings, Devices and Projects"
order: 100
---

Write-model input types for the building, device and project hierarchy: create, update, upsert and bulk-envelope variants.

## BuildingCreateManyProjectInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[BuildingCreateManyProjectInput!]!` |
| `skipDuplicates` | `Boolean` |

## BuildingCreateManyProjectInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
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
| `engineering` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## BuildingCreateNestedManyWithoutProjectInput

| Field | Type |
| --- | --- |
| `create` | `[BuildingCreateWithoutProjectInput!]` |
| `connectOrCreate` | `[BuildingCreateOrConnectWithoutProjectInput!]` |
| `createMany` | `BuildingCreateManyProjectInputEnvelope` |
| `connect` | `[BuildingFilterUnique!]` |

## BuildingCreateNestedOneWithoutDevicesInput

| Field | Type |
| --- | --- |
| `create` | `BuildingCreateWithoutDevicesInput` |
| `connectOrCreate` | `BuildingCreateOrConnectWithoutDevicesInput` |
| `connect` | `BuildingFilterUnique` |

## BuildingCreateOrConnectWithoutDevicesInput

| Field | Type |
| --- | --- |
| `where` | `BuildingFilterUnique!` |
| `create` | `BuildingCreateWithoutDevicesInput!` |

## BuildingCreateOrConnectWithoutProjectInput

| Field | Type |
| --- | --- |
| `where` | `BuildingFilterUnique!` |
| `create` | `BuildingCreateWithoutProjectInput!` |

## BuildingCreateWithoutDevicesInput

| Field | Type |
| --- | --- |
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
| `engineering` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `Project` | `ProjectCreateNestedOneWithoutBuildingsInput!` |

## BuildingCreateWithoutProjectInput

| Field | Type |
| --- | --- |
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
| `engineering` | `String` |
| `devices` | `DeviceCreateNestedManyWithoutBuildingInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## BuildingFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `title_projectId` | `BuildingTitleProjectIdCompoundUniqueInput` |

## BuildingFilter

| Field | Type |
| --- | --- |
| `AND` | `[BuildingFilter!]` |
| `OR` | `[BuildingFilter!]` |
| `NOT` | `[BuildingFilter!]` |
| `id` | `IntFilter` |
| `title` | `StringFilter` |
| `protocol` | `EnumBuildingProtocolNullableFilter` |
| `ip` | `StringNullableFilter` |
| `modbusTcpPort` | `StringNullableFilter` |
| `comPort` | `StringNullableFilter` |
| `baudRate` | `IntNullableFilter` |
| `country` | `StringNullableFilter` |
| `state` | `StringNullableFilter` |
| `city` | `StringNullableFilter` |
| `street` | `StringNullableFilter` |
| `zip` | `StringNullableFilter` |
| `engineering` | `StringFilter` |
| `devices` | `DeviceListRelationFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Project` | `ProjectFilter` |
| `projectId` | `StringFilter` |

## BuildingListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `BuildingFilter` |
| `some` | `BuildingFilter` |
| `none` | `BuildingFilter` |

## BuildingOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## BuildingOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `title` | `SortOrder` |
| `protocol` | `SortOrder` |
| `ip` | `SortOrder` |
| `modbusTcpPort` | `SortOrder` |
| `comPort` | `SortOrder` |
| `baudRate` | `SortOrder` |
| `country` | `SortOrder` |
| `state` | `SortOrder` |
| `city` | `SortOrder` |
| `street` | `SortOrder` |
| `zip` | `SortOrder` |
| `engineering` | `SortOrder` |
| `devices` | `DeviceOrderByRelationAggregateInput` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Project` | `ProjectOrderByWithRelationInput` |
| `projectId` | `SortOrder` |

## BuildingScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[BuildingScalarFilter!]` |
| `OR` | `[BuildingScalarFilter!]` |
| `NOT` | `[BuildingScalarFilter!]` |
| `id` | `IntFilter` |
| `title` | `StringFilter` |
| `protocol` | `EnumBuildingProtocolNullableFilter` |
| `ip` | `StringNullableFilter` |
| `modbusTcpPort` | `StringNullableFilter` |
| `comPort` | `StringNullableFilter` |
| `baudRate` | `IntNullableFilter` |
| `country` | `StringNullableFilter` |
| `state` | `StringNullableFilter` |
| `city` | `StringNullableFilter` |
| `street` | `StringNullableFilter` |
| `zip` | `StringNullableFilter` |
| `engineering` | `StringFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `projectId` | `StringFilter` |

## BuildingTitleProjectIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `title` | `String!` |
| `projectId` | `String!` |

## BuildingUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `title` | `String` |
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
| `engineering` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## BuildingUpdateManyWithWhereWithoutProjectInput

| Field | Type |
| --- | --- |
| `where` | `BuildingScalarFilter!` |
| `data` | `BuildingUpdateManyMutationInput!` |

## BuildingUpdateManyWithoutProjectInput

| Field | Type |
| --- | --- |
| `create` | `[BuildingCreateWithoutProjectInput!]` |
| `connectOrCreate` | `[BuildingCreateOrConnectWithoutProjectInput!]` |
| `upsert` | `[BuildingUpsertWithWhereUniqueWithoutProjectInput!]` |
| `createMany` | `BuildingCreateManyProjectInputEnvelope` |
| `set` | `[BuildingFilterUnique!]` |
| `disconnect` | `[BuildingFilterUnique!]` |
| `delete` | `[BuildingFilterUnique!]` |
| `connect` | `[BuildingFilterUnique!]` |
| `update` | `[BuildingUpdateWithWhereUniqueWithoutProjectInput!]` |
| `updateMany` | `[BuildingUpdateManyWithWhereWithoutProjectInput!]` |
| `deleteMany` | `[BuildingScalarFilter!]` |

## BuildingUpdateOneWithoutDevicesInput

| Field | Type |
| --- | --- |
| `create` | `BuildingCreateWithoutDevicesInput` |
| `connectOrCreate` | `BuildingCreateOrConnectWithoutDevicesInput` |
| `upsert` | `BuildingUpsertWithoutDevicesInput` |
| `disconnect` | `Boolean` |
| `delete` | `Boolean` |
| `connect` | `BuildingFilterUnique` |
| `update` | `BuildingUpdateWithoutDevicesInput` |

## BuildingUpdateWithWhereUniqueWithoutProjectInput

| Field | Type |
| --- | --- |
| `where` | `BuildingFilterUnique!` |
| `data` | `BuildingUpdateWithoutProjectInput!` |

## BuildingUpdateWithoutDevicesInput

| Field | Type |
| --- | --- |
| `title` | `String` |
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
| `engineering` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `Project` | `ProjectUpdateOneRequiredWithoutBuildingsInput` |

## BuildingUpdateWithoutProjectInput

| Field | Type |
| --- | --- |
| `title` | `String` |
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
| `engineering` | `String` |
| `devices` | `DeviceUpdateManyWithoutBuildingInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## BuildingUpsertWithWhereUniqueWithoutProjectInput

| Field | Type |
| --- | --- |
| `where` | `BuildingFilterUnique!` |
| `update` | `BuildingUpdateWithoutProjectInput!` |
| `create` | `BuildingCreateWithoutProjectInput!` |

## BuildingUpsertWithoutDevicesInput

| Field | Type |
| --- | --- |
| `update` | `BuildingUpdateWithoutDevicesInput!` |
| `create` | `BuildingCreateWithoutDevicesInput!` |

## DeviceCreateManyBuildingInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[DeviceCreateManyBuildingInput!]!` |
| `skipDuplicates` | `Boolean` |

## DeviceCreateManyBuildingInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `connection` | `DeviceConnection!` |
| `productType` | `String!` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceCreateNestedManyWithoutBuildingInput

| Field | Type |
| --- | --- |
| `create` | `[DeviceCreateWithoutBuildingInput!]` |
| `connectOrCreate` | `[DeviceCreateOrConnectWithoutBuildingInput!]` |
| `createMany` | `DeviceCreateManyBuildingInputEnvelope` |
| `connect` | `[DeviceFilterUnique!]` |

## DeviceCreateNestedOneWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `create` | `DeviceCreateWithoutGraphicsInput` |
| `connectOrCreate` | `DeviceCreateOrConnectWithoutGraphicsInput` |
| `connect` | `DeviceFilterUnique` |

## DeviceCreateOrConnectWithoutBuildingInput

| Field | Type |
| --- | --- |
| `where` | `DeviceFilterUnique!` |
| `create` | `DeviceCreateWithoutBuildingInput!` |

## DeviceCreateOrConnectWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `where` | `DeviceFilterUnique!` |
| `create` | `DeviceCreateWithoutGraphicsInput!` |

## DeviceCreateWithoutBuildingInput

| Field | Type |
| --- | --- |
| `connection` | `DeviceConnection!` |
| `productType` | `String!` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `inputs` | `InputCreateNestedManyWithoutDeviceInput` |
| `outputs` | `OutputCreateNestedManyWithoutDeviceInput` |
| `pids` | `PidCreateNestedManyWithoutDeviceInput` |
| `variables` | `VariableCreateNestedManyWithoutDeviceInput` |
| `graphics` | `GraphicCreateNestedManyWithoutDeviceInput` |
| `programs` | `ProgramCreateNestedManyWithoutDeviceInput` |
| `holidays` | `HolidayCreateNestedManyWithoutDeviceInput` |
| `schedules` | `ScheduleCreateNestedManyWithoutDeviceInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceCreateWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `connection` | `DeviceConnection!` |
| `productType` | `String!` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `building` | `BuildingCreateNestedOneWithoutDevicesInput` |
| `inputs` | `InputCreateNestedManyWithoutDeviceInput` |
| `outputs` | `OutputCreateNestedManyWithoutDeviceInput` |
| `pids` | `PidCreateNestedManyWithoutDeviceInput` |
| `variables` | `VariableCreateNestedManyWithoutDeviceInput` |
| `programs` | `ProgramCreateNestedManyWithoutDeviceInput` |
| `holidays` | `HolidayCreateNestedManyWithoutDeviceInput` |
| `schedules` | `ScheduleCreateNestedManyWithoutDeviceInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |

## DeviceFilter

| Field | Type |
| --- | --- |
| `AND` | `[DeviceFilter!]` |
| `OR` | `[DeviceFilter!]` |
| `NOT` | `[DeviceFilter!]` |
| `id` | `IntFilter` |
| `connection` | `EnumDeviceConnectionFilter` |
| `productType` | `StringFilter` |
| `alias` | `StringNullableFilter` |
| `serialNumber` | `IntNullableFilter` |
| `networkId` | `IntNullableFilter` |
| `floor` | `StringNullableFilter` |
| `room` | `StringNullableFilter` |
| `buildingId` | `IntNullableFilter` |
| `building` | `BuildingFilter` |
| `inputs` | `InputListRelationFilter` |
| `outputs` | `OutputListRelationFilter` |
| `pids` | `PidListRelationFilter` |
| `variables` | `VariableListRelationFilter` |
| `graphics` | `GraphicListRelationFilter` |
| `programs` | `ProgramListRelationFilter` |
| `holidays` | `HolidayListRelationFilter` |
| `schedules` | `ScheduleListRelationFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |

## DeviceListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `DeviceFilter` |
| `some` | `DeviceFilter` |
| `none` | `DeviceFilter` |

## DeviceOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## DeviceOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `connection` | `SortOrder` |
| `productType` | `SortOrder` |
| `alias` | `SortOrder` |
| `serialNumber` | `SortOrder` |
| `networkId` | `SortOrder` |
| `floor` | `SortOrder` |
| `room` | `SortOrder` |
| `buildingId` | `SortOrder` |
| `building` | `BuildingOrderByWithRelationInput` |
| `inputs` | `InputOrderByRelationAggregateInput` |
| `outputs` | `OutputOrderByRelationAggregateInput` |
| `pids` | `PidOrderByRelationAggregateInput` |
| `variables` | `VariableOrderByRelationAggregateInput` |
| `graphics` | `GraphicOrderByRelationAggregateInput` |
| `programs` | `ProgramOrderByRelationAggregateInput` |
| `holidays` | `HolidayOrderByRelationAggregateInput` |
| `schedules` | `ScheduleOrderByRelationAggregateInput` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |

## DeviceScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[DeviceScalarFilter!]` |
| `OR` | `[DeviceScalarFilter!]` |
| `NOT` | `[DeviceScalarFilter!]` |
| `id` | `IntFilter` |
| `connection` | `EnumDeviceConnectionFilter` |
| `productType` | `StringFilter` |
| `alias` | `StringNullableFilter` |
| `serialNumber` | `IntNullableFilter` |
| `networkId` | `IntNullableFilter` |
| `floor` | `StringNullableFilter` |
| `room` | `StringNullableFilter` |
| `buildingId` | `IntNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |

## DeviceUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `connection` | `DeviceConnection` |
| `productType` | `String` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceUpdateManyWithWhereWithoutBuildingInput

| Field | Type |
| --- | --- |
| `where` | `DeviceScalarFilter!` |
| `data` | `DeviceUpdateManyMutationInput!` |

## DeviceUpdateManyWithoutBuildingInput

| Field | Type |
| --- | --- |
| `create` | `[DeviceCreateWithoutBuildingInput!]` |
| `connectOrCreate` | `[DeviceCreateOrConnectWithoutBuildingInput!]` |
| `upsert` | `[DeviceUpsertWithWhereUniqueWithoutBuildingInput!]` |
| `createMany` | `DeviceCreateManyBuildingInputEnvelope` |
| `set` | `[DeviceFilterUnique!]` |
| `disconnect` | `[DeviceFilterUnique!]` |
| `delete` | `[DeviceFilterUnique!]` |
| `connect` | `[DeviceFilterUnique!]` |
| `update` | `[DeviceUpdateWithWhereUniqueWithoutBuildingInput!]` |
| `updateMany` | `[DeviceUpdateManyWithWhereWithoutBuildingInput!]` |
| `deleteMany` | `[DeviceScalarFilter!]` |

## DeviceUpdateOneWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `create` | `DeviceCreateWithoutGraphicsInput` |
| `connectOrCreate` | `DeviceCreateOrConnectWithoutGraphicsInput` |
| `upsert` | `DeviceUpsertWithoutGraphicsInput` |
| `disconnect` | `Boolean` |
| `delete` | `Boolean` |
| `connect` | `DeviceFilterUnique` |
| `update` | `DeviceUpdateWithoutGraphicsInput` |

## DeviceUpdateWithWhereUniqueWithoutBuildingInput

| Field | Type |
| --- | --- |
| `where` | `DeviceFilterUnique!` |
| `data` | `DeviceUpdateWithoutBuildingInput!` |

## DeviceUpdateWithoutBuildingInput

| Field | Type |
| --- | --- |
| `connection` | `DeviceConnection` |
| `productType` | `String` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `inputs` | `InputUpdateManyWithoutDeviceInput` |
| `outputs` | `OutputUpdateManyWithoutDeviceInput` |
| `pids` | `PidUpdateManyWithoutDeviceInput` |
| `variables` | `VariableUpdateManyWithoutDeviceInput` |
| `graphics` | `GraphicUpdateManyWithoutDeviceInput` |
| `programs` | `ProgramUpdateManyWithoutDeviceInput` |
| `holidays` | `HolidayUpdateManyWithoutDeviceInput` |
| `schedules` | `ScheduleUpdateManyWithoutDeviceInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceUpdateWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `connection` | `DeviceConnection` |
| `productType` | `String` |
| `alias` | `String` |
| `serialNumber` | `Int` |
| `networkId` | `Int` |
| `floor` | `String` |
| `room` | `String` |
| `building` | `BuildingUpdateOneWithoutDevicesInput` |
| `inputs` | `InputUpdateManyWithoutDeviceInput` |
| `outputs` | `OutputUpdateManyWithoutDeviceInput` |
| `pids` | `PidUpdateManyWithoutDeviceInput` |
| `variables` | `VariableUpdateManyWithoutDeviceInput` |
| `programs` | `ProgramUpdateManyWithoutDeviceInput` |
| `holidays` | `HolidayUpdateManyWithoutDeviceInput` |
| `schedules` | `ScheduleUpdateManyWithoutDeviceInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## DeviceUpsertWithWhereUniqueWithoutBuildingInput

| Field | Type |
| --- | --- |
| `where` | `DeviceFilterUnique!` |
| `update` | `DeviceUpdateWithoutBuildingInput!` |
| `create` | `DeviceCreateWithoutBuildingInput!` |

## DeviceUpsertWithoutGraphicsInput

| Field | Type |
| --- | --- |
| `update` | `DeviceUpdateWithoutGraphicsInput!` |
| `create` | `DeviceCreateWithoutGraphicsInput!` |

## ProjectCreateInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String!` |
| `slug` | `String` |
| `description` | `String` |
| `image` | `FileCreateNestedOneWithoutProjectInput` |
| `buildings` | `BuildingCreateNestedManyWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectCreateManyImageInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[ProjectCreateManyImageInput!]!` |
| `skipDuplicates` | `Boolean` |

## ProjectCreateManyImageInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String!` |
| `slug` | `String` |
| `description` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectCreateNestedManyWithoutImageInput

| Field | Type |
| --- | --- |
| `create` | `[ProjectCreateWithoutImageInput!]` |
| `connectOrCreate` | `[ProjectCreateOrConnectWithoutImageInput!]` |
| `createMany` | `ProjectCreateManyImageInputEnvelope` |
| `connect` | `[ProjectFilterUnique!]` |

## ProjectCreateNestedOneWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `create` | `ProjectCreateWithoutBuildingsInput` |
| `connectOrCreate` | `ProjectCreateOrConnectWithoutBuildingsInput` |
| `connect` | `ProjectFilterUnique` |

## ProjectCreateOrConnectWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `where` | `ProjectFilterUnique!` |
| `create` | `ProjectCreateWithoutBuildingsInput!` |

## ProjectCreateOrConnectWithoutImageInput

| Field | Type |
| --- | --- |
| `where` | `ProjectFilterUnique!` |
| `create` | `ProjectCreateWithoutImageInput!` |

## ProjectCreateWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String!` |
| `slug` | `String` |
| `description` | `String` |
| `image` | `FileCreateNestedOneWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectCreateWithoutImageInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String!` |
| `slug` | `String` |
| `description` | `String` |
| `buildings` | `BuildingCreateNestedManyWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectFilterUnique

| Field | Type |
| --- | --- |
| `id` | `String` |
| `slug` | `String` |

## ProjectFilter

| Field | Type |
| --- | --- |
| `AND` | `[ProjectFilter!]` |
| `OR` | `[ProjectFilter!]` |
| `NOT` | `[ProjectFilter!]` |
| `id` | `StringFilter` |
| `name` | `StringFilter` |
| `slug` | `StringNullableFilter` |
| `description` | `StringNullableFilter` |
| `imageFileId` | `IntNullableFilter` |
| `image` | `FileFilter` |
| `buildings` | `BuildingListRelationFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |

## ProjectListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `ProjectFilter` |
| `some` | `ProjectFilter` |
| `none` | `ProjectFilter` |

## ProjectOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## ProjectOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `name` | `SortOrder` |
| `slug` | `SortOrder` |
| `description` | `SortOrder` |
| `imageFileId` | `SortOrder` |
| `image` | `FileOrderByWithRelationInput` |
| `buildings` | `BuildingOrderByRelationAggregateInput` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |

## ProjectScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[ProjectScalarFilter!]` |
| `OR` | `[ProjectScalarFilter!]` |
| `NOT` | `[ProjectScalarFilter!]` |
| `id` | `StringFilter` |
| `name` | `StringFilter` |
| `slug` | `StringNullableFilter` |
| `description` | `StringNullableFilter` |
| `imageFileId` | `IntNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |

## ProjectUpdateInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String` |
| `slug` | `String` |
| `description` | `String` |
| `image` | `FileUpdateOneWithoutProjectInput` |
| `buildings` | `BuildingUpdateManyWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String` |
| `slug` | `String` |
| `description` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectUpdateManyWithWhereWithoutImageInput

| Field | Type |
| --- | --- |
| `where` | `ProjectScalarFilter!` |
| `data` | `ProjectUpdateManyMutationInput!` |

## ProjectUpdateManyWithoutImageInput

| Field | Type |
| --- | --- |
| `create` | `[ProjectCreateWithoutImageInput!]` |
| `connectOrCreate` | `[ProjectCreateOrConnectWithoutImageInput!]` |
| `upsert` | `[ProjectUpsertWithWhereUniqueWithoutImageInput!]` |
| `createMany` | `ProjectCreateManyImageInputEnvelope` |
| `set` | `[ProjectFilterUnique!]` |
| `disconnect` | `[ProjectFilterUnique!]` |
| `delete` | `[ProjectFilterUnique!]` |
| `connect` | `[ProjectFilterUnique!]` |
| `update` | `[ProjectUpdateWithWhereUniqueWithoutImageInput!]` |
| `updateMany` | `[ProjectUpdateManyWithWhereWithoutImageInput!]` |
| `deleteMany` | `[ProjectScalarFilter!]` |

## ProjectUpdateOneRequiredWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `create` | `ProjectCreateWithoutBuildingsInput` |
| `connectOrCreate` | `ProjectCreateOrConnectWithoutBuildingsInput` |
| `upsert` | `ProjectUpsertWithoutBuildingsInput` |
| `connect` | `ProjectFilterUnique` |
| `update` | `ProjectUpdateWithoutBuildingsInput` |

## ProjectUpdateWithWhereUniqueWithoutImageInput

| Field | Type |
| --- | --- |
| `where` | `ProjectFilterUnique!` |
| `data` | `ProjectUpdateWithoutImageInput!` |

## ProjectUpdateWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String` |
| `slug` | `String` |
| `description` | `String` |
| `image` | `FileUpdateOneWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectUpdateWithoutImageInput

| Field | Type |
| --- | --- |
| `id` | `String` |
| `name` | `String` |
| `slug` | `String` |
| `description` | `String` |
| `buildings` | `BuildingUpdateManyWithoutProjectInput` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## ProjectUpsertWithWhereUniqueWithoutImageInput

| Field | Type |
| --- | --- |
| `where` | `ProjectFilterUnique!` |
| `update` | `ProjectUpdateWithoutImageInput!` |
| `create` | `ProjectCreateWithoutImageInput!` |

## ProjectUpsertWithoutBuildingsInput

| Field | Type |
| --- | --- |
| `update` | `ProjectUpdateWithoutBuildingsInput!` |
| `create` | `ProjectCreateWithoutBuildingsInput!` |
