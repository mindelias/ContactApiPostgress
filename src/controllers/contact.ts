import joi from "@hapi/joi";
// import uuid from 'uuid';

import { Contact } from "../model/contacts-mongo";
import { db, sql } from "../model/contact-postgres";

export async function getContacts(decoded:any) {
  // return ContactMongo.find();
  // return db.query(sql`SELECT * FROM  contacts;`);
  return db.query(sql`SELECT * FROM  contacts WHERE user_id=${decoded.id};`);
}

export async function getContactByID(contactID: string, decoded:any) {
  return db.query(sql`SELECT * FROM contacts WHERE id = ${contactID} AND user_id = ${decoded.id} LIMIT 1`);
}

type CreateContact = Omit<Contact, "id" | "createdAt" | "updatedAt">;

const createContactSchema = joi.object<CreateContact>({
  firstName: joi
    .string()
    .trim()
    .required(),

  lastName: joi.string().trim(),

  phone: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email(),

  company: joi.string().trim()
});

export function createContact(contact: CreateContact, decoded:any) {
  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }

  return db.query(sql`INSERT INTO contacts(first_name, last_name, phone, email, company, user_id) VALUES(${value.firstName}, ${value.lastName}, ${value.phone}, ${value.email}, ${value.company}, ${decoded.id})
  RETURNING *
  `);
}

export async function deleteContact(contactID: string, decoded:any) {
  return db.query(sql`DELETE FROM contacts WHERE id = ${contactID} AND user_id = ${decoded.id}`);
}

export async function updateContact(
  contactID: string,
  contact: Partial<Contact>,
  decoded:any
) {
   
  const [existingContact] = await db.query(sql`SELECT * FROM contacts WHERE id = ${contactID} AND user_id = ${decoded.id} LIMIT 1`)

  if (!existingContact) {
    throw new Error("Contact not found");
  }

  const newContact = { ...existingContact, ...contact };

  return db.query(sql`
  UPDATE contacts
  SET first_name = ${newContact.first_name},
  last_name =  ${newContact.last_name},
  phone = ${newContact.phone},
  email =  ${newContact.email},
  company = ${newContact.company} WHERE id = ${contactID}
  RETURNING *
  `);
}
