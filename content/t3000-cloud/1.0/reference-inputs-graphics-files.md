---
title: "Input Types: Graphics and Files"
order: 120
---

Write-model input types for graphics screens and uploaded files.

## FileCreateNestedOneWithoutGraphicInput

| Field | Type |
| --- | --- |
| `create` | `FileCreateWithoutGraphicInput` |
| `connectOrCreate` | `FileCreateOrConnectWithoutGraphicInput` |
| `connect` | `FileFilterUnique` |

## FileCreateNestedOneWithoutProjectInput

| Field | Type |
| --- | --- |
| `create` | `FileCreateWithoutProjectInput` |
| `connectOrCreate` | `FileCreateOrConnectWithoutProjectInput` |
| `connect` | `FileFilterUnique` |

## FileCreateOrConnectWithoutGraphicInput

| Field | Type |
| --- | --- |
| `where` | `FileFilterUnique!` |
| `create` | `FileCreateWithoutGraphicInput!` |

## FileCreateOrConnectWithoutProjectInput

| Field | Type |
| --- | --- |
| `where` | `FileFilterUnique!` |
| `create` | `FileCreateWithoutProjectInput!` |

## FileCreateWithoutGraphicInput

| Field | Type |
| --- | --- |
| `name` | `String!` |
| `mimeType` | `String!` |
| `path` | `String!` |
| `size` | `Int` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `meta` | `JSON` |
| `tags` | `[String!]` |
| `Project` | `ProjectCreateNestedManyWithoutImageInput` |

## FileCreateWithoutProjectInput

| Field | Type |
| --- | --- |
| `name` | `String!` |
| `mimeType` | `String!` |
| `path` | `String!` |
| `size` | `Int` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `meta` | `JSON` |
| `tags` | `[String!]` |
| `Graphic` | `GraphicCreateNestedManyWithoutPictureInput` |

## FileFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `path` | `String` |

## FileFilter

| Field | Type |
| --- | --- |
| `AND` | `[FileFilter!]` |
| `OR` | `[FileFilter!]` |
| `NOT` | `[FileFilter!]` |
| `id` | `IntFilter` |
| `name` | `StringFilter` |
| `mimeType` | `StringFilter` |
| `path` | `StringFilter` |
| `size` | `IntNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `meta` | `JsonNullableFilter` |
| `tags` | `StringNullableListFilter` |
| `Graphic` | `GraphicListRelationFilter` |
| `Project` | `ProjectListRelationFilter` |

## FileOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `name` | `SortOrder` |
| `mimeType` | `SortOrder` |
| `path` | `SortOrder` |
| `size` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `meta` | `SortOrder` |
| `tags` | `SortOrder` |
| `Graphic` | `GraphicOrderByRelationAggregateInput` |
| `Project` | `ProjectOrderByRelationAggregateInput` |

## FileUpdateOneWithoutGraphicInput

| Field | Type |
| --- | --- |
| `create` | `FileCreateWithoutGraphicInput` |
| `connectOrCreate` | `FileCreateOrConnectWithoutGraphicInput` |
| `upsert` | `FileUpsertWithoutGraphicInput` |
| `disconnect` | `Boolean` |
| `delete` | `Boolean` |
| `connect` | `FileFilterUnique` |
| `update` | `FileUpdateWithoutGraphicInput` |

## FileUpdateOneWithoutProjectInput

| Field | Type |
| --- | --- |
| `create` | `FileCreateWithoutProjectInput` |
| `connectOrCreate` | `FileCreateOrConnectWithoutProjectInput` |
| `upsert` | `FileUpsertWithoutProjectInput` |
| `disconnect` | `Boolean` |
| `delete` | `Boolean` |
| `connect` | `FileFilterUnique` |
| `update` | `FileUpdateWithoutProjectInput` |

## FileUpdateWithoutGraphicInput

| Field | Type |
| --- | --- |
| `name` | `String` |
| `mimeType` | `String` |
| `path` | `String` |
| `size` | `Int` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `meta` | `JSON` |
| `tags` | `[String!]` |
| `Project` | `ProjectUpdateManyWithoutImageInput` |

## FileUpdateWithoutProjectInput

| Field | Type |
| --- | --- |
| `name` | `String` |
| `mimeType` | `String` |
| `path` | `String` |
| `size` | `Int` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `meta` | `JSON` |
| `tags` | `[String!]` |
| `Graphic` | `GraphicUpdateManyWithoutPictureInput` |

## FileUpsertWithoutGraphicInput

| Field | Type |
| --- | --- |
| `update` | `FileUpdateWithoutGraphicInput!` |
| `create` | `FileCreateWithoutGraphicInput!` |

## FileUpsertWithoutProjectInput

| Field | Type |
| --- | --- |
| `update` | `FileUpdateWithoutProjectInput!` |
| `create` | `FileCreateWithoutProjectInput!` |

## GraphicCreateManyDeviceInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[GraphicCreateManyDeviceInput!]!` |
| `skipDuplicates` | `Boolean` |

## GraphicCreateManyDeviceInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `fileId` | `Int` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## GraphicCreateManyPictureInputEnvelope

| Field | Type |
| --- | --- |
| `data` | `[GraphicCreateManyPictureInput!]!` |
| `skipDuplicates` | `Boolean` |

## GraphicCreateManyPictureInput

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `deviceId` | `Int` |

## GraphicCreateNestedManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[GraphicCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[GraphicCreateOrConnectWithoutDeviceInput!]` |
| `createMany` | `GraphicCreateManyDeviceInputEnvelope` |
| `connect` | `[GraphicFilterUnique!]` |

## GraphicCreateNestedManyWithoutPictureInput

| Field | Type |
| --- | --- |
| `create` | `[GraphicCreateWithoutPictureInput!]` |
| `connectOrCreate` | `[GraphicCreateOrConnectWithoutPictureInput!]` |
| `createMany` | `GraphicCreateManyPictureInputEnvelope` |
| `connect` | `[GraphicFilterUnique!]` |

## GraphicCreateOrConnectWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `create` | `GraphicCreateWithoutDeviceInput!` |

## GraphicCreateOrConnectWithoutPictureInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `create` | `GraphicCreateWithoutPictureInput!` |

## GraphicCreateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `picture` | `FileCreateNestedOneWithoutGraphicInput` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## GraphicCreateWithoutPictureInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `label` | `String` |
| `fullLabel` | `String` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `Device` | `DeviceCreateNestedOneWithoutGraphicsInput` |

## GraphicFilterUnique

| Field | Type |
| --- | --- |
| `id` | `Int` |
| `index_deviceId` | `GraphicIndexDeviceIdCompoundUniqueInput` |

## GraphicFilter

| Field | Type |
| --- | --- |
| `AND` | `[GraphicFilter!]` |
| `OR` | `[GraphicFilter!]` |
| `NOT` | `[GraphicFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `fileId` | `IntNullableFilter` |
| `picture` | `FileFilter` |
| `elementCount` | `IntFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `Device` | `DeviceFilter` |
| `deviceId` | `IntNullableFilter` |

## GraphicIndexDeviceIdCompoundUniqueInput

| Field | Type |
| --- | --- |
| `index` | `Int!` |
| `deviceId` | `Int!` |

## GraphicListRelationFilter

| Field | Type |
| --- | --- |
| `every` | `GraphicFilter` |
| `some` | `GraphicFilter` |
| `none` | `GraphicFilter` |

## GraphicOrderByRelationAggregateInput

| Field | Type |
| --- | --- |
| `_count` | `SortOrder` |

## GraphicOrderByWithRelationInput

| Field | Type |
| --- | --- |
| `id` | `SortOrder` |
| `index` | `SortOrder` |
| `label` | `SortOrder` |
| `fullLabel` | `SortOrder` |
| `fileId` | `SortOrder` |
| `picture` | `FileOrderByWithRelationInput` |
| `elementCount` | `SortOrder` |
| `binaryArray` | `SortOrder` |
| `createdAt` | `SortOrder` |
| `updatedAt` | `SortOrder` |
| `Device` | `DeviceOrderByWithRelationInput` |
| `deviceId` | `SortOrder` |

## GraphicScalarFilter

