import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';

import { EntityController } from '@/core/abstract/entity.controller';
import { RouteAccess } from '@/core/decorators/route-access.decorator';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController implements EntityController<GroupEntity> {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ description: 'Adds a new group to the database' })
  @Post()
  @RouteAccess({ action: 'create', subject: 'Group' })
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this.groupsService.create(createGroupDto);
  }

  @ApiOperation({ description: 'Returns all groups in the database' })
  @Get()
  @RouteAccess({ action: 'read', subject: 'Group' })
  findAll(): Promise<GroupEntity[]> {
    return this.groupsService.findAll();
  }

  @ApiOperation({ description: 'Returns the group with the provided name' })
  @Get(':name')
  @RouteAccess({ action: 'read', subject: 'Group' })
  findOne(@Param('name') name: string): Promise<GroupEntity> {
    return this.groupsService.findOne(name);
  }

  @ApiOperation({ description: 'Returns the updated group' })
  @Patch(':name')
  @RouteAccess({ action: 'update', subject: 'Group' })
  update(@Param('name') name: string, @Body() updateGroupDto: UpdateGroupDto): Promise<GroupEntity> {
    return this.groupsService.update(name, updateGroupDto);
  }

  @ApiOperation({ description: 'Returns the deleted user' })
  @Delete(':name')
  @RouteAccess({ action: 'delete', subject: 'Group' })
  remove(@Param('name') name: string): Promise<GroupEntity> {
    return this.groupsService.remove(name);
  }
}
