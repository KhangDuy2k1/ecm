import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthorizationException } from 'src/common/exceptions';
import { JwtHelper } from 'src/common/helpers/jwt.helper';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserRepository } from 'src/user/user.repository';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtHelper: JwtHelper,
    private userRepository: UserRepository,
  ) {}
  private checkStartBearer(str: string): boolean {
    return str.startsWith('Bearer');
  }
  private getToken(str: string): string | null {
    return str.split(' ')[1];
  }
  private getAuthorData(req: Request): any {
    return req['headers']['authorization'];
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const authorData: string = this.getAuthorData(req);
    const checkStartBearer: boolean = this.checkStartBearer(authorData);
    if (!checkStartBearer)
      throw new AuthorizationException('phải bắt đầu bằng bearer');
    const token: string = this.getToken(authorData);
    if (!token) throw new AuthorizationException('token chưa được gủi lên');
    const payload: any = await this.jwtHelper.verifyToken(token);
    const user: IUser = await this.userRepository.findById(payload.id);
    req['user'] = user;
    next();
  }
}
export class VerifyAdminMiddleware implements NestMiddleware {
  private checkRole(role: string): boolean {
    return role === 'admin';
  }
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const role: string = req['user']['role'];
    const checkRole: boolean = this.checkRole(role);
    if (!checkRole) throw new ForbiddenException('Bạn không phải admin');
    next();
  }
}
