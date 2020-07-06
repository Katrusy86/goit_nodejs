const fs = require("fs");
const path = require("path");
const contactsPath = require(path.join(__dirname, "./db/contacts.json"));

const { promises: fsPromises } = fs;


async function listContacts() {
  try {
    const contactList = await fsPromises.readFile(
      "./db/contacts.json",
      "utf-8"
    );
    console.log(contactList);
  } catch (err) {
    throw err;
  }
}

function getContactById(id) {
  const getContactId = contactsPath.filter(contact => {
    if (id !== contact.id) {
      return false;
    }
    return true;
  });

  console.log(getContactId);
}


async function removeContact(id) {
  try{

    const removeContactId = contactsPath.filter(contact => {
      return contact.id !== id;
    });
    console.log(removeContactId);
    await fsPromises.writeFile("./db/contacts.json", JSON.stringify(removeContactId, undefined, 2));
  
  } catch (err) {
    throw err;
  }
}


async function addContact(name, email, phone) {  
  try{
    const addContactItem = {
      name: name,
      email:email,
      phone:phone
    }
    console.log(addContactItem);
    await fsPromises.writeFile("./db/contacts.json", JSON.stringify([...contactsPath, addContactItem], undefined, 2));
  
  } catch (err) {
    throw err;
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
