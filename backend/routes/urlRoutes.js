const express = require('express');
const router = express.Router();
const { 
  createWebhookUrl, 
  getWebhookUrlDetails, 
  listWebhookUrls,
  deleteWebhookUrl 
} = require('../controllers/urlController');

// Create a new webhook URL
router.post('/', createWebhookUrl);

// Get details of a specific webhook URL
router.get('/:slug', getWebhookUrlDetails);

// List webhook URLs
router.get('/', listWebhookUrls);

// Delete a webhook URL
router.delete('/:slug', deleteWebhookUrl);

module.exports = router;