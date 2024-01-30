import { iCreateCharacterParams } from '@/@types/character';
import { Request, Response } from 'express';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class CreateCharacterRoute {
  constructor (
    private createCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const bodyParsed = this.validate(req);
    const result = await this.createCharacterService.execute(bodyParsed);

    res.status(200).jsonp({ success: true, result: result });
  }

  private validate (req: Request) : iCreateCharacterParams {
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
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
