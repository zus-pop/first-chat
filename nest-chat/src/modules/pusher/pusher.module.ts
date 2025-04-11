import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Module({
  exports: [PusherService],
  providers: [PusherService],
})
export class PusherModule {}
