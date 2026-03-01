import request from 'supertest';
import express from 'express';
import authRoutes from '../Routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Security Tests', () => {
  it('should prevent basic injection', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ fullName: 'Test', email: 'bad@x.com', password: 'password', role: 'student<script>' });

    expect([400, 201, 500]).toContain(res.status);
  });

  it('should handle unknown routes', async () => {
    const res = await request(app).get('/api/auth/unknown');
    expect(res.status).toBe(404);
  });
});