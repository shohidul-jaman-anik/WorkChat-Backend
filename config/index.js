const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  env: process.env.NODE_ENV,
  database_local: process.env.DATABASE_LOCAL,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  email: process.env.email,
  password: process.env.password,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  sender_mail: process.env.SENDER_MAIL,
  refresh_token: process.env.REFRESH_TOKEN,
  access_token: process.env.ACCESS_TOKEN,
  confirm_reg_email: process.env.CONFIRM_REG_EMAIL,
  api_key: process.env.API_KEY,
  bg_check_base_url: process.env.BG_CHECK_BASE_URL,
  mailgun: {
    mailgun_domain: process.env.MAILGUN_DOMAIN,
    mailgun_key: process.env.MAILGUN_KEY,
    mailgun_from: process.env.MAILGUN_FROM,
  },
  cloud_storage: {
    cloud_storage_secret_key: process.env.CLOUD_STORAGE_SECRET_KEY,
    cloud_storage_access_key: process.env.CLOUD_STORAGE_ACCESS_KEY,
    cloud_storage_bucket: process.env.CLOUD_STORAGE_BUCKET,
  },
  livekit: {
    livekit_secret_key: process?.env?.LIVEKIT_SECRET_KEY,
    livekit_api_key: process?.env?.LIVEKIT_API_KEY,
    web_socket_url: process?.env?.WEB_SOCKET_URL,
  },
  // stripe_secret_key: process.env.STRIPE_SECRET_KEY
};
