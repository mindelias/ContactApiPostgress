"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("@hapi/joi"));
const helper_1 = require("../helpers/helper");
const contact_1 = require("../controllers/contact");
const router = express_1.Router();
router.get("/contacts", async (req, res) => {
    const token = helper_1.decodeToken(req.headers['token']);
    const data = await contact_1.getContacts(token);
    if (data.length === 0) {
        res.status(204).json({ data });
        return;
    }
    res.status(200).json({ data });
});
router.get("/contact/:contactID", async (req, res) => {
    const { error, value: contactID } = joi_1.default
        .string()
        .uuid({ version: "uuidv4" })
        .required()
        .validate(req.params.contactID, { presence: "required" });
    const token = helper_1.decodeToken(req.headers['token']);
    if (error) {
        res.status(400).json({ error });
        return;
    }
    const data = await contact_1.getContactByID(contactID, token);
    if (data.length === 0) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    res.status(200).json({ data });
});
router.post("/contact", async (req, res) => {
    const contact = req.body;
    const token = helper_1.decodeToken(req.headers['token']);
    try {
        const data = await contact_1.createContact(contact, token);
        res.status(201).json({ data });
        return;
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
const updateContactSchema = joi_1.default
    .object({
    first_name: joi_1.default
        .string()
        .trim()
        .invalid("", null),
    last_name: joi_1.default.string().trim(),
    phone: joi_1.default
        .string()
        .trim()
        .invalid("", null),
    email: joi_1.default
        .string()
        .trim()
        .email(),
    company: joi_1.default.string().trim()
})
    .rename("firstName", "first_name")
    .rename("lastName", "last_name");
router.patch("/contact/:contactID", async (req, res) => {
    const { error: idError, value: contactID } = joi_1.default
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
    const token = helper_1.decodeToken(req.headers['token']);
    const data = await contact_1.updateContact(contactID, value, token);
    res.status(200).json({ data });
});
router.delete("/contact/:contactID", async (req, res) => {
    const id = req.params.contactID;
    const token = helper_1.decodeToken(req.headers['token']);
    await contact_1.deleteContact(id, token);
    res.status(200).json({ message: "deleted succesfuly" });
});
exports.default = router;
//# sourceMappingURL=contact.js.map