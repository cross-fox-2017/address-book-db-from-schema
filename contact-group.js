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
    console.log('insertContactIdToGroupId(contact_id, group_id)')
    console.log('updateDataGroupContact(id, contact_id, group_id)')
    console.log('deleteDataGroupContac(id)')
    console.log('showDataGroupContacts()')
    console.log('showNamGroupContacts(val)')
    console.log('searchGroupContacts(columnName, val)')
  }

}

module.exports = Group_Contacts;
