const jwt = require('jsonwebtoken');
require('dotenv').config();

// this middleware will on continue on if the token is inside the local storage

module.exports = {
  verifyAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res.status(403).json({ msg: 'token not provided' });
    }

    try {
      const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      req.user = verify.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'invalid token' });
    }
  },

  async verifyRefreshToken(req, res, next) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ msg: 'authorization denied' });
    }

    try {
      const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      req.user = verify.user;
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
};
