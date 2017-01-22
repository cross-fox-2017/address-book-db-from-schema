var repl    = require("repl");
var sqlite  = require("sqlite3").verbose();

var file    = "address_book.db";
var db      = new sqlite.Database(file);

//SQL Statement
var ADD_DATA       = "INSERT INTO contacts(firstname, lastname,namaperusahaan, notlp, email, create_at) VALUES($firstname, $lastname, $namaperusahaan,$notlp,$email,$create_at)"
var UPPDATE_DATA   = "UPDATE contacts SET firstname = $firstname, lastname = $lastname, namaperusahaan = $namaperusahaan, notlp = $notlp, email = $email, create_at = $create_at WHERE id = $id"
var DELETE_DATA    = "DELETE FROM contacts WHERE id = $id"
var DELETE_DETAILS = "DELETE FROM group_details WHERE id = $id"
var SHOW_DATA      = "SELECT contacts.*, subquery.groupname AS grup FROM contacts LEFT JOIN (SELECT * FROM group_details,groups where group_details.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id"

function validateEmail(email) {
    var validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validate.test(email);
}

export class Contacts {
    constructor(firstname, lastname, namaperusahaan, notlp, email, create_at) {

    }

    static addContact(firstname, lastname, namaperusahaan, notlp, email, create_at){
    if(validateEmail(email)===false && (notlp.length<6 || notlp.length>12)){
      return "Email & phone it's not valid"
    }
    else if(validateEmail(email)===false){
      return "Email it's not valid"
    }
    else if(notlp.length<6 || notlp.length>12 ){
      return "phone it's not valid"
    }
    else{
      db.serialize(function(){
        db.run(ADD_DATA,{
          $firstname: firstname,
          $lastname:lastname,
          $namaperusahaan:namaperusahaan,
          $notlp:notlp,
          $email: email,
          $create_at:create_at
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

  static updateContact(firstname, lastname, namaperusahaan, notlp, email, create_at,id){
      if(validateEmail(email)===false){
        return "Email it's not valid"
      }
      else if(notlp.length<6 || notlp.length>12 ){
        return "Phone it's not valid"
      }
      else{
        db.serialize(function(){
          db.run(UPDATE_DATA,{
            $id : id,
            $firstname: firstname,
            $lastname:lastname,
            $namaperusahaan:namaperusahaan,
            $notlp:notlp,
            $email: email,
            $create_at:create_at
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
        db.run(DELETE_DETAILS,{
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
