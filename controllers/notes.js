import Note from "../models/Note.js";
import mongoose from "mongoose";
import e from "express";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        return res.status(200).json(notes);
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message });
    }
};

export const createNote = async (req, res) => {
    const note = req.body;

    const newNote = new Note(note);

    try {
        await newNote.save();
        return res.status(201).json(newNote);
    }
    catch (error) {
        console.error(error);
        return res.status(409).json({ error: error.message });
    }
};

export const getNote = async (req, res) => {
    const id = req.params.id;

    // Validate object id
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid note id." });

    try {
        const notes = await Note.findById(id);

        return res.status(200).json(notes);
    }
    catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message });
    }
};

export const updateNote = async (req, res) => {
    const id = req.params.id;
    const note = req.body;

    // Validate object id
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid note id." });

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { ...note, lastModifiedAt: new Date() }, { new: true });

        if (updatedNote) {
            // Returned document after update
            return res.status(200).json(updatedNote);
        }
        else {
            // Returned null after update
            return res.status(404).json({ error: "Note not found." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const deleteNote = async (req, res) => {
    const id = req.params.id;

    // Validate object id
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid note id." });

    try {
        const deletedNote = await Note.findByIdAndRemove(id);
        if (deletedNote) {
            return res.status(200).json({ status: "Note deleted successfully." });
        }
        else {
            return res.status(404).json({ error: "No note found." });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const pinNote = async (req, res) => {
    const id = req.params.id;

    // Validate object id
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid note id." });

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { pinned: true }, { new: true });

        if (updatedNote) {
            // Returned document after update
            return res.status(200).json(updatedNote);
        }
        else {
            // Returned null after update
            return res.status(404).json({ error: "Note not found." });
        }
    }
    catch (error) {

        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const unpinNote = async (req, res) => {
    const id = req.params.id;

    // Validate object id
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid note id." });

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { pinned: false }, { new: true });

        if (updatedNote) {
            // Returned document after update
            return res.status(200).json(updatedNote);
        }
        else {
            // Returned null after update
            return res.status(404).json({ error: "Note not found." });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};