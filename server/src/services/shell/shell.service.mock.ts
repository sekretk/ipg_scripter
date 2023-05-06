import { Injectable } from '@nestjs/common';
import { COMMAND_MOCKS } from '../../consts/fixture';
import { IShellService } from './shell.abstract';

@Injectable()
export class ShellServiceMock implements IShellService {
  exec = (cmd: string): string => {
    console.log(
      `[ShellServiceMock#exec] '${cmd}', response '${COMMAND_MOCKS[cmd]}'`,
    );

    return COMMAND_MOCKS[cmd];
  };
}
