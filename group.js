"use strict"

const sqlite3 = require("sqlite3").verbose();
const file = "address_book.db";
const db = new sqlite3.Database(file);
const repl = require('repl')
const contactGroup = require('./contact-group.js');

// write your code here
class Groups {

  static addData (name) {
    let ADD_DATA = `INSERT INTO groups (name) VALUES ('${name}')`;
    db.serialize(function() {
      db.run(ADD_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('ADD DATA');
        }
      })
    })
  }

  static editData (id, name) {
    let EDIT_DATA = `UPDATE groups SET name='${name}' WHERE id='${id}'`;
    db.serialize(function() {
      db.run(EDIT_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('EDIT DATA');
        }
      })
    })
  }

  static deleteData (id) {
    let DELETE_DATA = `DELETE FROM groups WHERE id='${id}'`;
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          contactGroup.deleteData(id)
        }
      })
    })
  }

  static showData () {
    let SHOW_DATA = `SELECT * FROM groups`;
    db.serialize(function() {
      db.each(SHOW_DATA, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static showName (val) {
    let SHOW_NAME = `SELECT * FROM groups WHERE name LIKE '%${val}%'`; // apakah ini yg diminta
    db.serialize(function() {
      db.each(SHOW_NAME, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static search (columnName, val) {
    let SEARCH = `SELECT * FROM groups WHERE ${columnName}='${val}'`;
    db.serialize(function() {
      db.each(SEARCH, function(err,row) {
        if(err) {
          console.log(err);
        } else {
          console.log(row);
        }
      })
    })
  }

  static help () {
    console.log('addData(name)')
    console.log('editData(id, name)')
    console.log('deleteData(id)')
    console.log('showData()')
    console.log('showName(val)')
    console.log('search(columnName, val)')
  }

}


// const start = repl.start('> ')
// start.context.addData = Groups.addData
// start.context.editData = Groups.editData
// start.context.deleteData = Groups.deleteData
// start.context.showData = Groups.showData
// start.context.showName = Groups.showName
// start.context.search = Groups.search
// start.context.help = Groups.help

module.exports = Groups;
