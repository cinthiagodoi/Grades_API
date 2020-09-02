import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

import mongoose from "mongoose";

const Grade = mongoose.model("grades", db.grade);

const create = async (req, res) => {
  const newGrade = new Grade(req.body);

  try {
    await newGrade.save(newGrade);
    res.send({ message: "Grade inserido com sucesso" });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  try {
    const grades = await Grade.find(condition);
    console.log(grades);
    return res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  logger.info(`GET /grade - ${id}`);
  try {
    const data = await Grade.findById({ _id: id });

    if (!data) {
      return res.send({ message: "Nenhuma grade encontrada" });
    }
    return res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    Grade.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          res.send(err);
        }
        res.json(data);
      }
    );
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a Grade id: " + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    Grade.findOneAndRemove({ _id: id }, (err, data) => {
      if (err) {
        res.send(err);
      }
      res.send({ message: `Grade de id ${id} deletada` });
    });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o Grade id: " + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  logger.info(`DELETE /grade`);
  const data = await Grade.deleteMany();
  try {
    return res.send({ message: "Grades excluidas" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos as Grades" });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
