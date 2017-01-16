"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);

class Contact {
  static insertContact (name, company, phone, email) {
    let INSERT_DATA = `INSERT INTO contact(name, company, phone, email) VALUES('${name}', '${company}', '${phone}', '${email}')`
    db.serialize(function() {
      db.run(INSERT_DATA, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data to Contact Success!")
        }
      })
    })
  }

  static insertContactIdToGroupId (contactid, groupid) {
    let INSERT_CONTACT_TO_GROUP = ``
    db.serialize(function() {
      db.run(INSERT_CONTACT_TO_GROUP, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Insert Contact to Group Id Success!`)
        }
      })
    })
  }

  static updateContact (name, company, telp, email, id) {
    let UPDATE_CONTACT = `UPDATE contact SET name = '${name}', company = '${company}', phone = '${telp}', email = '${email}' WHERE id = ${id}`
    db.serialize(function() {
      db.run(UPDATE_CONTACT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Update Contact Success!`)
        }
      })
    })
  }

  static deleteContact (id) {
    let DELETE_CONTACT = `DELETE FROM contact WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_CONTACT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Delete Contact Success!`);
        }
      })
    })
  }

  static showContact () {
    let SELECT_CONTACT = `SELECT contact.*, groups.name, (SELECT group_id FROM groups WHERE groups.id = contact_groups.id )`
    db.serialize(function() {
      db.each(SELECT_CONTACT, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }
}

let command = repl.start("> ")

command.context.insertContact = Contact.insertContact;
command.context.insertContactIdToGroupId = Contact.insertContactIdToGroupId;
command.context.updateContact = Contact.updateContact;
command.context.deleteContact = Contact.deleteContact;
command.context.showContact = Contact.showContact;


/* Driver Code
    insertContact(name, company, phone, email)
    insertContactIdToGroupId(contactid, groupid)
    updateContact(name, telp, company, email, id)
    deleteContact(id)
    showContact()
*/

/*
    insertContact("Windiana Krismanuyar", "PT.Hacktiv8", "08194761875", "windi@gmail.com")
    insertContactIdToGroupId(contactid, groupid)
    updateContact("Windiana Krismanuyar", "PT.Hacktiv8", "08194761875", "windi@gmail.com", 4)
    deleteContact(4)
    showContact()
*/
