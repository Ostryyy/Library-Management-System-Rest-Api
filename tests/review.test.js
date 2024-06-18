const request = require('supertest');
const app = require('../app');
const clearDatabase = require('./setup');

describe('Review Endpoints', () => {
    let userToken;
    let bookId;
    let reviewId;

    beforeAll(async () => {
        await clearDatabase();
        await request(app).post('/api/users/register')
            .send({ username: 'testuser', password: 'userpass' });

        const userRes = await request(app).post('/api/users/login')
            .send({ username: 'testuser', password: 'userpass' });
        userToken = userRes.body.token;

        const bookRes = await request(app).post('/api/books')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ title: 'Test Book', author: 'Test Author', year: 2021, category: 'Fiction', available_copies: 5 });

        bookId = bookRes.body.bookId;
    });

    it('should add a review for a book', async () => {
        const res = await request(app)
            .post(`/api/reviews/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ rating: 5, comment: 'Great book!' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('reviewId');
        reviewId = res.body.reviewId;
    });

    it('should get reviews for a book', async () => {
        const res = await request(app)
            .get(`/api/reviews/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should not add a review with invalid rating', async () => {
        const res = await request(app)
            .post(`/api/reviews/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ rating: 6, comment: 'Invalid rating!' });

        expect(res.statusCode).toEqual(400);
    });

    it('should not add a review without a comment', async () => {
        const res = await request(app)
            .post(`/api/reviews/${bookId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ rating: 5 });

        expect(res.statusCode).toEqual(400);
    });
});
