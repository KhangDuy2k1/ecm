import { ConflictException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { BaseService } from 'src/base.service';
import { UserRepository } from './user.repository';
import { LoginDto } from './dtos/login.dto';
import { JwtHelper } from 'src/common/helpers/jwt.helper';
import { ProductRepository } from 'src/product/product.repository';
type Id = Types.ObjectId;
@Injectable()
export class UserService extends BaseService<IUser, UserRepository> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private jwtHelper: JwtHelper,
  ) {
    super(userRepository);
  }
  private checkPassword(password: string, passwordLogin: string): boolean {
    return password === passwordLogin;
  }
  async login(dataLogin: LoginDto): Promise<any> {
    const user: IUser | null = await this.userRepository.findOne({
      username: dataLogin['username'],
    });
    console.log(user);
    if (!user) throw new ConflictException('username không đúng');
    const checkPassword: boolean = this.checkPassword(
      user['password'],
      dataLogin['password'],
    );
    if (!checkPassword) throw new ConflictException('password không đúng');
    return {
      success: true,
      message: 'đăng nhập thành công',
      accessToken: await this.jwtHelper.signToken({ id: user['_id'] }),
    };
  }
 
  async addToCart(user: IUser, id_product: Id): Promise<any> {
    const checkProductInCart: boolean = this.checkProductInCart(
      id_product,
      user.cart,
    );
    if (checkProductInCart){
      throw new ConflictException('đã thêm vào giỏ hàng trước đó');
    }
    const newCart: Id[] = this.addToNewCart(user.cart, id_product);
    const id: Id = user['_id'];      
    await this.userRepository.update(id, { cart: newCart });
  }

   async getAllCart(list_id: any[]){
      return Promise.all(list_id.map((id: any) => {
        return this.productRepository.findById(id);
      }))
   }

  private checkProductInCart(id_product: Id, cart: Id[]): boolean {
    return cart.includes(id_product);
  }

  private addToNewCart(cart: Id[], id_product: Id): Id[] {
    cart.push(id_product);
    return cart;
  }
}
