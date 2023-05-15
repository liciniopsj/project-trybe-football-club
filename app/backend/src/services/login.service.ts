import { ParamsDictionary } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import UserService from './user.service';
import { tokenGeneration } from '../utils/auth';
import IRes from '../interfaces/IRes';

export default class LoginService {
  static async login(payload: ParamsDictionary): Promise<IRes> {
    const { email, password } = payload;
    if (!email || !password) return { status: 400, message: 'All fields must be filled' };
    const emailRegex = email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
    if (!emailRegex || password.length < 6) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const user = await UserService.findOne(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 401, message: 'Invalid email or password' };
    }

    return { status: 200, token: { token: tokenGeneration(user.email) } };
  }

  static async findRole(payload: ParamsDictionary): Promise<IRes> {
    const { email } = payload;
    const user = await UserService.findOne(email);
    if (!user) return { status: 401, role: { message: 'User not found' } };
    return { status: 200, role: { role: user.role } };
  }
}
