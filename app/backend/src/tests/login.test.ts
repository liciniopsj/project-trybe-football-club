import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as auth from '../utils/auth'; 
import UserModel from '../database/models/user.model';
import LoginService from '../services/login.service';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests for the login route', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  it('sucessful login returns a token', async () => {
    const mockedUserModel: UserModel = new UserModel({ id: 1, username: 'admin', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' });
    const mockedToken = { status: 200, token: { token: 'Th1s1s4T0k3n' } };

    sinon.stub(UserModel, 'findOne').resolves(mockedUserModel);
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(auth, 'tokenGeneration').returns('Th1s1s4T0k3n');

    const credentials = { email: 'admin@admin.com', password: 'secret_admin' };
    const serviceResponse = await LoginService.login(credentials);

    expect(serviceResponse).to.be.deep.equal(mockedToken);
  });

  it('Error route for login - invalid email', async () => {
    const mockedUserModel: UserModel = new UserModel({ id: 1, username: 'admin', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' });
    const mockedErrorMessage = { status: 401, message: 'Invalid email or password' };

    sinon.stub(UserModel, 'findOne').resolves(mockedUserModel);
    sinon.stub(auth, 'tokenGeneration').returns('Th1s1s4T0k3n');

    const credentials = { email: 'not-a-email', password: 'secret_admin' };
    const serviceResponse = await LoginService.login(credentials);

    expect(serviceResponse).to.be.deep.equal(mockedErrorMessage);
  });

  it('Error route for login - absent email', async () => {
    const mockedUserModel: UserModel = new UserModel({ id: 1, username: 'admin', role: 'admin', email: 'admin@admin.com', password: 'secret_admin' });
    const mockedErrorMessage = { status: 400, message: 'All fields must be filled' };

    sinon.stub(UserModel, 'findOne').resolves(mockedUserModel);
    sinon.stub(auth, 'tokenGeneration').returns('Th1s1s4T0k3n');

    const credentials = { email: '', password: '123456' };
    const serviceResponse = await LoginService.login(credentials);

    expect(serviceResponse).to.be.deep.equal(mockedErrorMessage);
  });

  it('Error route for login - no user', async () => {
    const mockedErrorMessage2 = { status: 401, message: 'Invalid email or password' };

    sinon.stub(UserModel, 'findOne').resolves(undefined);
    sinon.stub(auth, 'tokenGeneration').returns('Th1s1s4T0k3n');

    const credentials = { email: 'unknown@email.com', password: 'password123' };
    const serviceResponse = await LoginService.login(credentials);

    expect(serviceResponse).to.be.deep.equal(mockedErrorMessage2);
  });
});
