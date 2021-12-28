import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userServece: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userServece.findAllUsers();
    return users;
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userServece.findUserById(id);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userServece.createUser(data);
    return user;
  }
}
