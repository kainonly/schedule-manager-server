import * as V from 'joi';
import { ValidatePipe } from './common/validate.pipe';

const Validate = (schema: any) => new ValidatePipe(schema);

const GetValidate = (schema?: any) => {
  return Validate(Object.assign({
    id: V.string().when('where', {
      is: V.required(),
      otherwise: V.required(),
    }),
    where: V.object(),
  }, schema));
};

const ListsValidate = (schema?: any) => {
  return Validate(Object.assign({
    where: V.object(),
    page: {
      limit: V.number().required(),
      index: V.number().required(),
    },
  }, schema));
};

const EditValidate = (schema?: any) => {
  return Validate(Object.assign({
    id: V.string().required(),
  }, schema));
};

const DeleteValidate = (schema?: any) => {
  return Validate(Object.assign({
    id: V.string().required(),
  }, schema));
};

export { Validate, GetValidate, ListsValidate, EditValidate, DeleteValidate, V };
