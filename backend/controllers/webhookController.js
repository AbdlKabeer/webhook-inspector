const WebhookUrl = require('../models/WebhookUrl');
const WebhookRequest = require('../models/WebhookRequest');

/**
 * Handle incoming webhook requests
 * @route ALL /:slug
 * @access Public
 */
exports.handleWebhookRequest = async (req, res) => {
  try {
    // Find the webhook URL
    const webhookUrl = await WebhookUrl.findOne({ slug: req.params.slug });
    
    if (!webhookUrl || !webhookUrl.isValid()) {
      return res.status(404).json({
        success: false,
        error: 'Webhook URL not found or expired'
      });
    }
    
    // Check if method is allowed
    if (!webhookUrl.allowedMethods.includes(req.method)) {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed for this webhook'
      });
    }
    
    // Create webhook request record
    const webhookRequest = new WebhookRequest({
      webhookUrl: webhookUrl._id,
      method: req.method,
      headers: req.headers,
      queryParams: req.query,
      body: req.body,
      ipAddress: req.ip,
      metadata: {
        userAgent: req.get('User-Agent'),
        contentType: req.get('Content-Type')
      }
    });
    
    // Save the request
    await webhookRequest.save();
    
    // Update webhook URL stats
    await WebhookUrl.findByIdAndUpdate(webhookUrl._id, {
      $inc: { 'stats.totalRequests': 1 },
      $set: { 'stats.lastRequestAt': new Date() }
    });
    
    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Webhook request received',
      requestId: webhookRequest._id
    });
  } catch (error) {
    console.error('Webhook request processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process webhook request'
    });
  }
};

/**
 * Get webhook requests for a specific URL
 * @route GET /api/requests/:slug
 * @access Public (could be made private)
 */
exports.getWebhookRequests = async (req, res) => {
  try {
    const webhookUrl = await WebhookUrl.findOne({ slug: req.params.slug });
    
    if (!webhookUrl) {
      return res.status(404).json({
        success: false,
        error: 'Webhook URL not found'
      });
    }
    
    // Fetch recent requests
    const requests = await WebhookRequest.find({ 
      webhookUrl: webhookUrl._id 
    })
    .sort({ createdAt: -1 })
    .limit(100);
    
    res.json({
      success: true,
      data: {
        total: requests.length,
        requests
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve webhook requests'
    });
  }
};