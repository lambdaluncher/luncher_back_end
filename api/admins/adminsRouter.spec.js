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
            await request(server).post('/admins/register').send({username: 'username', password: 'password'});
            const response = await request(server).get('/admins/1');

            expect(response.status).toBe(200);
        });

        it('responds with json type', async () => {
            await request(server).post('/admins/register').send({username: 'username', password: 'password'});
            const response = await request(server).get('/admins/1');

            expect(response.type).toMatch(/json/i);
        });

        it('sends one admin by default', async () => {
            await request(server).post('/admins/register').send({username: 'username', password: 'password'});
            const response = await request(server).get('/admins/1');

            expect(response.body).toEqual( {"email": null, "firstName": null, "id": 1, "lastName": null, "password": "$2a$14$qoISKfveO9.FhKbCkSm9Jew370wn3aSTkwDl2C0uP9UZEYPiSVRDy", "type": null, "username": "username",});
        });
    });

    describe('post /admins/register', () => {
        it('responds with status code 201', async () => {
            const response = await request(server).post('/admins/register').send({username: 'username', password: 'password'});

            expect(response.status).toBe(201);
        });

        it('responds with status code 422 when body is missing required data', async () => {
            const response = await request(server).post('/admins/register').send({username: 'username'});

            expect(response.status).toBe(422);
        });

        it('responds with an array containing a new id', async () => {
            const response = await request(server).post('/admins/register').send({username: 'username', password: 'password'});

            expect(response.body).toEqual([1]);
        });
    });
});