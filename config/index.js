'use strict'

var config = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'NeverShareYourSecret',
  YAR_SECRET: process.env.JWT_SECRET || 'NeverShareYourSecret',
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://192.168.99.100:27017/tfk'
}

module.exports = config
