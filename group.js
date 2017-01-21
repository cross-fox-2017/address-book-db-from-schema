"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'contactgroup.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO groups (name,created_at) VALUES ($name,date('now'))"
let UPDATE_DATA = "UPDATE groups SET name=$name,created_at=$created_at WHERE id = $id"
let DELETE_DATA ="DELETE FROM groups WHERE id = $id"
let DELETE_DETAIL ="DELETE FROM contact_group WHERE group_id = $id"
let SHOW_DATA ="SELECT groups.*, subquery.name AS members FROM groups LEFT JOIN (SELECT * FROM contact_group,contacts where contact_group.contact_id = contacts.id) AS subquery ON subquery.group_id = groups.id"


export class Groups{

  static addGroup(name){
      db.serialize(function(){
        db.run(ADD_DATA,{
          $name: name,
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('ADD GROUP');
          }
        })
      })
  }

  static updateGroup(name,created_at,id){
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $id : id,
          $name: name,
          $created_at: created_at
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
