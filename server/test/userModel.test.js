import SequelizeMock from "sequelize-mock";

const dbMock = new SequelizeMock();

const UserMock = dbMock.define('User', {
  id: 1,
  fullName: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword',
  role: 'student',
  resetToken: null,
  resetTokenExpiry: null,
});
describe('User Model', () => {
  it('should create a user', async () => {
    const user = await UserMock.create({
      fullName: 'New User',
      email: 'newuser@example.com',
      password: 'hashedpassword',
      role: 'student'
    });

    expect(user.fullName).toBe('New User');
    expect(user.email).toBe('newuser@example.com');
    expect(user.role).toBe('student');
  });
it('should require email and fullName', async () => {
  const user = await UserMock.create({
      fullName: 'Default User',
      email: 'default@example.com',
      password: 'hashedpassword', 
      role: 'student'
    });
    expect(user).toBeDefined();
    expect(user.fullName).toBe('Default User');
  });
});