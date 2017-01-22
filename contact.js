"use strict"

const sqlite3 = require('sqlite3').verbose();

let file = "address_book.db"
let db = new sqlite3.Database(file);
let emailPatt = /\S+@\S+\.\S+/
let phonePatt = /[0-9]{9,13}/

export class Contacts {
  static insertContact (name, company, phone, email) {
    if(!emailPatt.test(email)){
      return console.log("Email not valid!")
    } else if(!phonePatt.test(phone)){
      return console.log("Phone number not valid!")
    } else {
      let INSERT_DATA = `INSERT INTO contact(name, company, phone, email) VALUES('${name}', '${company}', '${phone}', '${email}')`
      db.serialize(function() {
        db.run(INSERT_DATA, function(err) {
          if(err) {
            console.log(err)
          } else {
            console.log("Insert Data to Contact Success!")
          }
        })
      })
    }
  }

  static updateContact (name, company, telp, email, id) {
    let UPDATE_CONTACT = `UPDATE contact SET name = '${name}', company = '${company}', phone = '${telp}', email = '${email}' WHERE id = ${id}`
    db.serialize(function() {
      db.run(UPDATE_CONTACT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Update Contact Success!`)
        }
      })
    })
  }

  static deleteContact (id) {
    let DELETE_CONTACT = `DELETE FROM contact WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_CONTACT, function(err) {
        if(err) {
          console.log(err)
        } else {
          console.log(`Delete Contact Success!`);
        }
      })
    })
  }

  static showContact () {
    let SELECT_CONTACT = `SELECT contact.*, groups.name AS GroupName FROM contact
                          LEFT JOIN contact_groups ON contact.id = contact_groups.contact_id
                          LEFT JOIN groups ON contact_groups.group_id = groups.id`
    db.serialize(function() {
      db.each(SELECT_CONTACT, function(err, row) {
        if(err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }
}




