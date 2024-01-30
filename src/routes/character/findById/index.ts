import { Request, Response } from 'express';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class FindByIdCharacterRoute {
  constructor (
    private findByIdCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const bodyParsed = this.validate(req);
    const result = await this.findByIdCharacterService.execute(bodyParsed);

    res.status(200).jsonp({ success: true, result: result });
  }

  private validate (req: Request): { id: string } {
    const schemaValidator = z.object({
      id: z.string()
    });

    const bodyParsed = schemaValidator.safeParse(req.body);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
