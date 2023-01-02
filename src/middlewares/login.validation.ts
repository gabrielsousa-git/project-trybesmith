import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';
import Login from '../interfaces/login.interface';

const properties = ['username', 'password'];

function validateProperties(login: Login): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(login, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(login: Login): [boolean, string | null] {
  const entries = Object.entries(login);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationLogin(req: Request, res: Response, next: NextFunction) {
  const login: Login = req.body;

  let [valid, property] = validateProperties(login);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }
  [valid, property] = validateValues(login);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }

  next();
}

export default validationLogin;