import { Request, Response, NextFunction } from 'express';

export default class CreateCharacterRoute {
  static controller (_req: Request, res: Response): void {
    res.status(200).jsonp({ success: true, result: 'Personagem cadastrado' });
  }

  static validation (req: Request, res: Response, next: NextFunction): void {
    try {
      const characterInfo = req.body;

      console.log(characterInfo);

      next();
    } catch (error) {
      console.log('Ocorreu um erro:', error);
      res.status(200).jsonp({ success: false, result: 'Ocorreu um erro' });
    }
  }
}
