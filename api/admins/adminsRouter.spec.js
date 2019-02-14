const request = require('supertest');
const admins = require('./adminsRouter.js');
const db = require('../../data/dbConfig.js');

describe('The Admins route handlers', () => {
    afterEach(async () => {
        await db('admins').truncate();
    });

    describe('get /', () => {
        it('responds with status code 200', async () => {
            const response = await request(admins).get('/');

            expect(response.status).toBe(200);
        });

        it('responds with json type', async () => {
            const response = await request(admins).get('/');

            expect(response.type).toMatch(/json/i);
        });

        it('sends correct response object', async () => {
            const response = await request(admins).get('/');

            expect(response.body).toEqual([]);
        });
    });
});