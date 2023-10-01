import { Schema, model } from "mongoose";
import { UserSchema } from "./User";

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    // class: { type: String, required: true },
    // race: { type: String, required: true },
    // background: { type: String, required: true },
    // deity: { type: String, required: true },
    user: UserSchema,
}, {versionKey: false});

const Character = model("characters", CharacterSchema);

export default Character;