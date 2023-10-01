import express from "express";
import CharacterController from "../controllers/characterController";

const routes = express.Router();

routes.get("/characters", CharacterController.getCharacters);
// routes.post("/characters", CharacterController.createCharacter);

export default routes;