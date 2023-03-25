import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AccessibleModel } from '@casl/mongoose';
import { Model } from 'mongoose';

import { UserDocument, UserEntity } from './entities/user.entity';

import { EntityRepository } from '@/core/abstract/entity.repository';

@Injectable()
export class UsersRepository extends EntityRepository<UserEntity> {
  constructor(@InjectModel(UserEntity.name) userModel: Model<UserDocument, AccessibleModel<UserDocument>>) {
    super(userModel);
  }
}
