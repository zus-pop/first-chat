import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

@Injectable()
export class PusherService extends Pusher {
  constructor(config: ConfigService) {
    super({
      appId: config.get<string>('PUSHER_APP_ID') as string,
      key: config.get<string>('PUSHER_APP_KEY') as string,
      secret: config.get<string>('PUSHER_APP_SECRET') as string,
      cluster: config.get<string>('PUSHER_APP_CLUSTER') as string,
      useTLS: true,
    });
  }
}
