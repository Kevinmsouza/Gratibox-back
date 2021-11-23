/* eslint-disable no-undef */
import '../src/setup.js';
import faker from 'faker';
import supertest from 'supertest';
import { randomUUID } from 'crypto';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { userFactory } from '../src/factories/user.factory.js';

const fakeUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

const token = randomUUID();

const fakePlan = {
    planId: faker.datatype.number({ min: 1, max: 2 }),
    deliveryType: faker.datatype.number({ min: 1, max: 3 }),
    fullName: faker.name.findName(),
    postalCode: faker.address.zipCode('12312-123'),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    stateId: faker.datatype.number({ min: 1, max: 27 }),
    products: [2, 1, 3],
};

beforeAll(async () => {
    await userFactory(fakeUser);
    const userId = await connection.query('SELECT id FROM users WHERE email iLIKE $1;', [fakeUser.email]);
    await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [userId.rows[0].id, token]);
});

afterAll(async () => {
    await connection.query('TRUNCATE users CASCADE;');
    connection.end();
});

describe('POST /plans', () => {
    it('returns 201 for success', async () => {
        const result = await supertest(app)
            .post('/plans')
            .set('Authorization', `Bearer ${token}`)
            .send(fakePlan);
        expect(result.status).toEqual(201);
    });
    it('returns 409 for user already have a plan', async () => {
        const result = await supertest(app)
            .post('/plans')
            .set('Authorization', `Bearer ${token}`)
            .send(fakePlan);
        expect(result.status).toEqual(409);
    });
    it('returns 400 for invalid body', async () => {
        const result = await supertest(app)
            .post('/plans')
            .set('Authorization', `Bearer ${token}`)
            .send({ ...fakePlan, planId: 0 });
        expect(result.status).toEqual(400);
    });
});

describe('GET /plans', () => {
    it('returns 200 for success', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });
    it('returns 401 for no Autorization', async () => {
        const result = await supertest(app)
            .get('/plans');
        expect(result.status).toEqual(401);
    });
    it('returns 403 for invalid token', async () => {
        const result = await supertest(app)
            .get('/plans')
            .set('Authorization', 'Bearer invalid-token');
        expect(result.status).toEqual(403);
    });
});
