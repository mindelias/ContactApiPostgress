"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
describe('user Endpoints', () => {
    it('should signup users', async (done) => {
        const result = await supertest_1.default(app_1.default)
            .post('/api/users/register')
            .send({
            fullname: 'aminat',
            email: 'aminat@gmail.com',
            password: '123456'
        });
        expect(result.body).toHaveProperty('data');
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
});
//# sourceMappingURL=contact.js.map