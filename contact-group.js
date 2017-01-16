"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// write your code here
class Contact_Groups {
  static insertContactIdToGroup (contactid, groupid) {
    let add = `INSERT INTO contact_groups (contact_id, group_id) VALUES ('${contactid}', '${contactid}');`;
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

let replCommand = repl.start("> ");
replCommand.context.addGroup = Groups.addGroup;
replCommand.context.updateGroup = Groups.updateGroup;
replCommand.context.deleteGroup = Groups.deleteGroup;
replCommand.context.showGroup = Groups.showGroup;
replCommand.context.help = Groups.help;
