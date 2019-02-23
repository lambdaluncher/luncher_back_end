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

            expect(response.body.id).toEqual(1)
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

        it('responds with status code 422 when username already exists in database', async () => {

        });

        it('responds with a token', async () => {
            const response = await request(server).post('/admins/register').send({username: 'username', password: 'password'});

            expect(response.body.token).toBeDefined();
        });
    });

    describe('post /admins/login', () => {
        beforeEach(async () => {
            await request(server).post('/admins/register').send({username: 'username', password: 'password'});
        });

        it('responds with status code 201', async () => {
            const response = await request(server).post('/admins/login').send({username: 'username', password: 'password'});

            expect(response.status).toBe(201);
        });

        it('responds with status code 422 when body is missing', async () => {
            const response = await request(server).post('/admins/login').send({username: 'username'});

            expect(response.status).toBe(422);
        });

        it('responds with status code 401 when username is incorrect', async () => {
            const response = await request(server).post('/admins/login').send({username: 'wrongUsername', password: 'password'});

            expect(response.status).toBe(401);
        });

        it('responds with status code 401 when password is incorrect', async () => {
            const response = await request(server).post('/admins/login').send({username: 'username', password: 'wrongPassword'});

            expect(response.status).toBe(401);
        });

        it('sends a token', async () => {
            const response = await request(server).post('/admins/login').send({username: 'username', password: 'password'});

            expect(response.body.token).toBeDefined();
        });
    });
});