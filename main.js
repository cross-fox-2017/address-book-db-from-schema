import {Contacts} from "./contact.js";
import {Groups} from "./group.js"
import{ContactGroups} from "./contact_group.js"
const repl = require('repl')

let command = repl.start('> ')

command.context.insertContact = Contacts.insertContact;
command.context.updateContact = Contacts.updateContact;
command.context.deleteContact = Contacts.deleteContact;
command.context.showContact = Contacts.showContact;


command.context.insertGroup = Groups.insertGroup;
command.context.updateGroup = Groups.updateGroup;
command.context.deleteGroup = Groups.deleteGroup;
command.context.showGroup = Groups.showGroup;

command.context.insertContactGroup = ContactGroups.insertContactGroup;
command.context.updateContactGroup = ContactGroups.updateContactGroup;
command.context.deleteContactGroup = ContactGroups.deleteContactGroup;
command.context.showContactGroup = ContactGroups.showContactGroup;