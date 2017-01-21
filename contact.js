"use strict"

const repl = require("repl");
const sqlite = require('sqlite3').verbose()

var file = 'contactgroup.db'
var db = new sqlite.Database(file)

//SQL Statement
let ADD_DATA = "INSERT INTO contacts (name,email,phone) VALUES ($name,$email,$phone)"
let UPDATE_DATA = "UPDATE contacts SET name=$name,email=$email,phone=$phone WHERE id = $id"
let DELETE_DATA ="DELETE FROM contacts WHERE id = $id"
let DELETE_DETAIL ="DELETE FROM contact_group WHERE group_id = $id"
let SHOW_DATA ="SELECT contacts.*, subquery.name AS grup FROM contacts LEFT JOIN (SELECT * FROM contact_group,groups where contact_group.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id"

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export class Contacts{

  static addContact(name,email,phone){
    if(validateEmail(email)===false && (phone.length<6 || phone.length>12)){
      return "email tidak valid (contoh valid: timo@yahoo.com ) & telefon tidak valid (jumlah nomor harus >= 6 dan < 12 digit)"
    }
    else if(validateEmail(email)===false){
      return "email tidak valid (contoh valid: timo@yahoo.com )"
    }
    else if(phone.length<6 || phone.length>12 ){
      return "telefon tidak valid (jumlah nomor harus >= 6 dan < 12 digit)"
    }
    else{
      db.serialize(function(){
        db.run(ADD_DATA,{
          $name: name,
          $email: email,
          $phone: phone
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('ADD CONTACT');
          }
        })
      })
    }
  }

  static updateContact(name,email,phone,id){
    if(validateEmail(email)===false){
      return "email tidak valid"
    }
    else if(phone.length<6 || phone.length>12 ){
      return "telefon tidak valid"
    }
    else{
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $id : id,
          $name: name,
          $email: email,
          $phone: phone
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log('CONTACT UPDATED');
          }
        })
      })
    }
  }

  static deleteContacts(id){
    db.serialize(function(){
      db.run(DELETE_DATA,{
        $id : id,

      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log('CONTACT DELETED');
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
          console.log('contact_id DELETED');
        }
      })
    })
  }

  static showContact(){
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
