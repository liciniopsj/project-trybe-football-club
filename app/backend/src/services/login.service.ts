import { ParamsDictionary } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import UserService from './user.service';
import { tokenGeneration } from '../utils/auth';

const userFieldsRequired = { status: 400, message: 'All fields must be filled' };
const badInput = { status: 401, message: 'Invalid email or password' };

export default class LoginService {
  static async login(payload: ParamsDictionary): Promise<object | undefined> {
    const { email, password } = payload;
    const emailRegex = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);

    if (!email || !password) return userFieldsRequired;
    if (!emailRegex || password.length < 6) {
      return badInput;
    }

    const user = await UserService.findOne(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return badInput;
    }

    return { status: 200, token: { token: tokenGeneration(user.email) } };
  }

  static async findRole(payload: ParamsDictionary): Promise<object | undefined> {
    const { email } = payload;
    const user = await UserService.findOne(email);
    if (!user) return { status: 401, role: { message: 'User not found' } };
    return { status: 200, role: { role: user.role } };
  }
}
