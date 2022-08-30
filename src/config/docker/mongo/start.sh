#!/bin/bash

docker-compose up -d

sleep 10

docker exec user_mongodb1 ./scripts/rs-init.sh
