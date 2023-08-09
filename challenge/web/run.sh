#!/bin/bash

source .env

# Wait for the database to be up
echo "Waiting for the database to be up..."
./bin/wait-for-it.sh "${DB_HOST}:${DB_PORT}" --timeout=0

# Start the Next.js app
echo "Starting the Next.js app..."
yarn db-bootstrap
# yarn dev if -dev argument, otherwise yarn start
if [ "$1" = "-dev" ]; then
    yarn dev
else
    yarn start
fi
