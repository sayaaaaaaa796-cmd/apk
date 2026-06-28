const crypto = require('crypto');

exports.verifyWebhookSignature = (req, res, next) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = process.env.WEBHOOK_SECRET;
  if (!signature || !secret) return res.status(401).json({ message: 'Invalid webhook' });

  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ message: 'Invalid webhook signature' });
  }

  next();
};