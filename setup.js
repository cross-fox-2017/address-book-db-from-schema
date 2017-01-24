"use strict"

//write your code here
const sqlite3 = require("sqlite3").verbose();
const file = "address_book.db";
const db = new sqlite3.Database(file);
const repl = require('repl');
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company_name TEXT, phone TEXT, email TEXT)";
let CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";
let CREATE_TABLE_GROUP_CONTACTS = "CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id REFERENCES contacts(id), group_id REFERENCES groups(id))";
let SEED_DATA_CONTACTS = `INSERT INTO contacts (name, company_name, phone, email) VALUES `;
let SEED_DATA_GROUPS = `INSERT INTO groups (name) VALUES `;
let SEED_DATA_GROUP_CONTACTS = `INSERT INTO group_contacts (contact_id, group_id) VALUES `;

let createTableContacts = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_CONTACTS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE CONTACTS');
      }
    })
  })
}

let createTableGroups = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_GROUPS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE GROUPS');
      }
    })
  })
}

let createTableGroupContacts = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_GROUP_CONTACTS, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE GROUP CONTACTS');
      }
    })
  })
}

let seedDataContacts = () => {
  db.serialize(function() {
    db.run(SEED_DATA_CONTACTS, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SEED DATA CONTACTS');
      }
    })
  })
}

let seedDataGroups = () => {
  db.serialize(function() {
    db.run(SEED_DATA_GROUPS, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SEED DATA GROUPS');
      }
    })
  })
}


let seedDataGroupContacts = () => {
  db.serialize(function() {
    db.run(SEED_DATA_GROUP_CONTACTS, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SEED DATA GROUP CONTACTS');
      }
    })
  })
}

let start = repl.start('> ')
start.context.createTableContacts = createTableContacts
start.context.createTableGroups = createTableGroups
start.context.createTableGroupContacts = createTableGroupContacts
start.context.seedDataContacts = seedDataContacts
start.context.seedDataGroups = seedDataGroups
start.context.seedDataGroupContacts = seedDataGroupContacts
