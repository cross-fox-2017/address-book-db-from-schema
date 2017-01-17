"use strict"
const repl = require('repl')

const newContacts = require('./contact.js')
const newGroups = require('./group.js')
const newContacts_groups = require('./contact-group.js')

var start = repl.start('> ')

start.context.insertGroup = newGroups.addGroups //    insertGroup(name)
start.context.updateGroup = newGroups.updateGroups //    updateGroup(name, id)
start.context.deleteGroup = newGroups.deleteGroups //    deleteGroup(id)
start.context.showGroup = newGroups.showGroups //    showGroup()
start.context.insertContact = newContacts.addContacts  //    insertContact(name,company,email,phone)
start.context.updateContact = newContacts.updateContacts //    updateContact(name,company, email,telp id)
start.context.deleteContact = newContacts.deleteContacts //    deleteContact(id)
start.context.showContact = newContacts.showContacts //    showContact()
start.context.help = newContacts.help // help()
start.context.insertContactIdToGroupId = newContacts_groups.addContacts_groups //    insertContactIdToGroupId(contactid, groupid)
// start.context.updateContacts_groups = newContacts_groups.updateContacts_groups
// start.context.deleteContacts_groups = newContacts_groups.deleteContacts_groups
// start.context.showContacts_groups = newContacts_groups.showContacts_groups
