---
title: "Queries and Mutations"
order: 150
---

The operations exposed on the query and mutation roots.

## About Queries

This section will be most useful for users what are familiar with [GraphQL Concepts](GraphQL.md) and understand the basics of [writing GraphQL Queries](GraphQL.md). In the next pages will walk you throw the `Queries` that are available in the API and show you how to use them.

```graphql

```

## me

```graphql
me: AuthPayloadUser!
```

Returns `AuthPayloadUser!`.

## project

```graphql
project(
  where: ProjectFilterUnique!
): Project
```

Returns `Project`.

## projectsCount

```graphql
projectsCount(
  where: ProjectFilter
  orderBy: [ProjectOrderByWithRelationInput]
  cursor: ProjectFilterUnique
  skip: Int
  take: Int
  distinct: [ProjectScalarFieldEnum]
): Int!
```

Returns `Int!`.

## projects

```graphql
projects(
  where: ProjectFilter
  orderBy: [ProjectOrderByWithRelationInput]
  cursor: ProjectFilterUnique
  skip: Int
  take: Int
  distinct: [ProjectScalarFieldEnum]
): [Project!]!
```

Returns `[Project!]!`.

## createProject

```graphql
createProject(
  data: ProjectCreateInput!
): Project!
```

Returns `Project!`.

## deleteProject

```graphql
deleteProject(
  where: ProjectFilterUnique!
): Project
```

Returns `Project`.

## deleteProjects

```graphql
deleteProjects(
  where: ProjectFilter!
): AffectedRowsOutput!
```

Returns `AffectedRowsOutput!`.

## login

```graphql
login(
  access_key: String!
): Boolean!
```

Returns `Boolean!`.

## logout

```graphql
logout: Boolean!
```

Returns `Boolean!`.

## updateProject

```graphql
updateProject(
  where: ProjectFilterUnique!
  data: ProjectUpdateInput!
): Project!
```

Returns `Project!`.
