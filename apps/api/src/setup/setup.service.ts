import { ForbiddenException, Injectable } from '@nestjs/common';
import { type CreateAdminData } from '@open-data-capture/common/setup';
import type { InitAppOptions } from '@open-data-capture/common/setup';

import { ConfigurationService } from '@/configuration/configuration.service';
import { DemoService } from '@/demo/demo.service';
import { InjectModel } from '@/prisma/prisma.decorators';
import { PrismaService } from '@/prisma/prisma.service';
import type { Model } from '@/prisma/prisma.types';
import { UsersService } from '@/users/users.service';

@Injectable()
export class SetupService {
  constructor(
    @InjectModel('SetupState') private readonly setupStateModel: Model<'SetupState'>,
    private readonly configurationService: ConfigurationService,
    private readonly demoService: DemoService,
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService
  ) {}

  async createAdmin(admin: CreateAdminData) {
    return this.usersService.create({ ...admin, basePermissionLevel: 'ADMIN', groupIds: [] });
  }

  async getState() {
    const savedOptions = await this.getSavedOptions();
    return {
      isGatewayEnabled: this.configurationService.get('GATEWAY_ENABLED'),
      isSetup: Boolean(savedOptions?.isSetup)
    };
  }

  async initApp({ admin, initDemo }: InitAppOptions) {
    const isDev = this.configurationService.get('NODE_ENV') === 'development';
    const savedOptions = await this.getSavedOptions();
    if (savedOptions?.isSetup && !isDev) {
      throw new ForbiddenException();
    }
    await this.prismaService.dropDatabase();
    await this.createAdmin(admin);
    if (initDemo) {
      await this.demoService.init();
    }
    await this.setupStateModel.create({ data: { isSetup: true } });
    return { success: true };
  }

  private async getSavedOptions() {
    return await this.setupStateModel.findFirst();
  }
}