| Field | Type |
| --- | --- |
| `AND` | `[GraphicScalarFilter!]` |
| `OR` | `[GraphicScalarFilter!]` |
| `NOT` | `[GraphicScalarFilter!]` |
| `id` | `IntFilter` |
| `index` | `IntFilter` |
| `label` | `StringNullableFilter` |
| `fullLabel` | `StringNullableFilter` |
| `fileId` | `IntNullableFilter` |
| `elementCount` | `IntFilter` |
| `binaryArray` | `StringNullableFilter` |
| `createdAt` | `DateTimeFilter` |
| `updatedAt` | `DateTimeFilter` |
| `deviceId` | `IntNullableFilter` |

## GraphicUpdateManyMutationInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## GraphicUpdateManyWithWhereWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `GraphicScalarFilter!` |
| `data` | `GraphicUpdateManyMutationInput!` |

## GraphicUpdateManyWithWhereWithoutPictureInput

| Field | Type |
| --- | --- |
| `where` | `GraphicScalarFilter!` |
| `data` | `GraphicUpdateManyMutationInput!` |

## GraphicUpdateManyWithoutDeviceInput

| Field | Type |
| --- | --- |
| `create` | `[GraphicCreateWithoutDeviceInput!]` |
| `connectOrCreate` | `[GraphicCreateOrConnectWithoutDeviceInput!]` |
| `upsert` | `[GraphicUpsertWithWhereUniqueWithoutDeviceInput!]` |
| `createMany` | `GraphicCreateManyDeviceInputEnvelope` |
| `set` | `[GraphicFilterUnique!]` |
| `disconnect` | `[GraphicFilterUnique!]` |
| `delete` | `[GraphicFilterUnique!]` |
| `connect` | `[GraphicFilterUnique!]` |
| `update` | `[GraphicUpdateWithWhereUniqueWithoutDeviceInput!]` |
| `updateMany` | `[GraphicUpdateManyWithWhereWithoutDeviceInput!]` |
| `deleteMany` | `[GraphicScalarFilter!]` |

## GraphicUpdateManyWithoutPictureInput

| Field | Type |
| --- | --- |
| `create` | `[GraphicCreateWithoutPictureInput!]` |
| `connectOrCreate` | `[GraphicCreateOrConnectWithoutPictureInput!]` |
| `upsert` | `[GraphicUpsertWithWhereUniqueWithoutPictureInput!]` |
| `createMany` | `GraphicCreateManyPictureInputEnvelope` |
| `set` | `[GraphicFilterUnique!]` |
| `disconnect` | `[GraphicFilterUnique!]` |
| `delete` | `[GraphicFilterUnique!]` |
| `connect` | `[GraphicFilterUnique!]` |
| `update` | `[GraphicUpdateWithWhereUniqueWithoutPictureInput!]` |
| `updateMany` | `[GraphicUpdateManyWithWhereWithoutPictureInput!]` |
| `deleteMany` | `[GraphicScalarFilter!]` |

## GraphicUpdateWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `data` | `GraphicUpdateWithoutDeviceInput!` |

## GraphicUpdateWithWhereUniqueWithoutPictureInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `data` | `GraphicUpdateWithoutPictureInput!` |

## GraphicUpdateWithoutDeviceInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `picture` | `FileUpdateOneWithoutGraphicInput` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |

## GraphicUpdateWithoutPictureInput

| Field | Type |
| --- | --- |
| `index` | `Int` |
| `label` | `String` |
| `fullLabel` | `String` |
| `elementCount` | `Int` |
| `binaryArray` | `String` |
| `createdAt` | `DateTime` |
| `updatedAt` | `DateTime` |
| `Device` | `DeviceUpdateOneWithoutGraphicsInput` |

## GraphicUpsertWithWhereUniqueWithoutDeviceInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `update` | `GraphicUpdateWithoutDeviceInput!` |
| `create` | `GraphicCreateWithoutDeviceInput!` |

## GraphicUpsertWithWhereUniqueWithoutPictureInput

| Field | Type |
| --- | --- |
| `where` | `GraphicFilterUnique!` |
| `update` | `GraphicUpdateWithoutPictureInput!` |
| `create` | `GraphicCreateWithoutPictureInput!` |
