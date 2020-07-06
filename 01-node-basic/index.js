const exportContacts = require("./contacts");
const yargs = require("yargs");
// const argv = require('yargs').argv;

const argv = yargs
    .number("id")
    .string("name")
    .string("email")
    .alias("name","n")
    .string("phone")
    .argv;


function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        console.table(exportContacts.listContacts());    
      break;
    case 'get':
        console.table(exportContacts.getContactById(id));
      break;

    case 'add':
        console.table(exportContacts.addContact(name, email, phone));
      break;

    case 'remove':
        console.table(exportContacts.removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);