import request from 'supertest';

import app from '../src/app';
import { connect, disconnect } from '../scripts/mongo-setup';

beforeAll(connect);
afterAll(disconnect);

describe('Contact Spec', () => {
  test('Querying a contact with a non-uuid id results in an error', async () => {
    const response = await request(app).get('/api/contact/non-existent');

    expect(response.status).toBe(400);
  });

  test('Querying a contact that does not exist results in an error', async () => {
    const response = await request(app).get(
      '/api/contact/3c78f8af-afd1-4291-8e3f-6b16bbed0672'
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Contact not found' });
  });

  test('it adds a contact with a contact ID', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        firstName: 'Jane',
        phone: '+2348060123456'
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        firstName: 'Jane',
        phone: '+2348060123456'
      })
    );
  });

  test('Users should not be able to control autogenerated fields', async () => {
    const contactData = {
      id: '2b98aa81-26c4-4bd3-8a65-dbedbe41a556',
      createdAt: '2020-01-21T10:49:00.000Z',
      updatedAt: '2020-01-21T10:49:00.000Z',
      firstName: 'John',
      phone: '+234800000000'
    };

    const response = await request(app)
      .post('/api/contact')
      .send(contactData);

    expect(response.status).toBe(201);

    expect(response.body.data.id).not.toBe(contactData.id);
    expect(response.body.data.createdAt).not.toBe(contactData.createdAt);
    expect(response.body.data.updatedAt).not.toBe(contactData.updatedAt);
  });

  test('Creating a contact without required fields results in an error', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        lastName: 'Jane',
        email: 'jane@example.com'
      });

    expect(response.status).toBe(400);
  });
});
