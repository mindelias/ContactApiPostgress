"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import joi from "@hapi/joi";
const router = express_1.Router();
router.get('/users', async (_req, res) => {
    res.send('register a user');
});
router.post('/users', async (_req, res) => {
    res.send('register a user');
});
exports.default = router;
//# sourceMappingURL=user.js.map