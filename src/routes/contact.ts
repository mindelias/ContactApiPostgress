import { Router } from "express";
import joi from "@hapi/joi";

import {
  getContacts,
  getContactByID,
  createContact,
  deleteContact,
  updateContact
} from "../controllers/contact";

const router = Router();

router.get("/contacts", async (_req, res) => {
  const data = await getContacts();

  if (data.length === 0) {
    res.status(204).json({ data });

    return;
  }

  res.status(200).json({ data });
});

router.get("/contact/:contactID", async (req, res) => {
  const { error, value: contactID } = joi
    .string()
    .uuid({ version: "uuidv4" })
    .required()
    .validate(req.params.contactID, { presence: "required" });

  if (error) {
    res.status(400).json({ error });

    return;
  }

  const data = await getContactByID(contactID);

  if (data.length === 0) {
    res.status(404).json({ error: "Contact not found" });

    return;
  }

  res.status(200).json({ data });
});

router.post("/contact", async (req, res) => {
  const contact = req.body;

  try {
    const data = await createContact(contact);

    res.status(201).json({ data });

    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

const updateContactSchema = joi
  .object({
    first_name: joi
      .string()
      .trim()
      .invalid("", null),

    last_name: joi.string().trim(),

    phone: joi
      .string()
      .trim()
      .invalid("", null),

    email: joi
      .string()
      .trim()
      .email(),

    company: joi.string().trim()
  })
  .rename("firstName", "first_name")
  .rename("lastName", "last_name");

router.patch("/contact/:contactID", async (req, res) => {
  const { error: idError, value: contactID } = joi
    .string()
    .uuid({ version: "uuidv4" })
    .required()
    .validate(req.params.contactID, { presence: "required" });

  if (idError) {
    res.status(400).json({ idError });

    return;
  }

  const { error, value } = updateContactSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }

  const data = await updateContact(contactID, value);

  res.status(200).json({ data });
});

router.delete("/contact/:contactID", async (req, res) => {
  const id = req.params.contactID;
  await deleteContact(id);
  res.status(200).json({ message: "deleted succesfuly" });
});

export default router;
