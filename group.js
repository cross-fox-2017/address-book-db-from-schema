"use strict"


// const repl = require('repl')
const sqlite = require('sqlite3').verbose();
var file = 'contacts.db';
var db = new sqlite.Database(file)

class Groups {
    addGroups(name) {
      db.serialize(function() {
        let query = `INSERT INTO groups(name,created_at, updated_at) VALUES ('${name}','${new Date()}','${new Date()}')`;
          db.run(query, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("INSERT_DATA SUCCESS");
              }
          })
      })
      return true;
    }

    updateGroups(name,id) {
      db.serialize(function() {
          db.run(`UPDATE groups set name='${name}',updated_at='${new Date()}' where id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("UPDATE_DATA SUCCESS");
              }
          })
      })
      return true;
    }

    deleteGroups(id) {
      db.serialize(function() {
          db.run(`DELETE from groups where id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("DELETE_DATA SUCCESS");
              }
          })
      })
      db.serialize(function() {
          db.run(`DELETE from contacts_groups where groups_id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("DELETE_DATA SUCCESS");
              }
          })
      })
    return true;
    }

    showGroups() {
      db.serialize(function() {
          db.all("SELECT * FROM groups", function(err,data) {
              if (err) {
                  console.log(err);
              } else {
                console.log(data);
              }
          })
      })
    return true;
    }

}

var newGroups = new Groups()
module.exports = newGroups
