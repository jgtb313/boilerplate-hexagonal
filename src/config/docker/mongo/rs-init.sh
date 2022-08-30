#!/bin/bash

mongo -u app -p 123456 --authenticationDatabase admin <<EOF

var config = {
  "_id": "app",
  "version": 1,
  "members": [
    {
      "_id": 1,
      "host": "host.docker.internal:27021",
      "priority": 3
    },
    {
      "_id": 2,
      "host": "host.docker.internal:27022",
      "priority": 2
    },
    {
      "_id": 3,
      "host": "host.docker.internal:27023",
      "priority": 1
    }
  ]
};

rs.initiate(config, { force: true });
rs.status();

EOF
