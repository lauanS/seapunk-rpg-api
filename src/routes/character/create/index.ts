import { Request, Response } from 'express';
import { Service } from '@/services';
import { z } from 'zod';

export default class CreateCharacterRoute {
  constructor (
    private createCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    try {
      const bodyParsed = this.validate(req);
      const result = await this.createCharacterService.execute(bodyParsed);

      res.status(200).jsonp({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res.status(200).jsonp({ success: false, result: error });
    }
  }

  private validate (req: Request) : createCharacterParams {
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

      return bodyParsed.data;
    } catch (error) {
      throw 'Ocorreu um erro na validação';
    }
  }
}
