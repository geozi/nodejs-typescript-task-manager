# nodejs-typescript-task-manager

![Demo App](https://img.shields.io/badge/demo_app-blue)

## About the project

The project contains the backend implementation of a Task Manager API in Typescript. It exposes APIs for task and user profile management:

- User registration,
- User login,
- User profile update,
- Task creation,
- Task update,
- Task deletion,
- Task fetching by username,
- Task fetching by status,
- Task fetching by subject.

## Prerequisites

- Nodejs (v20.11.1),
- MongoDB.

## Testing

A thorough presentation of testing during development can be found in the [QA Test plan](QA-Test-plan.md).

## Security

- **Authentication**: Single factor, local authentication.
- **Authorization**: JSON Web Token (JWT).

## Differences with previous Nodejs projects

The Task Manager API project :

- uses Typescript for development and TypeDoc for documentation,
- implements a layered architecture approach,
- uses a combination of Node's build-in assert library, Sinon, Chai, and Mocha for unit and integration testing,
- uses class syntax to create custom error classes.

##

<p align="center">
        <a href="https://github.com/LelouchFR/skill-icons">
        <img src="https://go-skill-icons.vercel.app/api/icons?i=vscode,nodejs,typescript,expressjs,mongoose,mongo,mocha"/>
      </a>
</p>
