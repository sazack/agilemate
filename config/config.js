'use strict';

var config = {
  "development": {
    "username": "root",
    "password": "whysoserious",
    "database": "agilemate",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  'port':1234,
  'jwtSecret':'ValarMorghulis'
}
module.exports = config;
