const Invoice = require('../models/invoice.model');

exports.createInvoice = async (req, res, next) => {
  try {
    const { merchantId, customerName, customerEmail, amount, description, expiryAt } = req.body;
    if (!merchantId || !amount) {
      return res.status(400).json({ message: 'merchantId dan amount wajib' });
    }
    const invoice = await Invoice.create({
      merchantId,
      customerName,
      customerEmail,
      amount,
      description,
      expiryAt
    });
    res.status(201).json({ message: 'Invoice created', data: invoice });
  } catch (err) {
    next(err);
  }
};