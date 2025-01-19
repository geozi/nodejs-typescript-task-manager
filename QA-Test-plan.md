# Task Manager API test plan

Document version 1.0.1

## Introduction

The Task Manager API test plan contains information on tests that are to run during the development phase of the project.

## In Scope

The project's tests are unit and integration tests. Completed tests are noted with ✔ and any pending ones are noted with ⌛.

## Unit tests

Unit tests are conducted per layer:

- **domain**:
  - User model [✔],
  - Task model [✔]

The directories and files included in the unit tests of domain models are:

```text
└── src
    ├── domain
    │   ├── enums
    │   │   ├── role.enum.ts
    │   │   └── status.enum.ts
    │   ├── interfaces
    │   │   ├── iTask.interface.ts
    │   │   └── iUser.interface.ts
    │   └── models
    │       ├── task.model.ts
    │       └── user.model.ts
    └── resources
        ├── taskValidationMessages.ts
        ├── userValidationMessages.ts
        └── validationRegExp.ts
```

- **persistence**:
  - User repository [✔],
  - Task repository [✔]

The directories and files included in the unit tests of the persistence layer are:

```text
└── src
    ├── domain
    │   ├── enums
    │   │   ├── role.enum.ts
    │   │   └── status.enum.ts
    │   ├── interfaces
    │   │   ├── iTask.interface.ts
    │   │   └── iUser.interface.ts
    │   └── models
    │       ├── task.model.ts
    │       └── user.model.ts
    └── persistence
        ├── task.repository.ts
        └── user.repository.ts
```

- **service**:
  - [Under development]
- **presentation**:
  - [Under development]

### Integration tests

### Backend integration test(s)

[Under development]

### Auth logic integration test(s)

[Under development]

### Database integration test(s)

[Under development]

## Out of scope

The Task Manager API is a backend project, therefore any tests referring to the frontend are excluded.

## Assumptions

The implementation is ongoing.

## Environment + Tools

- Mongoose,
- Mocha,
- Sinon,
- express-validator.
