import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService], // this allows us to inject the service into the controller because the controller is defining the module and the service is a provider in the module which allows the service to be injected
})
export class TasksModule {}
