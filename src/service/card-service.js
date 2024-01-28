import { validate } from "../validation/validation.js";
import {
  createcardValidation,
  getcardValidation,
  updatecardValidation,
  searchcardValidation,
} from "../validation/card-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const card = validate(createcardValidation, request);
  card.username = user.username;

  return prismaClient.card.create({
    data: card,
    select: {
      id: true,
      name: true,
      nik: true,
      tempatlahir: true,
      jeniskelamin: true,
      alamat: true,
      agama: true,
    },
  });
};

const get = async (user, cardId) => {
  cardId = validate(getcardValidation, cardId);

  const card = await prismaClient.card.findFirst({
    where: {
      username: user.username,
      id: cardId,
    },
    select: {
      name: true,
      nik: true,
      tempatlahir: true,
      jeniskelamin: true,
      alamat: true,
      agama: true,
    },
  });

  if (!card) {
    throw new ResponseError(404, "card is not found");
  }

  return card;
};

const update = async (user, request) => {
  const card = validate(updatecardValidation, request);

  const totalcardInDatabase = await prismaClient.card.count({
    where: {
      username: user.username,
      id: card.id,
    },
  });

  if (totalcardInDatabase !== 1) {
    throw new ResponseError(404, "card is not found");
  }

  return prismaClient.card.update({
    where: {
      id: card.id,
    },
    data: {
      name: card.name,
      nik: card.nik,
      tempatlahir: card.tempatlahir,
      jeniskelamin: card.jeniskelamin,
      alamat: card.alamat,
      agama: card.agama,
    },
    select: {
      id: true,
      name: true,
      nik: true,
      tempatlahir: true,
      jeniskelamin: true,
      alamat: true,
      agama: true,
    },
  });
};

const remove = async (user, cardId) => {
  cardId = validate(getcardValidation, cardId);

  const totalInDatabase = await prismaClient.card.count({
    where: {
      username: user.username,
      id: cardId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "card is not found");
  }

  return prismaClient.card.delete({
    where: {
      id: cardId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchcardValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [
    {
      username: user.username,
    },
  ];

  if (request.name) {
    filters.push({
      name: {
        contains: request.name,
      },
    });
  }
  // Add additional filters for other fields if needed

  const cards = await prismaClient.card.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.card.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: cards,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
