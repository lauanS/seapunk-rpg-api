import { Schema, model } from "mongoose";

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    // class: { type: String, required: true },
    // race: { type: String, required: true },
    // background: { type: String, required: true },
    // deity: { type: String, required: true },
}, {versionKey: false});

const Character = model("characters", CharacterSchema);

export default Character;