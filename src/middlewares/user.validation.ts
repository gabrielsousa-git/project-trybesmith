import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';
import Product from '../interfaces/product.interface';

const properties = ['username', 'vocation', 'level', 'password'];
// const userNameAndVocation = ['username', 'vocation'];
// const level = ['level'];
// const password = ['password'];

function validateProperties(product: Product): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateValuesTypesStrings(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  entries.splice(2, 1);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (typeof value !== 'string') {
      return [false, property];
    }
  }
  return [true, null];
}

function validateValuesTypeNumber(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  const [property, value] = entries[2];
  if (typeof value !== 'number') {
    return [false, property];
  }

  return [true, null];
}

function validateUsernameAndVocationLength(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  entries.splice(2, 1);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 3) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateLevelMin(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  const [property, value] = entries[2];
  if (Math.floor(value) <= 0) {
    return [false, property];
  }
  return [true, null];
}

function validatePasswordLength(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  const [property, value] = entries[3];
  if (value.length < 8) {
    return [false, property];
  }
  return [true, null];
}

function validationUserProperties(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateProperties(product);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }

  next();
}

function validationUserValues(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateValues(product);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }

  next();
}

function validationUserTypes(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  let [valid, property] = validateValuesTypesStrings(product);

  if (!valid) {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" must be a string`,
    });
  }

  [valid, property] = validateValuesTypeNumber(product);

  if (!valid) {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" must be a number`,
    });
  }

  next();
}

function validationUserLengths(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  let [valid, property] = validateUsernameAndVocationLength(product);
  
  if (!valid && property !== 'password') {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" length must be at least 3 characters long`,
    });
  }

  [valid, property] = validatePasswordLength(product);

  if (!valid && property === 'password') {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" length must be at least 8 characters long`,
    });
  }
  
  next();
}

function validationUserLevelMin(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateLevelMin(product);

  if (!valid) {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" must be greater than or equal to 1`,
    });
  }

  next();
}

export default {
  validationUserProperties,
  validationUserValues,
  validationUserTypes,
  validationUserLengths,
  validationUserLevelMin };