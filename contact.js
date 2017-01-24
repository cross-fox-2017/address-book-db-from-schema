"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// write your code here
export class Contacts {
  static insertContact (firstname, lastname, company, phone, email) {
    let regexPhone = /^\d{10,13}$/;
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexPhone.test(phone) === false) {
      console.log("Incorrect phone. Please input numbers between 10-13 length.");
    }
    else if (regexEmail.test(email) === false) {
      console.log("Incorrect email.");
    }
    else {
      let add = `INSERT INTO contacts (firstname, lastname, company, phone, email)
      VALUES ('${firstname}', '${lastname}', '${company}', '${phone}', '${email}');`;
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
    let show = `SELECT contacts.*, group_contact.name AS group_name FROM contacts, (SELECT contact_id, name FROM contact_groups, groups WHERE contact_groups.group_id = groups.id) AS group_contact WHERE contacts.id = group_contact.contact_id`;
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

  static show () {
    let show = `SELECT * FROM contacts`;
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

// let replCommand = repl.start("> ");
// replCommand.context.insertContact = Contacts.insertContact;
// replCommand.context.updateContact = Contacts.updateContact;
// replCommand.context.deleteContact = Contacts.deleteContact;
// replCommand.context.showContact = Contacts.showContact;
// replCommand.context.show = Contacts.show;
// replCommand.context.help = Contacts.help;
