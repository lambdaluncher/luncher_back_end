const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

let token; 

beforeAll(async () => {
    const response = await request(server)
        .post('/admins/register')
        .send({ 
            username: 'testusername',
            password: 'password'
        });
});

describe('The Schools route handlers', () => {

    beforeEach(async () => {
        const response = await request(server)
            .post('/admins/login')
            .send({
                username: 'testusername',
                password: 'password'
            });
        token = response.body.token;
    });
    
    afterEach(async () => {
        await db('schools').truncate();
    });

    describe('get /', () => {
        it('responds with status code 200', async () => {
            await request(server).post('/schools/').set('Authorization', token).send({schoolName: 'Supertest School'});
            const response = await request(server).get('/schools');

            expect(response.status).toBe(200);
        });
    });

    describe('get /:id', () => {
        it('responds with status code 200', async () => {
            await request(server).post('/schools/').set('Authorization', token).send({schoolName: 'Supertest School'});
            const response = await request(server).get('/schools/1').set('Authorization', token);

            expect(response.status).toBe(200);
        });

        it('responds with status code 404 if the school does not exist', async () => {
            const response = await request(server).get('/schools/99').set('Authorization', token);

            expect(response.status).toBe(404);
        });
    });

    describe('post /', () => {
        it('responds with status code 201', async () => {
            const response = await request(server).post('/schools/').set('Authorization', token).send({schoolName: 'Supertest School'});

            expect(response.status).toBe(201);
        });

        it('responds with status code 422 if the schoolName is not provided', async () => {
            const response = await request(server).post('/schools/').set('Authorization', token).send({school: 'Supertest School'});

            expect(response.status).toBe(422);
        });

    });

    describe('put /:id', () => {
        it('responds with status code 201', async () => {
            await request(server).post('/schools/').set('Authorization', token).send({schoolName: 'Supertest School'});
            const response = await request(server).put('/schools/1').set('Authorization', token).send({schoolName: 'Supertest School Updated'});

            expect(response.status).toBe(201);
        });
    });

    describe('delete /:id', () => {
        it('responds with status code 202', async () => {
            await request(server).post('/schools/').set('Authorization', token).send({schoolName: 'Supertest School'});
            const response = await request(server).del('/schools/1').set('Authorization', token);

            expect(response.status).toBe(202);
        });
    });
})