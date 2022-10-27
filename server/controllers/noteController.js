import Note from "../models/Note.js";
import httpStatus from "http-status";
import { Types } from "mongoose";
import Joi from "joi";
import {
  storeNoteValidate,
  updateNoteValidate,
} from "../validations/noteValidate.js";

/** get all notes */
export const index = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(httpStatus.OK).json(notes);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

/** show note */
export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id });
    if (!note)
      return res.status(httpStatus.NOT_FOUND).json({ error: "Note not found" });
    res.status(httpStatus.OK).json(note);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

/** update note */
export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = updateNoteValidate.validate(req.body);

    const { title, body } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      {
        title,
        body,
      },
      { new: true }
    );

    res.status(httpStatus.OK).json(note);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

/** store new note */
export const store = async (req, res) => {
  try {
    const { error } = storeNoteValidate.validate(req.body);

    if (error) return res.send(error.details[0].message);

    const { title, body } = req.body;

    const note = await Note.create({ title, body });
    res.status(httpStatus.CREATED).json(note);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

/** trash note */
export const trash = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Invalid ID'
    })




    const deletedID = await Note.findByIdAndDelete(id);
    res.status(httpStatus.OK).json({
      message: "Note deleted",
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
