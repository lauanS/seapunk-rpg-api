import { Request, Response } from 'express';
import { Service } from '@/services/protocols';

export default class ListCharacterRoute {
  constructor (
    private service: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    try {
      const result = await this.service.execute();

      res.status(200).jsonp({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res.status(200).jsonp({ success: false, result: error });
    }
  }
}
