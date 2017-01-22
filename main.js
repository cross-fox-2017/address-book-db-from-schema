"use strict"

const sqlite3 = require("sqlite3").verbose();
const file = "address_book.db";
const db = new sqlite3.Database(file);
const repl = require('repl');
const fs = require('fs');
const contacts = require('./contact.js');
const groups = require('./group.js');
const contactGroup = require('./contact-group.js');

const start = repl.start('> ')
start.context.insertContact = contacts.addData
start.context.updateContact = contacts.editData
start.context.deleteContact = contacts.deleteData
start.context.showContact = contacts.showData
start.context.showNameContact = contacts.showName
start.context.searchContact = contacts.search
start.context.insertGroup = groups.addData
start.context.updateGroup = groups.editData
start.context.deleteGroup = groups.deleteData
start.context.showGroup = groups.showData
start.context.showNameGroup = groups.showName
start.context.searchGroup = groups.search
start.context.insertContactIdToGroupId= contactGroup.addData
start.context.updateDataGroupContact= contactGroup.editData
start.context.deleteDataGroupContact= contactGroup.deleteData
start.context.showDataGroupContacts= contactGroup.showData
start.context.showNamGroupContacts = contactGroup.showName
start.context.searchGroupContacts= contactGroup.search
