import { Schema, model, version } from "mongoose";

const characterSchema = new Schema({
    id: { type: Schema.Types.ObjectId},
    name: { type: String, required: true },
    // class: { type: String, required: true },
    // race: { type: String, required: true },
    // background: { type: String, required: true },
    // deity: { type: String, required: true },
}, {versionKey: false});

const character = model("Characters", characterSchema);

export default character;