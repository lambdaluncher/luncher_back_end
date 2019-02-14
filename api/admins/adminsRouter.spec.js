const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');
const express = require('express');

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
});