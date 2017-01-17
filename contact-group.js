"use strict"

// const repl = require('repl')
const sqlite = require('sqlite3').verbose();
var file = 'contacts.db';
var db = new sqlite.Database(file)

class Contacts_groups {
    addContacts_groups(contacts_id,groups_id) {
      db.serialize(function() {
        let query = `INSERT INTO contacts_groups(contacts_id,groups_id) VALUES ('${contacts_id}','${groups_id}')`;
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

    updateContacts_groups(contacts_id,groups_id,id) {
      db.serialize(function() {
        let query = `UPDATE contacts_groups set contacts_id='${contacts_id}', groups_id='${groups_id}' where id='${id}')`;
          db.run(query, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("UPDATE_DATA SUCCESS");
              }
          })
      })
      return true;
    }

    deleteContacts_groups(id) {
      db.serialize(function() {
          db.run(`DELETE from contacts_groups where id='${id}'`, function(err) {
              if (err) {
                  console.log(err);
              } else {
                  console.log("DELETE_DATA SUCCESS");
              }
          })
      })
    return true;
    }

    showContacts_groups() {
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

var newContacts_groups = new Contacts_groups()

module.exports = newContacts_groups
