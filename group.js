"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'addressbook.db';
var db = new sqlite.Database(file);

export class Groups{
  static addGroup (nama) {
    var ADD_GROUP = "INSERT INTO groups (nama) VALUES ($nama);";
    db.serialize(function() {
      db.run(ADD_GROUP, {
        $nama: nama
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Group Added');
        }
      })
    })
  }
  static updateGroup(id, nama) {
    var UPDATE_GROUP = "UPDATE groups SET nama = $nama WHERE id_group = $id;";
    db.serialize(function() {
      db.run(UPDATE_GROUP,{
        $nama: nama,
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Group id ${id} Updated`);
        }
      })
    })
  }
  static deleteGroup (id) {
    var DELETE_GROUP = "DELETE FROM groups WHERE id_group = $id;"
    var DELETE_GROUP_PLUS = "DELETE FROM contacts_groups WHERE id_group = $id;"
    db.serialize(function() {
      db.run(DELETE_GROUP,{
        $id: id
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Group id ${id} Deleted`);
        }
      })
      db.run(DELETE_GROUP_PLUS,{
        $id: id
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`contacts Removed from this group`);
        }
      })
    })
  }
  static showGroups() {
    var SHOW_GROUPS = "SELECT * FROM groups"
    db.serialize(function() {
      db.all(SHOW_GROUPS,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
}

// var repled = repl.start('>  ').context
// repled.addGroup = Groups.addGroup
// repled.updateGroup = Groups.updateGroup
// repled.deleteGroup = Groups.deleteGroup
// repled.ShowGroups = Groups.ShowGroups
