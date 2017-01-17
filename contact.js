"use strict"


// const repl = require('repl')
const sqlite = require('sqlite3').verbose();
var file = 'contacts.db';
var db = new sqlite.Database(file)

class Contacts {
    addContacts(fullname, company_name, email, phone_number) {
        if (/^\w+@[a-zA-Z]+?\.[a-sA-Z]{2,3}$/.test(email) == false) {
            console.log("Format Email Salah");
            return false
        } else if (typeof(Number(phone_number)) == "number" && phone_number.length < 17 && phone_number.length > 8) {
            db.serialize(function() {
                let query = `INSERT INTO contacts(fullname, company_name, email, phone_number, created_at, updated_at) VALUES ('${fullname}','${company_name}','${email}','${phone_number}','${new Date()}', '${new Date()}')`;
                db.run(query, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("INSERT_DATA SUCCESS");
                    }
                })
            })
            return true;
        } else {
            console.log("Masukkan phone_number dengan benar ");
            return false
        }
    }

    updateContacts(fullname, company_name, email, phone_number, id) {
        if (/^\w+@[a-zA-Z]+?\.[a-sA-Z]{2,3}$/.test(email) == false) {
            console.log("Format Email Salah");
            return false
        } else if (typeof(Number(phone_number)) == "number" && phone_number.length < 17 && phone_number.length > 8) {
            db.serialize(function() {
                db.run(`UPDATE contacts set fullname='${fullname}',company_name='${company_name}',email='${email}',phone_number='${phone_number}',updated_at='${new Date()}' where id='${id}'`, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("UPDATE_DATA SUCCESS");
                    }
                })
            })
            return true;
        } else {
            console.log("Masukkan phone_number dengan benar ");
            return false
        }
    }

    deleteContacts(id) {
        db.serialize(function() {
            db.run(`DELETE from contacts where id='${id}'`, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("DELETE_DATA SUCCESS");
                }
            })
        })
        return true;
    }

    showContacts() {
        db.serialize(function() {
            db.all("SELECT contacts.*, groups.NAME as 'Group' FROM contacts, groups, contacts_groups where contacts_groups.contacts_id = contacts.id and contacts_groups.groups_id = groups.id", function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
        })
        return true;
    }

    help() {
        console.log(`insertGroup("name")\nupdateGroup("name", "id")\ndeleteGroup("id")\nshowGroup()\ninsertContact("name", "company","email","phone")\nupdateContact("name", "company","email","telp", "id")\ndeleteContact("id")\nshowContact()\ninsertContactIdToGroupId("contactid", "groupid")`);
        return true;
    }

}


var newContacts = new Contacts()
module.exports = newContacts
