import express from "express";
import { Request, Response } from "express";
import { Express } from "express-serve-static-core";
import character from "./charactersRoutes";

const routes = (app: Express) => {
    app.route("/")
        .get((req: Request, res: Response) => res.status(200).send("Seapunk RPG"));    
    app.use(express.json(), character);
}

export default routes;