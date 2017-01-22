"use strict"

const sqlite3 = require("sqlite3").verbose();
const file = "address_book.db";
const db = new sqlite3.Database(file);
const repl = require('repl')

// write your code here
class Group_Contacts {

  static addData (contact_id, group_id) {
    let ADD_DATA = `INSERT INTO group_contacts (contact_id, group_id) VALUES ('${contact_id}', ${group_id})`;
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

  static editData (id, contact_id, group_id) {
    let EDIT_DATA = `UPDATE group_contacts SET contact_id='${contact_id}', group_id='${group_id}' WHERE id='${id}'`;
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
    let DELETE_DATA = `FROM group_contacts WHERE id='${id}'`;
    db.serialize(function() {
      db.run(DELETE_DATA, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log('DELETE DATA');
        }
      })
    })
  }

  static showData () {
    let SHOW_DATA = `SELECT * FROM group_contacts`;
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
    let SHOW_NAME = `SELECT * FROM group_contacts WHERE contact_id LIKE '%${val}%' OR group_id LIKE '%${val}%'`; // apakah ini yg diminta
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
    let SEARCH = `SELECT * FROM group_contacts WHERE ${columnName}='${val}'`;
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
    console.log('addData(contact_id, group_id)')
    console.log('editData(id, contact_id, group_id)')
    console.log('deleteData(id)')
    console.log('showData()')
    console.log('showName(val)')
    console.log('search(columnName, val)')
  }

}


// const start = repl.start('> ')
// start.context.addData = Group_Contacts.addData
// start.context.editData = Group_Contacts.editData
// start.context.deleteData = Group_Contacts.deleteData
// start.context.showData = Group_Contacts.showData
// start.context.showName = Group_Contacts.showName
// start.context.search = Group_Contacts.search
// start.context.help = Group_Contacts.help

module.exports = Group_Contacts;
