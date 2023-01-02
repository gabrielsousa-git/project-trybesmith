import { Request, Response } from 'express';
import statusCodes from '../statusCodes';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const { token, message } = await this.loginService.login(username, password);

    if (message) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message });
    }

    return res.status(statusCodes.OK).json({ token });
  };
}