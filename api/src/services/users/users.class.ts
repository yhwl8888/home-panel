import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

export class Users extends Service {
  constructor(options: Partial<NedbServiceOptions>, _app: Application) {
    super(options);
  }
}
