﻿import { config as readEnv } from 'dotenv';
import { validate } from '../validate';
import { AppConfigDto } from './app-config.dto';

readEnv();

const rawConfig = {
  port: process.env.PORT,
};

export const appConfig = validate(AppConfigDto, rawConfig);
