"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import joi from "@hapi/joi";
const router = express_1.Router();
router.get('/auth', async (_req, res) => {
    res.send('i get aithetication');
});
router.post('/auth', async (_req, res) => {
    res.send('this ia post auth');
});
exports.default = router;
//# sourceMappingURL=auth.js.map