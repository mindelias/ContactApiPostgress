"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const helper_1 = require("../helpers/helper");
const router = express_1.Router();
router.get("/users/register", async (_req, res) => {
    const data = await users_1.getUsers();
    if (data.length === 0) {
        res.status(204).json({ data });
        return;
    }
    res.status(200).json({ data });
});
router.post("/users/register", async (req, res) => {
    const usersData = req.body;
    // const email = req.body.email
    try {
        const data = await users_1.AddNewUsers(usersData);
        if (!data.length) {
            return res.status(400).json({ error: "user with the email already exist" });
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(400).json({ err });
    }
});
router.get("/users/login", async (req, res) => {
    const token = helper_1.decodeToken(req.headers["token"]);
    try {
        const data = await users_1.getLoggedUsers(token);
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(500).send("internal server  error noticed by Aminat");
    }
});
router.post("/users/login", async (req, res) => {
    const loginData = req.body;
    try {
        const data = await users_1.Login(loginData);
        if (!data.length) {
            return res
                .status(400)
                .json({ msg: "users does not exist or invalid credential" });
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map