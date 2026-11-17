---
title: "Scalar Types"
order: 160
---

The scalar types the API accepts and returns, including its custom date/time and JSON types.

## Boolean

The `Boolean` scalar type represents `true` or `false`.

```graphql
scalar Boolean
```

## DateTime

A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.

```graphql
scalar DateTime
```

## Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

```graphql
scalar Float
```

## Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

```graphql
scalar Int
```

## JSON

The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).

```graphql
scalar JSON
```

## String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

```graphql
scalar String
```
