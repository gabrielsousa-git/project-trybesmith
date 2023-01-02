import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import Login from '../interfaces/login.interface';

const jwtConfig = { expiresIn: '7d' };

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async login(username: Login['username'], password: Login['password'])
    : Promise<string | any> {
    const logedUser = await this.model.findOne(username, password);

    if (logedUser.length === 0) {
      return { message: 'Username or password invalid' };
    }

    const token = jwt.sign({ data: logedUser }, 'secret', jwtConfig);

    return { token };
  }
}