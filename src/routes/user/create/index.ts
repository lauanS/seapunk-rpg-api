import { Request, Response } from 'express';
import { Service } from '@/services/protocols';

export default class CreateUserRoute {
  constructor (
    private createUserService: Service
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const result = await this.createUserService.execute(req.body);

    res.status(200).jsonp({ success: true, result: result });
  }
}
