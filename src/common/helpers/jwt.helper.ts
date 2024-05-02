import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationException, ServerErrorException } from '../exceptions';
// import { JwtConstant } from '../constants/jwt.constant';
@Injectable()
export class JwtHelper {
  constructor(private jwtService: JwtService) {}
  async signToken(payload: any): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new ServerErrorException('lỗi server');
    }
  }
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new AuthorizationException(error['message']);
    }
  }
}
