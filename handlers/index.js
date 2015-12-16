'use strict'

var mongojs = require('mongojs')
var config = require('../config')
var db = mongojs(config.DB_CONNECTION)
var messages = db.collection('messages')

function getFrontpage (request, reply) {
  reply({
    message: 'nothing to see here! go home',
    whoami: request.session.get('whoami')
  })
}

function getMessagesByTags (request, reply) {
  var tags = request.params.tags
  messages.find({'tags': tag},
    function findMessagesByTags (error, data) {
      reply(error || data)
    }
  )
}

function getMyMessages (request, reply) {
  var whoami = request.session.get('whoami')
  messages.find({'createdByUid': whoami.uid},
    function findMyMessages (error, data) {
      reply(error || data)
    }
  )
}

function searchMessages (request, reply) {
  messages.find({'$text': {'$search': request.params.searchText}},
    function findMessages (error, data) {
      reply(error || data)
    }
  )
}

function getMessage (request, reply) {
  var messageID = mongojs.ObjectId(request.params.messageID)
  messages.find({'_id': messageID},
    function findMessage (error, data) {
      reply(error || data)
    }
  )
}

function addMessage (request, reply) {
  var whoami = request.session.get('whoami')
  var now = new Date()
  var payload = request.payload
  payload.createdAt = now
  payload.createdByUid = whoami.uid
  payload.createdByName = whoami.cn
  payload.modifiedAt = now
  payload.modifiedByUid = whoami.uid
  payload.modifiedByName = whoami.cn
  messages.save(payload, function (error, data) {
    reply(error || data)
  })
}

function updateMessage (request, reply) {
  var whoami = request.session.get('whoami')
  var messageID = mongojs.ObjectId(request.params.messageID)
  var payload = request.payload
  payload.modifiedAt = new Date()
  payload.modifiedByUid = whoami.uid
  payload.modifiedByName = whoami.cn
  messages.update({'_id': messageID}, {$set: payload}, function (error, data) {
    reply(error || data)
  })
}

function deleteTask (request, reply) {
  var taskID = mongojs.ObjectId(request.params.taskID)
  tasks.remove({'_id': taskID},
    function deleteTask (error, data) {
      reply(error || data)
    }
  )
}

module.exports.getFrontpage = getFrontpage

module.exports.getMessagesByTags = getMessagesByTags

module.exports.getMyMessages = getMyMessages

module.exports.searchMessages = searchMessages

module.exports.getMessage = getMessage

module.exports.addMessage = addMessage

module.exports.updateMessage = updateMessage

module.exports.deleteTask = deleteTask
