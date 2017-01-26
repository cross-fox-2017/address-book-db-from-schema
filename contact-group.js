"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// write your code here
export class Contact_Groups {
  static insertContactIdToGroup (contactid, groupid) {
    let add = `INSERT INTO contact_groups (contact_id, group_id) VALUES ('${contactid}', '${groupid}');`;
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

  static showContactGroup () {
    let show = `SELECT * FROM contact_groups`;
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
    let show = `insertContactIdToGroup (contactid, groupid)\nshowContactGroup ()\nhelp ()`;
    console.log(show);
  }
}

// let replCommand = repl.start("> ");
// replCommand.context.insertContactIdToGroup = Contact_Groups.insertContactIdToGroup;
// replCommand.context.showContactGroup = Contact_Groups.showContactGroup;
// replCommand.context.help = Contact_Groups.help;
