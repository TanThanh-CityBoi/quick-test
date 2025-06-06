import * as dotenv from 'dotenv';
import { ENV_CONFIG } from './env.config';
dotenv.config(ENV_CONFIG);

export const API_CONFIG = {
    API_URL: process.env.API_URL || 'http://localhost:4000/api',
};
