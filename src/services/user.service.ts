import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';

// const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '7d' };

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    const newUser = this.model.create(user);

    delete (await newUser).password;
    // const { password: _, ...userWithoutPassword } = newUser;
    const token = jwt.sign({ data: newUser }, 'secret', jwtConfig);

    return token;
  }
}