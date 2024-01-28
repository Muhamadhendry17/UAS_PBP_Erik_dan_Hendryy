import Joi from "joi";

const createcardValidation = Joi.object({
  name: Joi.string().max(100).required(),
  nik: Joi.string().max(100).required(),
  tempatlahir: Joi.string().max(100).required(),
  jeniskelamin: Joi.string().max(100).optional(),
  alamat: Joi.string().max(100).required(),
  agama: Joi.string().max(1000).required(),
});

const getcardValidation = Joi.number().positive().required();

const updatecardValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(100).required(),
  nik: Joi.string().max(100).required(),
  tempatlahir: Joi.string().max(100).required(),
  jeniskelamin: Joi.string().max(100).optional(),
  alamat: Joi.string().max(100).required(),
  agama: Joi.string().max(1000).required(),
});

const searchcardValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().max(100).optional(),
  nik: Joi.string().max(100).optional(),
  tempatlahir: Joi.string().max(100).optional(),
  jeniskelamin: Joi.string().max(100).optional(),
  alamat: Joi.string().max(100).optional(),
  agama: Joi.string().max(1000).optional(),
});

const removecardValidation = Joi.object({
  id: Joi.number().positive().required(),
});

export {
  createcardValidation,
  getcardValidation,
  updatecardValidation,
  searchcardValidation,
  removecardValidation,
};
