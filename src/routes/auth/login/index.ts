import { Request, Response } from 'express';
import { Service } from '@/services/protocols';
import LoginAuthService from '@/services/auth/register';

export default class LoginAuthRoute {
  constructor (
    private service: Service = new LoginAuthService()
  ) {}

  public async controller (req: Request, res: Response): Promise<void> {
    const result = await this.service.execute(req.body);

    res.status(200).jsonp({ success: true, result: result });
  }
}
