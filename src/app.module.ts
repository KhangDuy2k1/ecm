import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Endpoins } from './common/constants/endpoins.constant';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
// import { UserService } from './user/user.service';
const url: string = process.env.DB_URI;
@Module({
  imports: [
    MongooseModule.forRoot(url, {
      connectionFactory: (connection: any) => {
        connection.on('connected', () => {
          console.log('is connected');
        });
        connection.on('disconnected', () => {
          console.log('DB disconnected');
        });
        connection.on('error', (error: any) => {
          console.log('DB connection failed! for error: ', error);
        });
        connection._events.connected();
        return connection;
      },
    }),
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        `user/${Endpoins.ADD_TO_CART}`,
        `user/${Endpoins.ADD_TO_CART}`,
        `user/${Endpoins.GET_ALL_PRODUCT_CART}`,
        `order/${Endpoins.ORDER}`,
        `order/${Endpoins.GET_ALL_ORDER}`,
      );
  }
}
