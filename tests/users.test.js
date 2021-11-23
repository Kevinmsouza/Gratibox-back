/* eslint-disable no-undef */
import '../src/setup.js';
import faker from 'faker';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

const fakeUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

afterAll(async () => {
    await connection.query('TRUNCATE users CASCADE;');
    connection.end();
});

describe('POST /sign-up', () => {
    it('returns 201 for success', async () => {
        const result = await supertest(app)
            .post('/sign-up')
            .send(fakeUser);
        expect(result.status).toEqual(201);
    });
    it('returns 409 for email unavalible', async () => {
        const result = await supertest(app)
            .post('/sign-up')
            .send(fakeUser);
        expect(result.status).toEqual(409);
    });
    it('returns 400 for invalid body', async () => {
        const result = await supertest(app)
            .post('/sign-up')
            .send({ ...fakeUser, username: '' });
        expect(result.status).toEqual(400);
    });
});

describe('POST /login', () => {
    it('returns 200 for success', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: fakeUser.email, password: fakeUser.password });
        expect(result.status).toEqual(200);
    });
    it('returns 400 for invalid body', async () => {
        const result = await supertest(app)
            .post('/login')
            .send({ email: fakeUser.email, password: '' });
        expect(result.status).toEqual(400);
    });
});
