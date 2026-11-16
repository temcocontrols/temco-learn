---
title: "Input Types: Filters and Shared Helpers"
order: 110
---

The filter, ordering, uniqueness and scalar-field helpers every other input type builds on.

## DateTimeFilter

| Field | Type |
| --- | --- |
| `equals` | `DateTime` |
| `in` | `[DateTime!]` |
| `notIn` | `[DateTime!]` |
| `lt` | `DateTime` |
| `lte` | `DateTime` |
| `gt` | `DateTime` |
| `gte` | `DateTime` |
| `not` | `NestedDateTimeFilter` |

## DateTimeNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `DateTime` |
| `in` | `[DateTime]` |
| `notIn` | `[DateTime]` |
| `lt` | `DateTime` |
| `lte` | `DateTime` |
| `gt` | `DateTime` |
| `gte` | `DateTime` |
| `not` | `NestedDateTimeNullableFilter` |

## DateTimeNullableListFilter

| Field | Type |
| --- | --- |
| `equals` | `[DateTime]` |
| `has` | `DateTime` |
| `hasEvery` | `[DateTime!]` |
| `hasSome` | `[DateTime!]` |
| `isEmpty` | `Boolean` |

## EnumAutoManualFilter

| Field | Type |
| --- | --- |
| `equals` | `AutoManual` |
| `in` | `[AutoManual!]` |
| `notIn` | `[AutoManual!]` |
| `not` | `NestedEnumAutoManualFilter` |

## EnumAutoManualNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `AutoManual` |
| `in` | `[AutoManual]` |
| `notIn` | `[AutoManual]` |
| `not` | `NestedEnumAutoManualNullableFilter` |

## EnumBuildingProtocolNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `BuildingProtocol` |
| `in` | `[BuildingProtocol]` |
| `notIn` | `[BuildingProtocol]` |
| `not` | `NestedEnumBuildingProtocolNullableFilter` |

## EnumDeviceConnectionFilter

| Field | Type |
| --- | --- |
| `equals` | `DeviceConnection` |
| `in` | `[DeviceConnection!]` |
| `notIn` | `[DeviceConnection!]` |
| `not` | `NestedEnumDeviceConnectionFilter` |

## FloatNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `Float` |
| `in` | `[Float]` |
| `notIn` | `[Float]` |
| `lt` | `Float` |
| `lte` | `Float` |
| `gt` | `Float` |
| `gte` | `Float` |
| `not` | `NestedFloatNullableFilter` |

## IntFilter

| Field | Type |
| --- | --- |
| `equals` | `Int` |
| `in` | `[Int!]` |
| `notIn` | `[Int!]` |
| `lt` | `Int` |
| `lte` | `Int` |
| `gt` | `Int` |
| `gte` | `Int` |
| `not` | `NestedIntFilter` |

## IntNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `Int` |
| `in` | `[Int]` |
| `notIn` | `[Int]` |
| `lt` | `Int` |
| `lte` | `Int` |
| `gt` | `Int` |
| `gte` | `Int` |
| `not` | `NestedIntNullableFilter` |

## JsonNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `JSON` |
| `not` | `JSON` |

## NestedDateTimeFilter

| Field | Type |
| --- | --- |
| `equals` | `DateTime` |
| `in` | `[DateTime!]` |
| `notIn` | `[DateTime!]` |
| `lt` | `DateTime` |
| `lte` | `DateTime` |
| `gt` | `DateTime` |
| `gte` | `DateTime` |
| `not` | `NestedDateTimeFilter` |

## NestedDateTimeNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `DateTime` |
| `in` | `[DateTime]` |
| `notIn` | `[DateTime]` |
| `lt` | `DateTime` |
| `lte` | `DateTime` |
| `gt` | `DateTime` |
| `gte` | `DateTime` |
| `not` | `NestedDateTimeNullableFilter` |

## NestedEnumAutoManualFilter

| Field | Type |
| --- | --- |
| `equals` | `AutoManual` |
| `in` | `[AutoManual!]` |
| `notIn` | `[AutoManual!]` |
| `not` | `NestedEnumAutoManualFilter` |

## NestedEnumAutoManualNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `AutoManual` |
| `in` | `[AutoManual]` |
| `notIn` | `[AutoManual]` |
| `not` | `NestedEnumAutoManualNullableFilter` |

## NestedEnumBuildingProtocolNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `BuildingProtocol` |
| `in` | `[BuildingProtocol]` |
| `notIn` | `[BuildingProtocol]` |
| `not` | `NestedEnumBuildingProtocolNullableFilter` |

## NestedEnumDeviceConnectionFilter

| Field | Type |
| --- | --- |
| `equals` | `DeviceConnection` |
| `in` | `[DeviceConnection!]` |
| `notIn` | `[DeviceConnection!]` |
| `not` | `NestedEnumDeviceConnectionFilter` |

## NestedFloatNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `Float` |
| `in` | `[Float]` |
| `notIn` | `[Float]` |
| `lt` | `Float` |
| `lte` | `Float` |
| `gt` | `Float` |
| `gte` | `Float` |
| `not` | `NestedFloatNullableFilter` |

## NestedIntFilter

| Field | Type |
| --- | --- |
| `equals` | `Int` |
| `in` | `[Int!]` |
| `notIn` | `[Int!]` |
| `lt` | `Int` |
| `lte` | `Int` |
| `gt` | `Int` |
| `gte` | `Int` |
| `not` | `NestedIntFilter` |

## NestedIntNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `Int` |
| `in` | `[Int]` |
| `notIn` | `[Int]` |
| `lt` | `Int` |
| `lte` | `Int` |
| `gt` | `Int` |
| `gte` | `Int` |
| `not` | `NestedIntNullableFilter` |

## NestedStringFilter

| Field | Type |
| --- | --- |
| `equals` | `String` |
| `in` | `[String!]` |
| `notIn` | `[String!]` |
| `lt` | `String` |
| `lte` | `String` |
| `gt` | `String` |
| `gte` | `String` |
| `contains` | `String` |
| `startsWith` | `String` |
| `endsWith` | `String` |
| `not` | `NestedStringFilter` |

## NestedStringNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `String` |
| `in` | `[String]` |
| `notIn` | `[String]` |
| `lt` | `String` |
| `lte` | `String` |
| `gt` | `String` |
| `gte` | `String` |
| `contains` | `String` |
| `startsWith` | `String` |
| `endsWith` | `String` |
| `not` | `NestedStringNullableFilter` |

## StringFilter

| Field | Type |
| --- | --- |
| `equals` | `String` |
| `in` | `[String!]` |
| `notIn` | `[String!]` |
| `lt` | `String` |
| `lte` | `String` |
| `gt` | `String` |
| `gte` | `String` |
| `contains` | `String` |
| `startsWith` | `String` |
| `endsWith` | `String` |
| `mode` | `QueryMode` |
| `not` | `NestedStringFilter` |

## StringNullableFilter

| Field | Type |
| --- | --- |
| `equals` | `String` |
| `in` | `[String]` |
| `notIn` | `[String]` |
| `lt` | `String` |
| `lte` | `String` |
| `gt` | `String` |
| `gte` | `String` |
| `contains` | `String` |
| `startsWith` | `String` |
| `endsWith` | `String` |
| `mode` | `QueryMode` |
| `not` | `NestedStringNullableFilter` |

## StringNullableListFilter

| Field | Type |
| --- | --- |
| `equals` | `[String]` |
| `has` | `String` |
| `hasEvery` | `[String!]` |
| `hasSome` | `[String!]` |
| `isEmpty` | `Boolean` |
