"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("user Endpoints", () => {
    it("should signup users", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/register")
            .send({
            fullname: "aminat",
            email: "aminat@gmail.com",
            password: "123456"
        });
        expect(result.body).toHaveProperty("data");
        expect(result.body.data[0]).toHaveProperty("email");
        done();
    });
    it("should error if users fails to provide fullname", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/register")
            .send({
            fullname: "aminat",
            email: "aminat@gmail.com",
            password: "123456"
        });
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("user with the email already exist");
        done();
    });
    it("should error if users fails to provide fullname", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/register")
            .send({});
        expect(result.body).toHaveProperty("err");
        done();
    });
    it("should login users", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/login")
            .send({
            email: "aminat@gmail.com",
            password: "123456"
        });
        expect(result.body).toHaveProperty("data");
        expect(result.body.data[0]).toHaveProperty("email");
        done();
    });
    it("should error if users does not exist", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/login")
            .send({
            email: "jamila@gmail.com",
            password: "123456"
        });
        console.log(result.body);
        expect(result.body).toHaveProperty("msg");
        expect(result.body.msg).toEqual("users does not exist or invalid credential");
        done();
    });
    it("should error if users fails to provide email and password", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/users/login")
            .send({});
        expect(result.body).toHaveProperty("error");
        done();
    });
});
describe("contacts Endpoints", () => {
    it("users should be able to add contact", async (done) => {
        const user = await supertest_1.default(app_1.default)
            .post("/api/users/register")
            .send({
            fullname: "usman",
            email: "usman@gmail.com",
            password: "123456"
        });
        const userToken = user.body.data[0].token;
        const result = await supertest_1.default(app_1.default)
            .post("/api/contacts")
            .set("token", userToken)
            .send({
            firstName: "lovelyn",
            email: "lovelyn@gmail.com",
            phone: "08090807908"
        });
        // console.log(result);
        expect(result.body).toHaveProperty("data");
        expect(result.body.data[0]).toHaveProperty("phone");
        done();
    });
    it("should error if users fail to provide a token", async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post("/api/contacts")
            .send({
            firstName: "lovelyn",
            email: "lovelyn@gmail.com",
            phone: "08090807908"
        });
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual("Access denied, provide token");
        done();
    });
    it("should error if users fail to input valid phone number or firstName", async (done) => {
        const user = await supertest_1.default(app_1.default)
            .post("/api/users/register")
            .send({
            fullname: "manis",
            email: "mani@gmail.com",
            password: "123456"
        });
        const userToken = user.body.data[0].token;
        const result = await supertest_1.default(app_1.default)
            .post("/api/contacts")
            .set("token", userToken)
            .send({
            firstName: "lovelyn",
            email: "lovelyn@gmail.com"
        });
        expect(result.body).toHaveProperty("error");
        done();
    });
    it("should get all contacts of the particular logged in users", async (done) => {
        const user = await supertest_1.default(app_1.default)
            .post("/api/users/login")
            .send({
            email: "mani@gmail.com",
            password: "123456"
        });
        const userToken = user.body.data[0].token;
        const usersContact = await supertest_1.default(app_1.default)
            .post("/api/contacts")
            .set("token", userToken)
            .send({
            firstName: "joseph",
            email: "joe@gmail.com",
            phone: "08090807908",
            company: "tesco and CO "
        });
        const result = await supertest_1.default(app_1.default)
            .get("/api/contacts")
            .set("token", userToken);
        expect(result.body).toHaveProperty(`data`);
        expect(result.body.data[0]).toHaveProperty('user_id');
        usersContact;
        done();
    });
});
//# sourceMappingURL=contact.js.map