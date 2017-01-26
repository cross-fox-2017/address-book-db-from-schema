"use strict"

import {Contacts} from "./contact.js";
import {Groups} from "./group.js";
import {Contact_Groups} from "./contact-group.js";
const repl = require('repl');

function help(){
  console.log(`\nMenu:`);
  console.log(`insertContact (firstname, lastname, company, phone, email)\nupdateContact (id, attribute, value)\ndeleteContact (id)\nshowContact ()\n`);
  console.log(`insertGroup (firstname, lastname, company, phone, email)\nupdateGroup (id, attribute, value)\ndeleteGroup (id)\nshowGroup ()\n`);
  console.log(`insertContactIdToGroup (contactid, groupid)\nshowContactGroup ()\nhelp ()`);
}

let replCommand = repl.start("> ");
replCommand.context.insertGroup = Groups.insertGroup;
replCommand.context.updateGroup = Groups.updateGroup;
replCommand.context.deleteGroup = Groups.deleteGroup;
replCommand.context.showGroup = Groups.showGroup;
replCommand.context.insertContact = Contacts.insertContact;
replCommand.context.updateContact = Contacts.updateContact;
replCommand.context.deleteContact = Contacts.deleteContact;
replCommand.context.showContact = Contacts.showContact;
replCommand.context.insertContactIdToGroup = Contact_Groups.insertContactIdToGroup;
replCommand.context.showContactGroup = Contact_Groups.showContactGroup;
replCommand.context.help = help();
