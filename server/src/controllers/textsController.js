const pool = require('../db/dbQuery');

module.exports = {
  async index(req, res) {
    try {
      const userTexts = await pool.query(
        'SELECT title, content FROM texts t INNER JOIN users u ON t.user_id = u.id WHERE t.user_id = $1 ORDER BY t.id',
        [req.user.id]
      );

      res.json(userTexts.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  async create(req, res) {
    console.log(req.user);
    try {
      const userTexts = await pool.query(
        'SELECT COUNT(*) FROM texts t INNER JOIN users u ON t.user_id = u.id WHERE t.user_id = $1',
        [req.user.id]
      );

      if (userTexts.rows[0].count === '5') {
        return res.status(403).send('Limit of 5 texts reached');
      }

      await pool.query(
        'INSERT INTO texts (title, content, user_id) VALUES ($1, $2, $3)',
        ['', '', req.user.id]
      );

      return res.status(201).send();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  async update(req, res) {
    const textId = req.params.id;
    const { title, content } = req.body;

    try {
      await pool.query(
        'UPDATE texts SET title = $1, content = $2 WHERE id = $3 RETURNING user_id',
        [title, content, textId]
      );

      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  async delete(req, res) {
    const textId = req.params.id;

    try {
      await pool.query('DELETE FROM texts t WHERE t.id = $1', [textId]);

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
};
