const Joi = require('joi');

function validateStringRequired() {
  return Joi.string().required();
}

function validateString() {
  return Joi.string();
}

function validateNumber() {
  return Joi.number().integer().required();
}

const emailVelidate = () => {
  return validateString().email({
    minDomainSegments: 2,
    tlds: {allow: ['com', 'net', 'vn']},
  });
};

export const signUpWithEmailValidateSchema = Joi.object({
  user_name: validateStringRequired().min(3),
  token_firebase: validateStringRequired(),
});

export const signInWithSocialValidateSchema = Joi.object({
  token_firebase: validateStringRequired(),
});

export const signInValidateSchema = Joi.object({
  email: emailVelidate(),
  password: validateStringRequired().min(6),
});

export const sendVerificationCodeValidateSchema = Joi.object({
  email: emailVelidate(),
});

export const verifyCodeSchema = Joi.object({
  code: validateNumber(),
});

export const refreshTokenValidateSchema = Joi.object({
  refresh_token: validateStringRequired(),
});

export const profileValidateSchema = Joi.object({
  id: validateStringRequired(),
});

export const accountLinkSchema = Joi.object({
  provider_data: Joi.object().required(),
  id: validateStringRequired(),
});

export const accountUnLinkSchema = Joi.object({
  provider_id: validateStringRequired(),
  id: validateStringRequired(),
});

export const updateAvatarSchema = Joi.object({
  id: validateStringRequired(),
});

export const checkAccountValidateSchema = Joi.object({
  provider_id: validateStringRequired(),
  email: validateStringRequired(),
});

export const deleteAccountValidateSchema = Joi.object({
  id: validateStringRequired(),
});
