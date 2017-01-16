const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'database.db';
var db = new sqlite.Database(file);

// SQL Statement
var TABLE_CONTACT = "CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL, perusahaan TEXT NOT NULL, no_telepon INTEGER NOT NULL, email TEXT NOT NULL)";
var TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups ( id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL)";
var TABLE_CONTACT_GROUPS = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, groups_id INTEGER, FOREIGN KEY (contact_id) REFERENCES contact(id), FOREIGN KEY (groups_id) REFERENCES groups(id));";

// Create table_contact
 db.serialize(function() {
   // Create TABLE
   db.run(TABLE_CONTACT, function(err) {
     if (err) {
       console.log(err);
     } else {

     }
   });
 });
 db.serialize(function() {
   // Create TABLE
   db.run(TABLE_GROUPS, function(err) {
     if (err) {
       console.log(err);
     } else {

     }
   });
 });
 db.serialize(function() {
   // Create TABLE
   db.run(TABLE_CONTACT_GROUPS, function(err) {
     if (err) {
       console.log(err);
     } else {

     }
   });
 });

// ambil data dari JSON

// ambil data dari JSON, masukkan ke database
function import_json() {
  const fs = require('fs');
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  // import ke table contact
  for ( let i = 0; i < list.contact.length; i++) {
     var IMPORT = `INSERT INTO contact (nama, perusahaan, no_telepon, email) VALUES ('${list.contact[i].name}', '${list.contact[i].company}', '${list.contact[i].phone}', '${list.contact[i].email}')`;
      db.serialize(function() {
        // Create TABLE
        db.run(IMPORT, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("data berhasil di import");
          }
        });
      });
   }
  // import ke table group
  for ( let i = 0; i < list.groups.length; i++) {
    var IMPORT = `INSERT INTO groups (nama) VALUES ('${list.groups[i].name}')`;
    db.serialize(function() {
      db.run(IMPORT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("data berhasil di import ke table groups");
        }
      });
    });
  }
  // import ke table contact_groups
  for ( let i = 0; i < list.contact_groups.length; i++) {
    var IMPORT = `INSERT INTO contact_groups (contact_id, groups_id) VALUES ('${list.contact_groups[i].group_id}', '${list.contact_groups[i].contact_id}')`;
    db.serialize(function() {
      db.run(IMPORT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("data berhasil di import ke table contact_groups");
        }
      });
    });
  }
}
//import_json();


class Contact {
  insertContact(name, company, phone, email) {
    var QUERY = `INSERT INTO contact (nama, perusahaan, no_telepon, email) VALUES ('${name}', '${company}', '${phone}', '${email}')`;
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("data berhasil di import");
        }
      });
    });
  }

  updateContact(name, telp, company, email, id) {
    var QUERY = `UPDATE contact SET nama = '${name}', perusahaan = '${company}', no_telepon = '${telp}', email = '${email}' WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("data berhasil di rubah");
        }
      });
    });
  }

  hapusContact(id) {
    var QUERY = `DELETE FROM contact WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("data berhasil di hapus");
        }
      });
    });
  }

  showContact() {
    var QUERY = `SELECT * FROM contact`;
    db.serialize(function() {
      db.each(QUERY, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }
}

var nama = new Contact;
var replStr = repl.start('> ')
replStr.context.insertContact = nama.insertContact;
replStr.context.updateContact = nama.updateContact;
replStr.context.deleteContact = nama.hapusContact;
replStr.context.showContact = nama.showContact;


// insertContact(name, company, phone, email)
//    insertContactIdToGroupId(contactid, groupid)
//    updateContact(name, telp, company, email, id)
//    deleteContact(id)
//    showContact()
//
//
//    insertGroup(name)
//    updateGroup(name, id)
//    deleteGroup(id)
//    showGroup()
