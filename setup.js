"use strict"

const fs = require("fs");
const repl = require("repl");
const sqlite3 = require("sqlite3").verbose();
let file = "address_book.db";
let db = new sqlite3.Database(file);

// PARSER_DATA
let address_book = JSON.parse(fs.readFileSync("address_book.json", "utf8"));
// let contact_groups = JSON.parse(fs.readFileSync("contact_groups.json", "utf8"));
// let groups = JSON.parse(fs.readFileSync("groups.json", "utf8"));

// CREATE_TABLE
let CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, company TEXT, phone TEXT NOT NULL, email TEXT NOT NULL)";
let CREATE_TABLE_CONTACT_GROUPS = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER NOT NULL, contact_id INTEGER NOT NULL, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(contact_id) REFERENCES contacts(id))";
let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";

let createContact = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_CONTACTS, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log ("Create table contacts");
      }
    });
  });
}

let createContactGroup = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_CONTACT_GROUPS, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log ("Create table contact_groups");
      }
    });
  });
}

let createGroup = () => {
  db.serialize(function () {
    db.run(CREATE_TABLE_GROUPS, function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log ("Create table groups");
      }
    });
  });
}

// INSERT_INTO
let seedContact = () => {
  db.serialize(function () {
    for (let i = 0; i < address_book.Contacts.length; i++) {
      let SEED_DATA_CONTACT = `INSERT INTO contacts (firstname, lastname, company, phone, email) VALUES ('${address_book.Contacts[i].firstname}', '${address_book.Contacts[i].lastname}', '${address_book.Contacts[i].company}', '${address_book.Contacts[i].phone}', '${address_book.Contacts[i].email}');`;
      db.run(SEED_DATA_CONTACT, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(SEED_DATA_CONTACT);
        }
      });
    }
  });
}

let seedContactGroup = () => {
  db.serialize(function () {
    for (let i = 0; i < address_book.Contact_Groups.length; i++) {
      let SEED_DATA_GROUP_CONTACT = `INSERT INTO contact_groups (group_id, contact_id) VALUES ('${address_book.Contact_Groups[i].group_id}', '${address_book.Contact_Groups[i].contact_id}');`;
      db.run(SEED_DATA_GROUP_CONTACT, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(SEED_DATA_GROUP_CONTACT);
        }
      });
    }
  });
}

let seedGroup = () => {
  db.serialize(function () {
    for (let i = 0; i < address_book.Groups.length; i++) {
      let SEED_DATA_GROUP = `INSERT INTO groups (name) VALUES ('${address_book.Groups[i].name}');`;
      db.run(SEED_DATA_GROUP, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(SEED_DATA_GROUP);
        }
      });
    }
  });
}

let replCommand = repl.start("> ");

replCommand.context.createContact = createContact;
replCommand.context.createGroup = createGroup;
replCommand.context.createContactGroup = createContactGroup;
replCommand.context.seedContact = seedContact;
replCommand.context.seedContactGroup = seedContactGroup;
replCommand.context.seedGroup = seedGroup;
