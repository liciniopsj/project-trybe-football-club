import Users from '../database/models/user.model';

export default class UserService {
  static async findOne(email: string): Promise<Users | null> {
    const data = await Users.findOne({ where: { email } });
    if (!data) return null;
    return data;
  }
}
