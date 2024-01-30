import { Request, Response } from 'express';
import { iCreateUserParams } from '@/@types/user';
import { BadRequestError } from '@/utils/ErrorHandler';
import { Service } from '@/services/protocols';
import { z } from 'zod';

export default class createUserRoute {
  constructor (
    private createUserService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const bodyParsed = this.validate(req);
    const result = await this.createUserService.execute(bodyParsed);

    res.status(200).jsonp({ success: true, result: result });
  }

  private validate (req: Request): iCreateUserParams {
    const schemaValidator = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string()
    });

    const bodyParsed = schemaValidator.safeParse(req.body);

    if (!bodyParsed.success) {
      throw new BadRequestError('As informações fornecidas são inválidas');
    }

    return bodyParsed.data;
  }
}
