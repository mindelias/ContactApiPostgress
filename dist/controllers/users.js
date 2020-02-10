"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const contact_postgres_1 = require("../model/contact-postgres");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helper_1 = require("../helpers/helper");
const createUsersSchema = joi_1.default.object({
    fullname: joi_1.default
        .string()
        .trim()
        .required(),
    email: joi_1.default
        .string()
        .trim()
        .email()
        .required(),
    password: joi_1.default
        .string()
        .trim()
        .required()
        .min(6)
});
const createLoginSchema = joi_1.default.object({
    email: joi_1.default
        .string()
        .trim()
        .email()
        .required(),
    password: joi_1.default
        .string()
        .trim()
        .required()
        .min(6)
});
// get all Users
async function getUsers() {
    return contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM  users;`);
}
exports.getUsers = getUsers;
// Add new Users
async function AddNewUsers(users) {
    const { error, value } = createUsersSchema.validate(users, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw error.details[0].message;
    }
    // check if user already  exist in the database
    const [User] = await contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM users WHERE email = ${value.email}`);
    if (User) {
        return [];
    }
    // Hash Password
    const salt = await bcryptjs_1.default.genSalt(10);
    value.password = await bcryptjs_1.default.hash(value.password, salt);
    if (!value.password) {
        return [];
    }
    const [newUser] = await contact_postgres_1.db.query(contact_postgres_1.sql `INSERT INTO users(fullname, email, password) VALUES(${value.fullname}, ${value.email}, ${value.password})
    RETURNING *
    `);
    const token = helper_1.generateToken(newUser.id, value.email);
    const newObj = [
        {
            id: newUser.id,
            email: newUser.email,
            token
        }
    ];
    return newObj;
}
exports.AddNewUsers = AddNewUsers;
// Get Validated Users
async function getLoggedUsers(decoded) {
    return contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM  users WHERE id=${decoded.id};`);
}
exports.getLoggedUsers = getLoggedUsers;
// Login users Validation
async function Login(data) {
    const { error, value } = createLoginSchema.validate(data, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw error.details[0].message;
    }
    // check if user exist in the database
    const [User] = await contact_postgres_1.db.query(contact_postgres_1.sql `SELECT * FROM users WHERE email = ${value.email}`);
    if (!User) {
        return [];
    }
    //  check if password matches
    const isMatch = await bcryptjs_1.default.compare(value.password, User.password);
    if (!isMatch) {
        return [];
    }
    const token = helper_1.generateToken(User.id, value.email);
    const newObj = [
        {
            id: User.id,
            email: User.email,
            token
        }
    ];
    return newObj;
}
exports.Login = Login;
//# sourceMappingURL=users.js.map