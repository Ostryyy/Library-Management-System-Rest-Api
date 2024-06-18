const request = require('supertest');
const app = require('../app');
const clearDatabase = require('./setup');

describe('User Endpoints', () => {
    let adminToken;
    let userToken;
    let userId;

    beforeAll(async () => {
        await clearDatabase();
        await request(app).post('/api/users/register')
            .send({ username: 'admin', password: 'adminpass', role: 'admin' });

        const adminRes = await request(app).post('/api/users/login')
            .send({ username: 'admin', password: 'adminpass' });
        adminToken = adminRes.body.token;

        const userRes = await request(app).post('/api/users/register')
            .send({ username: 'testuser', password: 'userpass' });
        userId = userRes.body.userId;

        const userLoginRes = await request(app).post('/api/users/login')
            .send({ username: 'testuser', password: 'userpass' });
        userToken = userLoginRes.body.token;
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({ username: 'newuser', password: 'newpass' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('userId');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({ username: 'testuser', password: 'userpass' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should delete a user by admin', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(204);
    });

    it('should update a user by admin', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ username: 'updateduser', password: 'updatedpass', role: 'user' });

        expect(res.statusCode).toEqual(200);
    });
});
