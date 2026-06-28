exports.paymentWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload || !payload.event) {
      return res.status(400).json({ message: 'Invalid payload' });
    }
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};