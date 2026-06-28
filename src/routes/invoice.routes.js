const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const invoiceController = require('../controllers/invoice.controller');

router.post('/', authMiddleware, invoiceController.createInvoice);
router.get('/:id', authMiddleware, invoiceController.getInvoiceById);
router.get('/', authMiddleware, invoiceController.listInvoices);

module.exports = router;r;