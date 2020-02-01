"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
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
function AddNewUsers(users) {
    const { error, value } = createUsersSchema.validate(users, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw error.details[0].message;
    }
    return value;
}
exports.AddNewUsers = AddNewUsers;
//# sourceMappingURL=users.js.map