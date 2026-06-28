const db = require('./base.model');

module.exports = {
  create: async ({ name, email, passwordHash, role = 'merchant' }) => {
    const { rows } = await db.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, passwordHash, role]
    );
    return rows[0];
  },

  findByEmail: async (email) => {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows[0];
  }
};