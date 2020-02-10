import configDev from './env.dev';
import configStag from './env.staging';

let config = {};
if (process.env.NODE_ENV === 'development') {
  config = configDev;
} else {
  config = configStag;
}

export default config;