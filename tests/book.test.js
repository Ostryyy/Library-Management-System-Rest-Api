const request = require('supertest');
const app = require('../app');
const clearDatabase = require('./setup');

describe('Book Endpoints', () => {
    let adminToken;
    let bookId;

    beforeAll(async () => {
        await clearDatabase();
        await request(app).post('/api/users/register')
            .send({ username: 'admin', password: 'adminpass', role: 'admin' });

        const adminRes = await request(app).post('/api/users/login')
            .send({ username: 'admin', password: 'adminpass' });
        adminToken = adminRes.body.token;
    });

    it('should add a new book by admin', async () => {
        const res = await request(app)
            .post('/api/books')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'New Book', author: 'Author', year: 2021, category: 'Fiction', available_copies: 5 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('bookId');
        bookId = res.body.bookId;
    });

    it('should get all books', async () => {
        const res = await request(app)
            .get('/api/books')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should update a book by admin', async () => {
        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Updated Book', author: 'Updated Author', year: 2022, category: 'Non-Fiction', available_copies: 10 });

        expect(res.statusCode).toEqual(200);
    });

    it('should delete a book by admin', async () => {
        const res = await request(app)
            .delete(`/api/books/${bookId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toEqual(204);
    });
});
