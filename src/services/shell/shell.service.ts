import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { IShellService } from './shell.abstract';

@Injectable()
export class ShellService implements IShellService {
  exec = (cmd: string): string => {
    const res = execSync(cmd, {
      shell: 'pwsh',
      encoding: 'utf-8',
    });

    console.log('[ShellService#exec]', res);
    return res;
  };
}
