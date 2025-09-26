import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AppService {
  generateOid(): string {
    return uuidv4().replace(/-/g, '');
  }
}
