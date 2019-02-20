const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

describe('The Schools route handlers', () => {
    afterEach(async () => {
        await db('schools').truncate();
    });

    describe('get /', () => {
        it('responds with status code 200', async () => {

        });
        
        it('responds with an array of schools', async () => {

        });
    });

    describe('get /:id', () => {
        it('responds with status code 200', async () => {

        });

        it('responds with status code 404 if the school does not exist', async () => {

        });
        
        it('responds with a single school object', async () => {

        });
    });

    describe('post /', () => {
        it('responds with status code 201', async () => {

        });

                
        it('responds with an array containing an id', async () => {

        });

        it('responds with status code 400 if the schoolName already exists', async () => {

        });

        it('responds with status code 422 if the schoolName is not provided', async () => {

        });

    });

    describe('put /:id', () => {
        it('responds with status code 201', async () => {

        });
    });

    describe('delete /:id', () => {
        it('responds with status code 202', async () => {

        });
    });
})