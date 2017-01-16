"use strict"

class Contacts{
  static addContact (fullname, phone, email) {
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
          console.log('Contact Added');
        }
      })
    })
  }
  static updateContact(id, fullname, phone, email) {
    var UPDATE_CONTACT = "UPDATE contacts SET fullname = $fullname, phone = $phone, email = $email WHERE id = $id;";
    db.serialize(function() {
      db.run(UPDATE_CONTACT,{
        $fullname: fullname,
        $phone: phone,
        $id: id,
        $email: email
      }, function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`Contact id ${id} Updated`);
        }
      })
    })
  }
  static deleteContact (id) {
    var DELETE_CONTACT = "DELETE FROM contacts WHERE id = $id;"
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
}
