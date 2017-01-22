"use strict"

const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);

export class Groups {
  static insertGroup (name) {
    let INSERT_GROUP = `INSERT INTO groups(name) VALUES('${name}')`
    db.serialize(function() {
      db.run(INSERT_GROUP, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Insert Data to Groups Success!")
        }
      })
    })
  }

  static updateGroup (name, id) {
    let UPDATE_GROUP = `UPDATE groups SET name = '${name}' WHERE id = ${id}`
    db.serialize(function() {
      db.run(UPDATE_GROUP, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log("Update Data Group Success!");
        }
      })
    })
  }

  static deleteGroup (id) {
    let DELETE_GROUP = `DELETE FROM groups WHERE id = ${id}`
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
    let SELECT_GROUP = `SELECT * FROM groups`
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

