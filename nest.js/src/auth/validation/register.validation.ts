import * as Joi from 'joi';
export const registerValidation = Joi.object({
  name: Joi.string().min(6).max(15).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(6).max(20).required(),
  cpassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Password and {{#label}} does not match' }),
});
