import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { GET_ALL_USER } from 'src/consts/commands';

@Injectable()
export class AppService {
  getHello(): string {
    // console.log('XXX get hello');

    // const res = execSync(GET_ALL_USER, {
    //   shell: 'powershell.exe',
    //   encoding: 'utf-8',
    // });

    // console.log(res);
    // return res
    //   .split('\r\n')
    //   .map((_) => _.split(' ').filter(Boolean)[1])
    //   .join(' - ');

    return 'hello';
  }
}
