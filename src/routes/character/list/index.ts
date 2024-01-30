import { Request, Response } from 'express';
import { Service } from '@/services/protocols';

export default class ListCharacterRoute {
  constructor (
    private service: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const result = await this.service.execute();

    res.status(200).jsonp({ success: true, result: result });
  }
}
