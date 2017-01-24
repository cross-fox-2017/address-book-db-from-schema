"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// write your code here
export class Groups {
  static insertGroup (name) {
    let add = `INSERT INTO groups (name) VALUES ('${name}');`;
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

  static updateGroup (id, attribute, value) {
    let update = `UPDATE groups SET ${attribute} = '${value}' WHERE groups.id = ${id};`;
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

  static deleteGroup (id) {
    let deleteData = `DELETE FROM groups WHERE groups.id = ${id};`;
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

  static showGroup () {
    let show = `SELECT groups.*, contact_detail.firstname AS firstname, contact_detail.lastname AS lastname FROM groups, (SELECT contacts.firstname, contacts.lastname, contact_groups.group_id FROM contacts, contact_groups WHERE contact_groups.contact_id = contacts.id) AS contact_detail WHERE groups.id = contact_detail.group_id`;
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
    let show = `insertGroup (firstname, lastname, company, phone, email)\nupdateGroup (id, attribute, value)\ndeleteGroup (id)\nshowGroup ()\nhelp ()`;
    console.log(show);
  }
}

// let replCommand = repl.start("> ");
// replCommand.context.insertGroup = Groups.insertGroup;
// replCommand.context.updateGroup = Groups.updateGroup;
// replCommand.context.deleteGroup = Groups.deleteGroup;
// replCommand.context.showGroup = Groups.showGroup;
// replCommand.context.help = Groups.help;
