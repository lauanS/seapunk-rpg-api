import { Request, Response } from 'express';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class FindByIdCharacterRoute {
  constructor (
    private findByIdCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    try {
      const bodyParsed = this.validate(req);
      const result = await this.findByIdCharacterService.execute(bodyParsed);

      res.status(200).jsonp({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res.status(200).jsonp({ success: false, result: error });
    }
  }

  private validate (req: Request): { id: string } {
    try {
      const schemaValidator = z.object({
        id: z.string()
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
