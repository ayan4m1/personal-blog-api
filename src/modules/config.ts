import 'dotenv/config';

export const api = {
  port: parseInt(process.env.API_PORT || '4000', 10),
  corsDomain: process.env.API_CORS_DOMAIN
};

// export const email = {
//   domain: process.env.API_EMAIL_DOMAIN,
//   port: parseInt(process.env.API_EMAIL_PORT || '587', 10),
//   hostname: process.env.API_EMAIL_HOSTNAME,
//   username: process.env.API_EMAIL_USERNAME,
//   password: process.env.API_EMAIL_PASSWORD
// };

// export const token = {
//   secret: process.env.API_TOKEN_SECRET,
//   lifetime: parseInt(process.env.API_TOKEN_LIFETIME || '3600', 10),
//   rounds: parseInt(process.env.API_TOKEN_ROUNDS || '10', 10)
// };

export const logging = {
  level: process.env.API_LOG_LEVEL || 'info',
  timestampFormat: process.env.API_LOG_TIME_FMT
};
