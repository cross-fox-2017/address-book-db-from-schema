import {Contacts} from "./contact.js";
import {Groups} from "./group.js"
import{ContactGroups} from "./contact-group.js"
const repl = require('repl')

var rep = repl.start('> ').context

rep.addContact = Contacts.addContact
rep.updateContact = Contacts.updateContact
rep.deleteContacts = Contacts.deleteContacts
rep.showContact = Contacts.showContact
rep.addGroup = Groups.addGroup
rep.updateGroup = Groups.updateGroup
rep.deleteGroup = Groups.deleteGroup
rep.showGroup = Groups.showGroup
rep.addContactToGroup = ContactGroups.addContactToGroup
