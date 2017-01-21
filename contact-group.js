"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'contactgroup.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO contact_group (contact_id,group_id,join_at) VALUES ($contact_id,$group_id,date('now'))"



export class Contact_group{

  static addContactToGroup(contact_id,group_id){
      db.serialize(function(){
        db.run(ADD_DATA,{
          $contact_id: contact_id,
          $group_id: group_id
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('ADD to GROUP');
          }
        })
      })
  }


}
