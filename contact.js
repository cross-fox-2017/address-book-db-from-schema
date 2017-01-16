"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// write your code here
class Contacts {
  static insertContact (firstname, lastname, company, phone, email) {
    let add = `INSERT INTO contacts (firstname, lastname, company, phone, email) VALUES ('${firstname}', '${lastname}', '${company}', '${phone}', '${email}');`;
    db.serialize(function () {
      db.run(add, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(add);
        }
      });
    });
  }

  static updateContact (id, attribute, value) {
    let update = `UPDATE contacts SET ${attribute} = '${value}' WHERE contacts.id = ${id};`;
    db.serialize(function () {
      db.run(update, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(update);
        }
      });
    });
  }

  static deleteContact (id) {
    let deleteData = `DELETE FROM contacts WHERE contacts.id = ${id};`;
    db.serialize(function () {
      db.run(deleteData, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(deleteData);
        }
      });
    });
  }

  static showContact () {
    let show = `SELECT contacts.*, group.name FROM contacts, (SELECT contact_id, name FROM contact_groups, groups WHERE contact_groups.group_id = groups.id) AS group WHERE contacts.id = group.contact_id`;
    db.serialize(function () {
      db.each(show, function (err, row) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(row);
        }
      });
    });
  }

  static help () {
    let show = `insertContact (firstname, lastname, company, phone, email)\nupdateContact (id, attribute, value)\ndeleteContact (id)\nshowContact ()\nhelp ()`;
    console.log(show);
  }
}

let replCommand = repl.start("> ");
replCommand.context.insertContact = Contacts.insertContact;
replCommand.context.updateContact = Contacts.updateContact;
replCommand.context.deleteContact = Contacts.deleteContact;
replCommand.context.showContact = Contacts.showContact;
replCommand.context.help = Contacts.help;
