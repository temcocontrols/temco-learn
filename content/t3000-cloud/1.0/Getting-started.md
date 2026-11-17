---
title: "Getting started"
order: 20
---

## Architecture Overview

The backend server exposes the GraphQL API. The API is written in TypeScript. It maintains its state in a PostgreSQL database using Prisma ORM.

## GraphQL Overview

The API is powered by a GraphQL. GraphQL is a query language that allows clients to talk to an API server. Unlike REST, it gives the client control over how much or how little data they want to request about each object and allows relations within the object graph to be traversed easily.

To learn more about GraphQL language and its concepts, see the official [GraphQL website](https://graphql.org/).

The API endpoint is available at `/graphql/` and requires queries to be submitted using HTTP `POST` method and the `application/json` content type.

Using the GraphQL API allows you to query and modify all of the data in an efficient and flexible manner. The API provides both types of operations:

- Public (related to the customers and normal users)
- Private (related to the administration side)

Here's an example query to fetch projects:

```graphql
{
  projects {
    name
  }
}
```

Response:
```json
{
  "data": {
    "projects": {
      "name": "Project 1"
    }
  }
}
```

## Apollo Studio Explorer

The Apollo Studio Explorer is a powerful web IDE for creating, running, and managing GraphQL operations

<iframe width="740" height="415" src="https://www.youtube.com/embed/j8b0Bda_TIw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The Explorer provides a sandbox mode that doesn't require an Apollo account.
You can use it with the API using this link
https://sandbox.apollo.dev/?endpoint={API_URL}

*example*: https://sandbox.apollo.dev/?endpoint=http://192.167.0.10:3000

The Getting Started tab within the Explorer helps you get up and running with core features.
 You can read more about Apollo Studio Explorer from its own documentation from [here](https://www.apollographql.com/docs/studio/explorer/explorer/)
