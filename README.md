## Payroll Reporting App

This app allows users to upload payroll logs and generates an aggregated payroll report.

### How to Run

#### Requirements

1. Node.js (at least v8)
2. Docker

#### Instructions

##### Development

1. ./start dev
2. Go to localhost:3000

##### Production

1. ./start prod
2. Go to localhost:3000

### Design

#### Stack

##### Backend

1. TypeScript
2. Apollo Server
3. TypeORM
4. PostgreSQL
5. Redis

##### Frontend

1. TypeScript
2. React
3. Apollo Client
4. Webpack
5. React Table
6. React Dropzone

#### Goals

1. Efficient, scalable and progressive backend using SQL, redis, and GraphQL
2. Developer ergonomics - using automatically and seamlessly generated models to facilitate DRY along with TypeScript for autocompletion, type checking and general peace of mind. The frontend also uses Webpack with hot reloading.
3. Easy development and deployment with docker images. This can also be run completely on AWS serverless using Lambda, Aurora and ElastiCache for a ridiculously easily scalable system, or with Kubernetes/Docker Swarm for more control.

Important things not covered:

1. A UI design - I used the very nice `react-dropzone`
2. An extensive testing suite (there is just 1 test at the moment, using jest)
3. Log streaming upload - log files are converted to strings then sent in a GQL query. Some more clever streaming should be used for very large log files.


#### Database

The main database is a PostgreSQL database used for holding the log data. It consists of 3 tables as depicted in [Data Models]{#data-models}. The report data (that is shown in the UI) is materialized in a redis store, where relevant keys are updated when a log is uploaded.

#### API

TypeScript is used for both the backend and frontend. GraphQL was used as the API layer, using apollo-server and apollo-client. TypeORM was chosen as the ORM for the database. Both GQL and SQL schemas are generated automatically from the TypeScript class definisions in `/src/entity`. The GQL schema is also references in the frontend code for autocompletion and type checking.

### Data Models

These are the data models in graphql format:

```graphql
type PayrollEntry {
  id: ID!
  date: DateTime!
  hoursWorked: Float!
  employee: Float!
  payrollGroup: PayrollGroup!
  payrollLog: PayrollLog!
}

type PayrollGroup {
  id: ID!
  hourlyRate: Float!
  entries: [PayrollEntry!]!
}

type PayrollLog {
  id: ID!
  entries: [PayrollEntry!]!
}

# stored in redis 
type PayrollReport {
  employee: Float!
  year: Float!
  month: Float!
  isFirstHalf: Boolean!
  amountPaid: Float!
}
```
