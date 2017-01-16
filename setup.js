"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose();
var file = 'contacts.db';
var db = new sqlite.Database(file)
const jsonfile = require('jsonfile')
const contactsjson = 'contacts.json'
const groupsjson = 'groups.json'
const contactsgroupsjson = 'contacts_groups.json'
const tmpcontacts = jsonfile.readFileSync(contactsjson)
const tmpgroups = jsonfile.readFileSync(groupsjson)
const tmpcontactsgroups = jsonfile.readFileSync(contactsgroupsjson)



var createTb_contacts = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT NOT NULL, company_name TEXT, email TEXT, phone_number INTEGER, created_at DATE, updated_at DATE)"
var createContacts_Groups = "CREATE TABLE IF NOT EXISTS contacts_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY(contacts_id) REFERENCES contacts(id), FOREIGN KEY(groups_id) REFERENCES groups(id))"
var createTb_groups = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL, created_at DATE, updated_at DATE)"


let createTbcontacts = () => {
    db.serialize(function() {
        db.run(createTb_contacts, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Create Table Success createTbcontacts");
            }
        })
    })
    return true;
}

let createContactsGroups = () => {
    db.serialize(function() {
        db.run(createContacts_Groups, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Create Table Success createContactsGroups");
            }
        })
    })
    return true;
}

let createTbgroups = () => {
    db.serialize(function() {
        db.run(createTb_groups, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Create Table Success createTbgroups");
            }
        })
    })
    return true;
}

let insertDataContacts = () => {
    for (var i = 0; i < tmpcontacts.length; i++) {
        var insertDtContacts = `INSERT INTO contacts(fullname, company_name, email, phone_number, created_at, updated_at) VALUES('${tmpcontacts[i].fullname}','${tmpcontacts[i].company_name}','${tmpcontacts[i].email}','${tmpcontacts[i].phone_number}', '${new Date()}', '${new Date()}')`
        db.serialize(function() {
            db.run(insertDtContacts, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success seedDataContacts");
                }
            })
        })
    }
    return true;
}


let insertDataGroups = () => {
    for (var i = 0; i < tmpgroups.length; i++) {
        var insertDtGroups = `INSERT INTO groups(NAME, created_at, updated_at) VALUES('${tmpgroups[i].name}','${new Date()}', '${new Date()}')`
        db.serialize(function() {
            db.run(insertDtGroups, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success insertDtGroups");
                }
            })
        })
    }
    return true;
}

let insertDataContactsGroups = () => {
    for (var i = 0; i < tmpcontactsgroups.length; i++) {
        var insertDtContactsGroups = `INSERT INTO contacts_groups(contacts_id, groups_id) VALUES('${tmpcontactsgroups[i].contacts_id}','${tmpcontactsgroups[i].groups_id}')`
        db.serialize(function() {
            db.run(insertDtContactsGroups, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success insertDtContactsGroups");
                }
            })
        })
    }
    return true;
}



var run = repl.start('> ')
run.context.createTbcontacts = createTbcontacts;
run.context.createContactsGroups = createContactsGroups;
run.context.createTbgroups = createTbgroups;
run.context.insertDataContacts = insertDataContacts;
run.context.insertDataGroups = insertDataGroups;
run.context.insertDataContactsGroups = insertDataContactsGroups;
