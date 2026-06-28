const db = require('./base.model');

module.exports = {
  create: async ({ merchantId, customerName, customerEmail, amount, description, expiryAt }) => {
    const invoiceNumber = `INV-${Date.now()}`;
    const { rows } = await db.query(
      `INSERT INTO invoices
       (merchant_id, invoice_number, customer_name, customer_email, amount, description, expiry_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [merchantId, invoiceNumber, customerName, customerEmail, amount, description, expiryAt || null]
    );
    return rows[0];
  },

  findById: async (id) => {
    const { rows } = await db.query(
      'SELECT * FROM invoices WHERE id = $1 LIMIT 1',
      [id]
    );
    return rows[0];
  },

  updateStatus: async (id, status) => {
    const { rows } = await db.query(
      `UPDATE invoices
       SET status = $2, updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, status]
    );
    return rows[0];
  }
};