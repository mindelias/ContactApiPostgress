"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const contact_postgres_1 = require("../model/contact-postgres");
async function getContacts() {
    // return ContactMongo.find();
    return contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM  contacts;`);
}
exports.getContacts = getContacts;
async function getContactByID(contactID) {
    return contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM contacts WHERE id = ${contactID} LIMIT 1`);
}
exports.getContactByID = getContactByID;
const createContactSchema = joi_1.default.object({
    firstName: joi_1.default
        .string()
        .trim()
        .required(),
    lastName: joi_1.default.string().trim(),
    phone: joi_1.default
        .string()
        .trim()
        .required(),
    email: joi_1.default
        .string()
        .trim()
        .email(),
    company: joi_1.default.string().trim()
});
function createContact(contact) {
    const { error, value } = createContactSchema.validate(contact, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw error;
    }
    return contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO contacts(first_name, last_name, phone, email, company) VALUES(${value.firstName}, ${value.lastName}, ${value.phone}, ${value.email}, ${value.company})
  RETURNING *
  `);
}
exports.createContact = createContact;
async function deleteContact(contactID) {
    return contact_postgres_1.db.query(contact_postgres_1.sql `DELETE FROM contacts WHERE id = ${contactID}`);
}
exports.deleteContact = deleteContact;
async function updateContact(contactID, contact) {
    const [existingContact] = await getContactByID(contactID);
    if (existingContact === 0) {
        throw new Error("Contact not found");
    }
    const newContact = { ...existingContact, ...contact };
    return contact_postgres_1.db.query(contact_postgres_1.sql `
  UPDATE contacts
  SET first_name = ${newContact.first_name},
  last_name =  ${newContact.last_name},
  phone = ${newContact.phone},
  email =  ${newContact.email},
  company = ${newContact.company} WHERE id = ${contactID}
  RETURNING *
  `);
}
exports.updateContact = updateContact;
//# sourceMappingURL=contact.js.map