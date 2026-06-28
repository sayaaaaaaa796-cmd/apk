const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const merchantRoutes = require('./routes/merchant.routes');
const invoiceRoutes = require('./routes/invoice.routes');
const refundRoutes = require('./routes/refund.routes');
const payoutRoutes = require('./routes/payout.routes');
const webhookRoutes = require('./routes/webhook.routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/merchants', merchantRoutes);
app.use('/api/v1/invoices', invoiceRoutes);
app.use('/api/v1/refunds', refundRoutes);
app.use('/api/v1/payouts', payoutRoutes);
app.use('/webhooks', webhookRoutes);

app.use(errorHandler);

module.exports = app;