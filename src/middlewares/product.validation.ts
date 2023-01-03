import { Request, Response, NextFunction } from 'express';
import statusCodes from '../statusCodes';
import Product from '../interfaces/product.interface';

const properties = ['name', 'amount'];

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

function validateValuesTypes(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (typeof value !== 'string') {
      return [false, property];
    }
  }
  return [true, null];
}

function validateValuesLength(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 3) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationProductProperties(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateProperties(product);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }

  next();
}

function validationProductValues(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  let [valid, property] = validateValues(product);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).send({
      message: `"${property}" is required`,
    });
  }

  [valid, property] = validateValuesLength(product);

  if (!valid) {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" length must be at least 3 characters long`,
    });
  }

  next();
}

function validationProductTypes(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateValuesTypes(product);

  if (!valid) {
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
      message: `"${property}" must be a string`,
    });
  }

  next();
}

export default { validationProductProperties, validationProductValues, validationProductTypes };