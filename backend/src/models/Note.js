import mongoose from "mongoose";
// create schema for Note (singular and capitalized)
// then create a model from the schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {timestamps: true}); // default createdAt and updatedAt fields will be added by mongodb

const Note = mongoose.model("Note", noteSchema);

export default Note; 