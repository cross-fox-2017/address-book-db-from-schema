"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'address_book.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO group_details (contact_id,group_id) VALUES ($contact_id,$group_id)"

export class ContactGroups{
  static addContactToGroup(contact_id,group_id){
    db.serialize(function(){
      db.run(ADD_DATA,{
        $contact_id: contact_id,
        $group_id: group_id
      },function(err){
        if(err){
          console.log(err);
        }else{console.log('ADD to GROUP')}
      })
    })
  }
}
