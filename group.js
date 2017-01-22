"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'address_book.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO groups (groupname,create_at) VALUES ($groupname,date('now'))"
let UPDATE_DATA = "UPDATE groups SET groupname=$groupname,create_at=$create_at WHERE id = $id"
let DELETE_DATA ="DELETE FROM groups WHERE id = $id"
let DELETE_DETAIL ="DELETE FROM group_details WHERE group_id = $id"
let SHOW_DATA ="SELECT groups.*, subquery.firstname AS members FROM groups LEFT JOIN (SELECT * FROM group_details,contacts where group_details.contact_id = contacts.id) AS subquery ON subquery.group_id = groups.id"


export class Groups{

  static addGroup(groupname){
      db.serialize(function(){
        db.run(ADD_DATA,{
          $groupname: groupname,
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('ADD GROUP');
          }
        })
      })
  }

  static updateGroup(groupname,created_at,id){
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $id : id,
          $groupname: groupname,
          $create_at: created_at
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('GROUP UPDATED');
          }
        })
      })
  }

  static deleteGroup(id){
    db.serialize(function(){
      db.run(DELETE_DATA,{
        $id : id,

      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log('Group DELETED');
        }
      })
    })

    db.serialize(function(){
      db.run(DELETE_DETAIL,{
        $id : id,

      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log('Group_id DELETED');
        }
      })
    })
  }

  static showGroup(){
    db.serialize(function(){
      db.each(SHOW_DATA,function(err,row){
        if(err){
          console.log(err);
        } else{
          console.log(row);
        }
      })
    })
  }
}
