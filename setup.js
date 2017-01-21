"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()
const fs= require('fs')
var skrip = 'contact.json'
let dc = JSON.parse(fs.readFileSync(skrip,'utf-8'))
var file = 'contactgroup.db'
var db = new sqlite.Database(file)

//SQL Statement
var CREATE_CONTACT = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT,phone TEXT)"
var CREATE_GROUP = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,created_at DATE)"
var CREATE_GROUP_CONTACT = "CREATE TABLE IF NOT EXISTS contact_group (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER NOT NULL,group_id INTEGER NOT NULL,join_at DATE,FOREIGN KEY(contact_id) REFERENCES contacts(id) ,FOREIGN KEY(group_id) REFERENCES groups(id))"
var SEED_CONTACT = "INSERT INTO contacts (name,email,phone) VALUES(?,?,?)"
var SEED_GROUP = "INSERT INTO groups (name,created_at) VALUES(?,?)"
var SEED_CG = "INSERT INTO contact_group (contact_id,group_id,join_at) VALUES(?,?,?)"
var TABLE = [CREATE_CONTACT,CREATE_GROUP,CREATE_GROUP_CONTACT]
//CREATE_TABLE
let createTable = () =>{
  db.serialize(function(){
    for(var i=0;i<TABLE.length;i++){
    db.run(TABLE[i],function(err){
      if(err){
        console.log(err);
      } else{
        console.log('TABLE CREATED');
      }
    })
  }
  })
}

let inputContact = () =>{

  db.serialize(function(){
    for(var j=0;j<dc.contacts.length;j++){
    db.run(SEED_CONTACT,dc.contacts[j].name,dc.contacts[j].email,dc.contacts[j].phone,function(err){
      if(err){
        console.log(err);
      } else{
        console.log('the contact has been planted');
      }
    })
  }

  for(var k=0;k<dc.groups.length;k++){
  db.run(SEED_GROUP,dc.groups[k].name,dc.groups[k].created_at,function(err){
    if(err){
      console.log(err);
    } else{
      console.log('the group has been planted');
    }
  })
  }

  for(var n=0;n<dc.contact_group.length;n++){
  db.run(SEED_CG,dc.contact_group[n].contact_id,dc.contact_group[n].group_id,dc.contact_group[n].join_at,function(err){
    if(err){
      console.log(err);
    } else{
      console.log('the group_contact has been planted');
    }
  })
  }

  })
}


var rep = repl.start('> ').context

rep.createTable = createTable
rep.inputContact = inputContact
