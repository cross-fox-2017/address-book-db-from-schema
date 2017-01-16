"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('seed.json', 'utf8'))

// console.log(data.groups[0].nama);

var file = 'addressbook.db';
var db = new sqlite.Database(file);

var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id_contact INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT NOT NULL, phone TEXT, email TEXT UNIQUE);";
var CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id_group INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL);";
var CREATE_TABLE_GROUP_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts_groups (id_contact_group INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER NOT NULL, id_group INTEGER NOT NULL, FOREIGN KEY (id_group) REFERENCES groups(id_group), FOREIGN KEY (id_contact) REFERENCES contacts(id_contact));";
var SEED_DATA_CONTACT = `INSERT INTO contacts (fullname, phone, email) VALUES (?, ?, ?)`
var SEED_DATA_GROUP = `INSERT INTO groups (nama) VALUES (?)`
var SEED_DATA_CG = `INSERT INTO contacts_groups (id_contact, id_group) VALUES (?, ?)`

let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE_CONTACTS, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Create Table Contacts');
      }
    })
    db.run(CREATE_TABLE_GROUPS, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Create Table Groups');
      }
    })
    db.run(CREATE_TABLE_GROUP_CONTACTS, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('Create Table Groups_Contacts');
      }
    })
  })
}

let seedData = () => {
  db.serialize(function() {
    for (let i = 0; i <data.contacts.length; i++){
      db.run(SEED_DATA_CONTACT, data.contacts[i].fullname, data.contacts[i].phone, data.contacts[i].email, function(err){
        if (err){console.log(err);
        } else {console.log('Seed Data contacts');
        }
      })
    }
    for (let j = 0; j <data.groups.length; j++){
      db.run(SEED_DATA_GROUP, data.groups[j].nama, function(err){
        if (err){console.log(err);
        } else {console.log('Seed Data groups');
        }
      })
    }
    for (let k = 0; k <data.groups_contacts.length; k++){
      db.run(SEED_DATA_CG, data.groups_contacts[k].id_contact, data.groups_contacts[k].id_group,  function(err){
        if (err){console.log(err);
        } else {console.log('Seed Data contacts_groups');
        }
      })
    }
  })
}

var repled = repl.start('> ').context
repled.createTable = createTable
repled.seedData = seedData
