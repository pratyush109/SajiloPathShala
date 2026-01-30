const authController = require('../Controller/authController');
const User = require('../Model/userModel');


jest.mock('../Model/userModel', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));
 
describe('Auth Controller', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    }});

    it('should register a new user', async () => {
        const req = {
            body: {
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'student',
            },
        };
        const res = mockResponse();
        User.create.mockResolvedValue(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', user: req.body });
    });

    it('should login a user', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = mockResponse();
        User.findAll.mockResolvedValue([{
            id: 1,
            fullName: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            role: 'student',
        }]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', user: expect.objectContaining({ email: 'test@example.com' }) });
    });

    it('should handle login with invalid credentials', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'wrongpassword',
            },
        };
        const res = mockResponse();
        User.findAll.mockResolvedValue([]);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    it('should handle errors during registration', async () => {
        const req = {
            body: {
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'student',
            },
        };
        const res = mockResponse();
        const errorMessage = 'Database error';
        User.create.mockRejectedValue(new Error(errorMessage));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error registering user', error: errorMessage });
    });

    it('should handle errors during login', async () => {
        const req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
            },
        };
        const res = mockResponse();
        const errorMessage = 'Database error';
        User.findAll.mockRejectedValue(new Error(errorMessage));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error logging in', error: errorMessage });
    });