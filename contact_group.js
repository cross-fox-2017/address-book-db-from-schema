"use strict"

const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);

export class ContactGroups {
  static insertContactGroup (group_id, contact_id) {
    let INSERT_GROUP = `INSERT INTO contact_groups(group_id, contact_id) VALUES('${group_id}', '${contact_id}')`
    db.serialize(function() {
      db.run(INSERT_GROUP, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data to Group_ID Success!")
        }
      })
    })
  }

  static updateContactGroup (group_id, contact_id, id) {
    let UPDATE_GROUP = `UPDATE contact_groups SET group_id = '${group_id}', contact_id = '${contact_id}' WHERE id = ${id}`
    db.serialize(function() {
      db.run(UPDATE_GROUP, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Update Group_ID Success!");
        }
      })
    })
  }

  static deleteContactGroup (id) {
    let DELETE_GROUP = `DELETE FROM contact_groups WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_GROUP, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log("Delete Data Group Success!");
        }
      })
    })
  }

  static showContactGroup () {
    let SELECT_GROUP = `SELECT * FROM contact_groups`
    db.serialize(function() {
      db.each(SELECT_GROUP, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }
}



