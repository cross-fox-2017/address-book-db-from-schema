"use strict"

const sqlite3 = require("sqlite3").verbose();
const file = "address_book.db";
const db = new sqlite3.Database(file);
const repl = require('repl')

// write your code here
class Contacts {

  static addData (name, company_name, phone, email) {
    let ADD_DATA = `INSERT INTO contacts (name, company_name, phone, email) VALUES ('${name}', '${company_name}', '${phone}', '${email}')`;
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

  static editData (id, name, company_name, phone) {
    let EDIT_DATA = `UPDATE contacts SET name='${name}', company_name='${company_name}', phone='${phone}', email='${email}' WHERE id='${id}'`;
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
    let DELETE_DATA = `DELETE FROM contacts WHERE id='${id}'`;
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
    let SHOW_DATA = `select contacts.*, groups.name as groupName from contacts left join group_contacts on contacts.id=group_contacts.contact_id left join groups on group_contacts.group_id=groups.id`;
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
    let SHOW_NAME = `SELECT * FROM contacts WHERE name LIKE '%${val}%' OR company_name LIKE '%${val}%'`; // apakah ini yg diminta
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
    let SEARCH = `SELECT * FROM contacts WHERE ${columnName}='${val}'`;
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
    console.log('addData(name, company_name, phone, email)')
    console.log('editData(id, name, company_name, phone, email)')
    console.log('deleteData(id)')
    console.log('showData()')
    console.log('showName(val)')
    console.log('search(columnName, val)')
  }

}


// const start = repl.start('> ')
// start.context.addData = Contacts.addData
// start.context.editData = Contacts.editData
// start.context.deleteData = Contacts.deleteData
// start.context.showData = Contacts.showData
// start.context.showName = Contacts.showName
// start.context.search = Contacts.search
// start.context.help = Contacts.help

module.exports = Contacts;
