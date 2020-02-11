"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importStar(require("@databases/pg"));
exports.sql = pg_1.sql;
// or in CommonJS:
// const connect = require('@databases/pg');
// const {sql} = require('@databases/pg');
const db = pg_1.default();
exports.db = db;
async function authenticate() {
    return db.query(pg_1.sql `SELECT 1+1 AS result`);
}
exports.authenticate = authenticate;
//# sourceMappingURL=contact-postgres.js.map