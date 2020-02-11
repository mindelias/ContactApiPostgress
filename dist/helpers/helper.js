"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
// import decode from "jsonwebtoken-decode";
function generateToken(id, email) {
    const token = jsonwebtoken_1.default.sign({
        id,
        email
    }, "jwtSecret", {
        expiresIn: 3600000
    });
    return token;
}
exports.generateToken = generateToken;
function decodeToken(token) {
    const decoded = jwt_decode_1.default(token);
    return decoded;
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=helper.js.map