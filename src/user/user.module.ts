import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from 'src/common/helpers/jwt.helper';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    ProductModule,
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService, JwtHelper],
  exports: [UserRepository, JwtHelper],
})
export class UserModule {}
