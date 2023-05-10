import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { IShellService } from './shell.abstract';

@Injectable()
export class ShellService implements IShellService {
  private readonly logger = new Logger(ShellService.name);
  exec = (cmd: string): string => {
    try {
      const res = execSync(cmd, {
        shell: 'pwsh',
        encoding: 'utf-8',
      });

      console.log('[ShellService#exec]', res);
      return res;
    } catch (err) {
      this.logger.error(`Execute error '${cmd}'`, err?.stack, err.toString());
    }
  };
}
