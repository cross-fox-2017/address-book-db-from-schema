"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);

const fs = require('fs')
let getData = fs.readFileSync('data.json', 'utf-8');
let data = JSON.parse(getData);

let CREATE_CONTACT = "CREATE TABLE contact(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT)"
let CREATE_GROUP = "CREATE TABLE groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
let CREATE_CONTACT_GROUP = "CREATE TABLE contact_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contact_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(contact_id) REFERENCES contact(id) ON UPDATE action ON DELETE action)"

let SEED_CONTACT = "INSERT INTO contact(name, company, phone, email) VALUES"
let SEED_GROUP = "INSERT INTO groups(name) VALUES"
let SEED_CONTACT_GROUP = "INSERT INTO contact_groups(group_id, contact_id) VALUES"

for(let i = 0; i < data.contact.length; i++){
  if(data.contact.length - 1 === i){
    SEED_CONTACT += `('${data.contact[i].name}', '${data.contact[i].company}', '${data.contact[i].phone}', '${data.contact[i].email}')`;
  } else {
    SEED_CONTACT += `('${data.contact[i].name}', '${data.contact[i].company}', '${data.contact[i].phone}', '${data.contact[i].email}'),`;
  }
}

for(let i = 0; i < data.groups.length; i++){
  if(data.groups.length - 1 === i){
    SEED_GROUP += `('${data.groups[i].name}')`;
  } else {
    SEED_GROUP += `('${data.groups[i].name}'),`;
  }
}

for(let i = 0; i < data.contact_groups.length; i++){
  if(data.contact_groups.length - 1 === i){
    SEED_CONTACT_GROUP += `('${data.contact_groups[i].group_id}', '${data.contact_groups[i].contact_id}')`;
  } else {
    SEED_CONTACT_GROUP += `('${data.contact_groups[i].group_id}', '${data.contact_groups[i].contact_id}'),`;
  }
}


let createContact = () => {
  db.serialize(function() {
    db.run(CREATE_CONTACT, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Create Contact Success!")
      }
    })
  })
}

let createGroups = () => {
  db.serialize(function() {
    db.run(CREATE_GROUP, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Create Group Success!")
      }
    })
  })
}

let createContactGroups = () => {
  db.serialize(function() {
    db.run(CREATE_CONTACT_GROUP, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Create Contact Group Success!")
      }
    })
  })
}

let addDataContact = () => {
  db.serialize(function() {
    db.run(SEED_CONTACT, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Insert Data Contact Success!")
      }
    })
  })
}

let addDataGroup = () => {
  db.serialize(function() {
    db.run(SEED_GROUP, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Insert Data Group Success!")
      }
    })
  })
}

let addDataContactGroup = () => {
  db.serialize(function() {
    db.run(SEED_CONTACT_GROUP, function(err) {
      if(err) {
        console.log(err)
      } else {
        console.log("Insert Data Contact Group Success!")
      }
    })
  })
}


let command = repl.start("> ")

command.context.createContact = createContact;
command.context.createContactGroups = createContactGroups;
command.context.createGroups = createGroups;
command.context.addDataContact = addDataContact;
command.context.addDataGroup = addDataGroup;
command.context.addDataContactGroup = addDataContactGroup;

/*
TABLE CONTACT
1|Ida Bagus Chahya Dhegana|PT.CSC UTAMA|08129042724|dhegana@gmail.com
2|Rubi Henjaya|PT.Hacktiv8|081238187401|rubi@gmail.com

TABLE groups
1|Cross Fox 2016
2|Blanford Fox 2016

TABLE contact_groups
1|1|1
2|1|2
*/
