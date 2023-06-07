const fs = require('fs/promises');
const path = require('path')
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "/db/contacts.json" );

const listContacts = async () => {

    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if (!result) return console.log('No such ID');
    return result;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1) return console.log('No such ID');
    const [result] = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result;

}

const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...data };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}