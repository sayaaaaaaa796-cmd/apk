const router = require('express').Router();
const { verifyWebhookSignature } = require('../middlewares/webhook.middleware');
const webhookController = require('../controllers/webhook.controller');

router.post('/payments', verifyWebhookSignature, webhookController.paymentWebhook);

module.exports = router;