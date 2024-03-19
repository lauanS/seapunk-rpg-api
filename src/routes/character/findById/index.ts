import { Request, Response } from 'express';
import { Service } from '@/services/protocols';

export default class FindByIdCharacterRoute {
  constructor (
    private findByIdCharacterService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const result = await this.findByIdCharacterService.execute({ ...req.params, ...req.body });

    res.status(200).jsonp({ success: true, result: result });
  }
}
