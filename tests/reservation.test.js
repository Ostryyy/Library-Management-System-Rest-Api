const request = require('supertest');
const app = require('../app');
const clearDatabase = require('./setup');

describe('Reservation Endpoints', () => {
    let adminToken;
    let userToken;
    let reservationId;
    let bookId;

    beforeAll(async () => {
        await clearDatabase();

        await request(app).post('/api/users/register')
            .send({ username: 'admin', password: 'adminpass', role: 'admin' });

        const adminRes = await request(app).post('/api/users/login')
            .send({ username: 'admin', password: 'adminpass' });
        adminToken = adminRes.body.token;

        await request(app).post('/api/users/register')
            .send({ username: 'testuser', password: 'userpass' });

        const userRes = await request(app).post('/api/users/login')
            .send({ username: 'testuser', password: 'userpass' });
        userToken = userRes.body.token;

        const bookRes = await request(app).post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Test Book', author: 'Test Author', year: 2021, category: 'Fiction', available_copies: 5 });

        bookId = bookRes.body.bookId;
    });

    it('should reserve a book', async () => {
        const res = await request(app)
            .post('/api/reservations')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ bookId });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('reservationId');
        reservationId = res.body.reservationId;
    });

    it('should get user reservations', async () => {
        const res = await request(app)
            .get('/api/reservations')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should cancel a reservation', async () => {
        const res = await request(app)
            .delete(`/api/reservations/${reservationId}`)
            .set('Authorization', `Bearer ${userToken}`);


        expect(res.statusCode).toEqual(204);
    });
});
