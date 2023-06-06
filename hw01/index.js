const contacts = require('./contacts')
const { program } = require('commander');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list': 
            const allContacts = await contacts.listContacts();
            return console.table(allContacts);
        
        case 'get': 
            const contact = await contacts.getContactById(id);
            return console.table(contact);    
        
        case 'add': 
            const newContact = await contacts.addContact({name, email, phone});
            return console.table(newContact);  

        case 'remove': 
            const deleteContact = await contacts.removeContact(id);
            return console.table(deleteContact); 
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

program
    .option('-a, --action, <type>')
    .option('-i, --id, <type>')
    .option('-n, --name, <type>')
    .option('-e, --email, <type>')
    .option('-p, --phone, <type>')

program.parse();

const options = program.opts();
invokeAction(options)


