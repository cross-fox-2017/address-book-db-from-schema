"use strict"

const repl    = require("repl");
const sqlite  = require("sqlite3").verbose();
var file      = "address_book.db";
var db        = new sqlite.Database(file);
var fs        = require("fs");
var dataJSON  = JSON.parse(fs.readFileSync("data.json","utf-8"))

//SQL Statement
var CREATE_CONTACT          = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, namaperusahaan TEXT, notlp TEXT,email TEXT, create_at DATE);"
var CREATE_GROUP            = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL, create_at DATE);"
var CREATE_CONTACT_DETAIL   = "CREATE TABLE IF NOT EXISTS group_details(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(group_id) REFERENCES groups(id));"
var SEED_DATA_CONTACTS      = "INSERT INTO contacts(firstname,lastname,namaperusahaan,notlp, email, create_at) VALUES ";
var SEED_DATA_GROUPS        = "INSERT INTO groups(groupname, create_at) VALUES ";
var SEED_DATA_DROUP_DETAILS = "INSERT INTO group_details(contact_id, group_id) VALUES ";

//INSERT INTO CONTACTS
for(let i = 0; i < dataJSON.contacts.length; i++){
  if(i < dataJSON.contacts.length-1){
      SEED_DATA_CONTACTS   += `('${dataJSON.contacts[i].firstname}','${dataJSON.contacts[i].lastname}','${dataJSON.contacts[i].namaperusahaan}','${dataJSON.contacts[i].notlp}','${dataJSON.contacts[i].email}','${dataJSON.contacts[i].create_at}'),`
  }else{SEED_DATA_CONTACTS += `('${dataJSON.contacts[i].firstname}','${dataJSON.contacts[i].lastname}','${dataJSON.contacts[i].namaperusahaan}','${dataJSON.contacts[i].notlp}','${dataJSON.contacts[i].email}','${dataJSON.contacts[i].create_at}')`}
}
//INSERT INTO GROUP
for(let i = 0; i < dataJSON.groups.length; i++){
  if(i < dataJSON.groups.length-1){
      SEED_DATA_GROUPS   += `('${dataJSON.groups[i].groupname}','${dataJSON.groups[i].create_at}'),`
  }else{SEED_DATA_GROUPS += `('${dataJSON.groups[i].groupname}','${dataJSON.groups[i].create_at}')`}
}
//INSERT INTO GROUP DETAILS
for(let i = 0; i < dataJSON.group_details.length; i++){
  if(i < dataJSON.group_details.length-1){
      SEED_DATA_DROUP_DETAILS   += `('${dataJSON.group_details[i].contact_id}','${dataJSON.group_details[i].group_id}'),`
  }else{SEED_DATA_DROUP_DETAILS += `('${dataJSON.group_details[i].contact_id}','${dataJSON.group_details[i].group_id}')`}
}

//CREATE TABLE
let createTableContacts = ()=>{
  db.serialize(function(){
    db.run(CREATE_CONTACT, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('CREATE TABLE CONTACTS');
      }
    });
  });
}

let createTableGroups = ()=>{
  db.serialize(function(){
    db.run(CREATE_GROUP, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('CREATE TABLE CONTACTS');
      }
    });
  });
}

let createTableGroupDetails = ()=>{
  db.serialize(function(){
    db.run(CREATE_CONTACT_DETAIL, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('CREATE TABLE CONTACTS');
      }
    });
  });
}
//END CREATE TABLE

//SEED DATA
let seedDataContacts  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('SEED DATA CONTACTS');
      }
    });
  });
}

let seedDataGroups  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_GROUPS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('SEED DATA GROUPS');
      }
    });
  });
}

let seedDataGroupDetails  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_DROUP_DETAILS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log('SEED DATA CONTACTS DETAILS');
      }
    });
  });
}
//END SEED DATA

//REPL START
let start = repl.start('> ');
start.context.createContacts       = createTableContacts
start.context.createGroups         = createTableGroups
start.context.createGroupDetails   = createTableGroupDetails

start.context.seedDataContacts     = seedDataContacts
start.context.seedDataGroups       = seedDataGroups
start.context.seedDataGroupDetails = seedDataGroupDetails

// console.log(SEED_DATA_DROUP_DETAILS);
