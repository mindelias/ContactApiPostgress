import app from '../app';
import request from 'supertest';



describe('user Endpoints', () => {
    it('should signup users', async (done) => {
        const result = await request(app)
            .post('/api/users/register')
            .send({
                fullname: 'aminat',
                email: 'aminat@gmail.com',
                password: '123456'
            })
        expect(result.body).toHaveProperty('data')
        expect(result.body.data[0]).toHaveProperty("email");
        done()
    })

    it("should error if users fails to provide fullname", async done => {
      const result = await request(app)
        .post("/api/users/register")
        .send({
          fullname: "aminat",
          email: "aminat@gmail.com",
          password: "123456"
        });
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toEqual( "user with the email already exist"
        );
      done();
    });
    it("should error if users fails to provide fullname", async done => {
      const result = await request(app)
        .post("/api/users/register")
        .send({
        });
      expect(result.body).toHaveProperty("err");
      done();
    });
}) 