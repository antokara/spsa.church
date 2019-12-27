require('../../loadEnv');

exports.data = [
  {
    id: 1,
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD_HASH,
    resetPasswordToken: null,
    blocked: null
  }
];

exports.lastId = 1;
