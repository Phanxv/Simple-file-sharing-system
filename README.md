# Simple File Sharing

An experimental project aimed at developing a file-sharing website with user authentication features, utilizing Express.js and Node.js, and subsequently containerizing the application using Docker

## Requirement

This project require docker engine to run

[Get Docker](https://docs.docker.com/get-docker/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PRIVATE_KEY` : Private key for signing JWT token

`UPLOAD_PATH` : Path for saving uploaded files

`DB_NAME` : Preferred name for MongoDB database

## Deployment

To deploy this project run this command in project directory

```bash
  docker compose up
```
Then visit localhost:3000 on your web browser
