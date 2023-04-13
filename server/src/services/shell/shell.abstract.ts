export interface IShellService {
  exec: (cmd: string) => string;
}

export const SHELL_SERVICE = 'SHELL_SERVICE';
