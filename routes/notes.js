import express from "express";
import { getNotes, createNote, getNote, updateNote, deleteNote, pinNote, unpinNote } from "../controllers/notes.js";

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);
router.patch('/:id/pin', pinNote);
router.patch('/:id/unpin', unpinNote);

export default router;