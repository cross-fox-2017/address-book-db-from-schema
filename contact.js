"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'addressbook.db';
var db = new sqlite.Database(file);

class Contacts{
  static addContact (fullname, phone, email) {
    let validEmail = /\w+@\w+.\w+/.test(email)
    if (phone.length > 13){
      return "Wrong Phone input format"
    }
    if (!validEmail){
      return "Email not valid"
    }
    var ADD_CONTACT = "INSERT INTO contacts (fullname, phone, email) VALUES ($fullname, $phone, $email);";
    db.serialize(function() {
      db.run(ADD_CONTACT, {
        $fullname: fullname,
        $phone: phone,
        $email: email
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Contact ${fullname} Has Been Added`);
        }
      })
    })
  }
  static insertContactIdToGroupId(id_contact, id_group){
    var CONNECT = "INSERT INTO contacts_groups (id_contact, id_group) VALUES (?, ?);";
    db.serialize(function() {
      db.run(CONNECT, id_contact, id_group, function(err){
        if (err){
          console.log(err);
        } else {
          console.log('Contact Added Into Group');
        }
      })
    })
  }
  static updateContact(id, col, value) {
    var UPDATE_CONTACT = db.prepare(`UPDATE contacts SET '${col}' = ? WHERE id_contact = ?`);
    db.serialize(function() {
      UPDATE_CONTACT.run(value, id, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Contact id ${id} Updated`);
        }
      })
    })
  }
  static deleteContact (id) {
    var DELETE_CONTACT = "DELETE FROM contacts WHERE id_contact = $id;"
    db.serialize(function() {
      db.run(DELETE_CONTACT,{
        $id: id
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Contact id ${id} Deleted`);
        }
      })
    })
  }
  static readContact() {
    var READ_CONTACT = "SELECT * FROM contacts"
    db.serialize(function() {
      db.all(READ_CONTACT,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
  static showContacts(){
    var SHOW_CONTACTS = "SELECT contacts.*, groups.nama AS nama_group FROM contacts LEFT JOIN contacts_groups ON contacts.id_contact = contacts_groups.id_contact LEFT JOIN groups ON contacts_groups.id_group = groups.id_group"
    db.serialize(function() {
      db.all(SHOW_CONTACTS,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }
}


var repled = repl.start('>  ').context
repled.addContact = Contacts.addContact
repled.updateContact = Contacts.updateContact
repled.deleteContact = Contacts.deleteContact
repled.readContact = Contacts.readContact
repled.showContacts = Contacts.showContacts
repled.contactIntoGroup = Contacts.insertContactIdToGroupId
