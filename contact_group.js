"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);

class ContactGroups {
  static insertGroup (contact_id, group_id) {
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

  static updateGroup (contact_id, group_id, id) {
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

  static deleteGroup (id) {
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

  static showGroup () {
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

let command = repl.start("> ")

command.context.insertGroup = ContactGroups.insertGroup;
command.context.updateGroup = ContactGroups.updateGroup;
command.context.deleteGroup = ContactGroups.deleteGroup;
command.context.showGroup = ContactGroups.showGroup;


/* Driver Code
  insertGroup(name)
  updateGroup(name, id)
  deleteGroup(id)
  showGroup()
*/

/*
  insertGroup("Arctic Fox")
  updateGroup("Arctic Fox", 3)
  deleteGroup(3)
  showGroup()
*
