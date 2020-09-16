const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  generateAccessToken(user_id) {
    const payload = {
      user: {
        id: user_id,
      },
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
  },

  generateRefreshToken(user_id) {
    const payload = {
      user: {
        id: user_id,
      },
    };

    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '14d',
    });
  },
};
