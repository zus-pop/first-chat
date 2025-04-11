import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService extends Pusher {
  constructor() {
    super({
      appId: '1962560',
      key: 'ff846b1ce568d68c39da',
      secret: '4eec5588ad648c628c67',
      cluster: 'ap1',
      useTLS: true,
    });
  }
}
