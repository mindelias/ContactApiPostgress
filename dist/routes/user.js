"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
// import joi from "@hapi/joi";
const router = express_1.Router();
router.get('/users', async (_req, res) => {
    res.send('register a user');
});
router.post('/users', async (req, res) => {
    const usersData = req.body;
    // const email = req.body.email
    try {
        const data = await users_1.AddNewUsers(usersData);
        res.status(201).json({ data });
        return;
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map