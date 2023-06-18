<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

### Requirements
node >=16

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running using docker
To run all containers use next command:
```bash
docker compose up
```
This will run containers in interactive session where you can see logs
To run containers in background use next command:
```bash
docker compose start
```
This will create 3 containers:
1. db - container with postgres 13
2. pgadmin - container with pgadmin for viewing and managing db
3. api - container with nest js application

By default it creates empty db. To seed the db you need to run next command:
```bash
docker-compose exec api prisma db seed  
```

To drop db you need to run next command:
```bash
docker-compose exec db psql -U postgres -d postgres -c "DROP DATABASE mydatabase;" 
```

Then rerun your containers with
```bash
docker compose restart 
```
