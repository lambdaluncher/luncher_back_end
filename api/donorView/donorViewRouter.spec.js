const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

describe('The Donor View route handlers', () => {
    afterEach(async () => {
        await db('schools').truncate();
    });

    describe('get /', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/donorView');

            expect(response.status).toBe(200);
        });
    });

});
