const bcrypt = require('bcrypt');
const pool = require('../db/dbQuery');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/generateToken');

module.exports = {
  async createUser(req, res) {
    const { email, name, password } = req.body;

    try {
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);

      if (user.rows.length > 0) {
        return res.status(401).json('User already exist!');
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bcryptPassword]
      );

      // Create a text for the user
      await pool.query(
        'INSERT INTO texts (title, content, user_id) VALUES ($1, $2, $3)',
        ['', '', newUser.rows[0].id]
      );

      const accessToken = generateAccessToken(newUser.rows[0].id);
      const refreshToken = generateRefreshToken(newUser.rows[0].id);

      return res.json({
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  async signinUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);

      if (user.rows.length === 0) {
        return res.status(401).json('Invalid Credential');
      }

      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (!validPassword) {
        return res.status(401).json('Invalid Credential');
      }

      const accessToken = generateAccessToken(user.rows[0].id);
      const refreshToken = generateRefreshToken(user.rows[0].id);
      return res.json({
        name: user.rows[0].name,
        email: user.rows[0].email,
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  refreshToken(req, res) {
    const accessToken = generateAccessToken(req.user.id);
    const newRefreshToken = generateRefreshToken(req.user.id);

    res.json({ accessToken, refreshToken: newRefreshToken });
  },
};
