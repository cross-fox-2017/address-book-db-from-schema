"use strict"

import {Contacts} from "./contact.js";
import {Groups} from "./group.js"
const repl = require('repl')

function help(){
  console.log(`\nMenu:`);
  console.log('addContact(name, phone, email)');
  console.log('updateContact(id, coloum, new_values)');
  console.log('deleteContact(id)');
  console.log('readContact()');
  console.log('showContacts()');
  console.log('contactIntoGroup(contactid, groupid)');
  console.log('addGroup(name)');
  console.log('updateGroup(id, new_name)');
  console.log('deleteGroup(id)');
  console.log('showGroups()');
}

var repled = repl.start('>  ').context
repled.addGroup = Groups.addGroup
repled.updateGroup = Groups.updateGroup
repled.deleteGroup = Groups.deleteGroup
repled.showGroups = Groups.showGroups
repled.addContact = Contacts.addContact
repled.updateContact = Contacts.updateContact
repled.deleteContact = Contacts.deleteContact
repled.readContact = Contacts.readContact
repled.showContacts = Contacts.showContacts
repled.contactIntoGroup = Contacts.insertContactIdToGroupId
repled.help = help()
