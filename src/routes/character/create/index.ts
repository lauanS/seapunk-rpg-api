import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export default class CreateCharacterRoute {
  static controller (req: Request, res: Response): void {
    res.status(200).jsonp({ success: true, result: req.body });
  }

  static validation (req: Request, res: Response, next: NextFunction): void {
    try {
      const schemaValidator = z.object({
        name: z.string(),
        race: z.string(),
        class: z.array(z.object(
          {
            name: z.string(),
            level: z.number()
          }
        )),
        origin: z.string(),
        deity: z.string(),
        level: z.number(),
      });

      const bodyParsed = schemaValidator.safeParse(req.body);

      if (!bodyParsed.success) {
        throw 'As informações fornecidas são inválidas';
      }

      next();
    } catch (error) {
      res.status(200).jsonp({ success: false, result: typeof error === 'string' ? error : 'Ocorreu um erro' });
    }
  }
}
