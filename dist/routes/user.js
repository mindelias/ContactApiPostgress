"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const contact_postgres_1 = require("../model/contact-postgres");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import joi from "@hapi/joi";
const router = express_1.Router();
router.get("/users", async (_req, res) => {
    res.send("register a user");
});
router.post("/users", async (req, res) => {
    const usersData = req.body;
    // const email = req.body.email
    try {
        const data = users_1.AddNewUsers(usersData);
        const [User] = await contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM users WHERE email = ${data.email}`);
        console.log(User);
        if (User) {
            res.status(400).json("user with the email already exist");
        }
        // Hash Password
        bcryptjs_1.default.genSalt(10, (_err, salt) => bcryptjs_1.default.hash(data.password, salt, (err, hash) => {
            if (err) {
                res.status(500).send('server error');
            }
            data.password = hash;
            contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO users(fullname, email, password) VALUES(${data.fullname}, ${data.email}, ${data.password})
          RETURNING *
          `)
                .then(result => res.status(201).json({ result }))
                .catch(err => res.status(409).json(err));
        }));
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map