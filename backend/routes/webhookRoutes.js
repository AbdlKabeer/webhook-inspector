const express = require('express');
const router = express.Router();
const { 
  handleWebhookRequest, 
  getWebhookRequests 
} = require('../controllers/webhookController');

// Catch-all route for webhook requests
router.all('/hook/:slug', handleWebhookRequest);

// Get requests for a specific webhook URL
router.get('/api/requests/:slug', getWebhookRequests);

module.exports = router;