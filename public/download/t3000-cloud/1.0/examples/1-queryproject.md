---
title: "Project query examples"
order: 60
---

Below are some common examples of querying projects using the API.

### Single Project by unique fileds ( by id field in the most cases )

Below is an example of querying a single project by ID. In this example we ask for a single`project` by using `where` argment with `id` unique field and then on the `project` field we ask for  the `id`, `name`, `description` and `createdAt` of the `project`.

```graphql
query {
  project( where: {id: "cl30q5hfl0039gqje0tibkojv"}) {
    id
    name
    description
    createdAt
  }
}
```

### Basic List of Projects

Below is an example of querying a list of projects. In this example we ask for `projects`.

```graphql
query {
  projects {
    id
    name
    description
    createdAt
  }
}
```

### List of Projects with relations ( buildings, devices, inputs, variables ... etc)

Below is an example of querying  list of projects with some relations, you can use Apollo Studio Explorer to see what fields are available for each relation type.

```graphql
query {
  projects {
    id
    name
    buildings {
      devices {
        inputs {
            index
            panel
            label
            fullLabel
            autoManual
            value
            units
            range
        }
        outputs {
            index
            panel
            label
            fullLabel
            autoManual
            hoaSwitch
            value
            units
            range
        }
        variables {
            index
            label
            fullLabel
            autoManual
            value
            units
        }
      }
    }
  }
}
```

### Query with argments
Argments in GraphQL allow you to run the same query multiple times with different arguments. In order to get a specific item using the API, you will specify query argments to filter, order and paginate the resilts as you need, so here is the same query as last example but with some argments to narow down the results and it's also possible to use argments in the relations as well.

```graphql
query {
  projects(
    where: {
        name: { contains: "2" } # As you can see you can filter the results, this example will get only the projects that contains "2"
    })
  {
    id
    name
    buildings {
      devices {
        inputs {
            index
            panel
            label
            fullLabel
            autoManual
            value
            units
            range
        }
        outputs {
            index
            panel
            label
            fullLabel
            autoManual
            hoaSwitch
            value
            units
            range
        }
        variables(
            where: {
                autoManual: { equals: AUTO } # You can use some filteration argments for relations also like this
            })
        {
            index
            label
            fullLabel
            autoManual
            value
            units
        }
      }
    }
  }
}
```
