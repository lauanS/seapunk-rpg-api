import passport from 'passport';
import type { VerifiedCallback, StrategyOptions } from 'passport-jwt';
import type { JwtPayload } from './crypto';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import { IUserRepository } from '@/@types/user';

export default (userRepository: IUserRepository) => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  };

  passport.use('jwt', new JwtStrategy(opts, async function(jwtPayload: JwtPayload, done: VerifiedCallback) {
    const user = await userRepository.findByEmail(jwtPayload.email);

    if (!user) {
      return done(null, false);
    }

    return done(null, { id: user._id, email: user.email, name: user.name });
  }));
};
