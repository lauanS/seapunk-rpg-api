import { Request, Response } from 'express';
import { Service } from '@/services/protocols';

export default class CreateCharacterRoute {
  constructor (
    private createCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const result = await this.createCharacterService.execute(req.body);

    res.status(200).jsonp({ success: true, result: result });
  }
}
