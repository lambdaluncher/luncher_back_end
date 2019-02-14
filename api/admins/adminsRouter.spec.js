const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

describe('The Admins route handlers', () => {
    afterEach(async () => {
        await db('admins').truncate();
    });

    describe('get /', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/admins');

            expect(response.status).toBe(200);
        });

        it('responds with json type', async () => {
            const response = await request(server).get('/admins');

            expect(response.type).toMatch(/json/i);
        });

        it('sends empty array by default', async () => {
            const response = await request(server).get('/admins');

            expect(response.body).toEqual([]);
        });
    });

    describe('get /:id', () => {
        it('responds with status code 200', async () => {
            const response = await request(server).get('/admins/1');

            expect(response.status).toBe(200);
        });

        it('responds with json type', async () => {
            const response = await request(server).get('/admins/1');

            expect(response.type).toMatch(/json/i);
        });

        it('sends one admin by default', async () => {
            request(server)
            const response = await request(server).get('/admins/1');

            expect(response.body).toEqual([]);
        });
    });
});