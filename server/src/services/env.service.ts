import { Injectable } from "@nestjs/common";
import config from '../config.json'

@Injectable()
export class EnvService { 
    prefix = config.PREFIX;
    scriptRoot = config.SCRIPT_ROOTS;
    shareRoot = config.SHARE_ROOT;
}