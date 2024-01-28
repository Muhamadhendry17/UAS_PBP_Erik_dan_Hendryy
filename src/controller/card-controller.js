import cardService from "../service/card-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await cardService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const cardId = req.params.cardId;
    const result = await cardService.get(user, cardId);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const cardId = req.params.cardId;
    const request = { ...req.body, id: cardId };

    const result = await cardService.update(user, request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const cardId = req.params.cardId;

    await cardService.remove(user, cardId);
    res.status(200).json({ data: "OK" });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      nik: req.query.nik,
      tempatlahir: req.query.tempatlahir,
      jeniskelamin: req.query.jeniskelamin,
      alamat: req.query.alamat,
      agama: req.query.agama,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await cardService.search(user, request);
    res.status(200).json({ data: result.data, paging: result.paging });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
