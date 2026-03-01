import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import * as authController from '../Controller/authController.js';
import User from '../Model/userModel.js';
import { generateToken } from '../Security/jwt-utils.js';

jest.mock('../Model/userModel.js', () => ({
  findOne: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('../Security/jwt-utils.js', () => ({
  generateToken: jest.fn(() => 'fake-token'),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {
  afterEach(() => jest.clearAllMocks());

  it('registers a new user', async () => {
    const req = { body: { fullName: 'Test', email: 'test@example.com', password: 'password', role: 'student' } };
    const res = mockResponse();
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ id: 1, ...req.body });

    await authController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User registered successfully' }));
  });

  it('logs in a user', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = mockResponse();
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com', password: 'hashedPassword', fullName: 'Test', role: 'student' });
    bcrypt.compare.mockResolvedValue(true);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Login successful',
      data: expect.objectContaining({ email: 'test@example.com', access_token: 'fake-token' })
    }));
  });

  it('handles login with wrong password', async () => {
    const req = { body: { email: 'test@example.com', password: 'wrong' } };
    const res = mockResponse();
    User.findOne.mockResolvedValue({ password: 'hashedPassword' });
    bcrypt.compare.mockResolvedValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Incorrect password' });
  });
});