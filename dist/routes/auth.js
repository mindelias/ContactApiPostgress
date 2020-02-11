"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import joi from "@hapi/joi";
function authenticate(req, res, next) {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            error: "Access denied, provide token"
        });
    }
    jsonwebtoken_1.default.verify(token, "jwtSecret", (error) => {
        if (error) {
            res.status(400).json({
                error: "Access denied, token is invalid"
            });
        }
    });
    return next();
}
exports.default = authenticate;
//# sourceMappingURL=auth.js.map