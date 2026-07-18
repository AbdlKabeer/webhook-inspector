const WebhookUrl = require('../models/WebhookUrl');
const WebhookRequest = require('../models/WebhookRequest');
const generateUniqueSlug = require('../utils/generateUniqueSlug');

/**
 * Create a new webhook URL
 * @route POST /api/urls
 * @access Public
 */
exports.createWebhookUrl = async (req, res) => {
  try {
    // Generate unique slug
    const slug = await generateUniqueSlug();
    
    // Create webhook URL
    const webhookUrl = new WebhookUrl({
      slug,
      metadata: {
        description: req.body.description || ''
      },
      // Optional: set custom allowed methods
      allowedMethods: req.body.allowedMethods || ['POST', 'GET']
    });
    
    // Save and return
    await webhookUrl.save();
    
    res.status(201).json({
      success: true,
      data: {
        slug: webhookUrl.slug,
        fullUrl: webhookUrl.fullUrl,
        expiresAt: webhookUrl.expiresAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create webhook URL'
    });
  }
};

/**
 * Get webhook URL details
 * @route GET /api/urls/:slug
 * @access Public
 */
exports.getWebhookUrlDetails = async (req, res) => {
  try {
    const webhookUrl = await WebhookUrl.findOne({ slug: req.params.slug });
    
    if (!webhookUrl) {
      return res.status(404).json({
        success: false,
        error: 'Webhook URL not found'
      });
    }
    
    // Get recent requests
    const recentRequests = await WebhookRequest.find({ 
      webhookUrl: webhookUrl._id 
    })
    .sort({ createdAt: -1 })
    .limit(50);
    
    res.json({
      success: true,
      data: {
        url: webhookUrl,
        recentRequests
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve webhook URL details'
    });
  }
};

/**
 * List user's webhook URLs
 * @route GET /api/urls
 * @access Private (would require authentication)
 */
exports.listWebhookUrls = async (req, res) => {
  try {
    // In a real app, this would filter by user
    const webhookUrls = await WebhookUrl.find()
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      data: webhookUrls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to list webhook URLs'
    });
  }
};

/**
 * Delete a webhook URL
 * @route DELETE /api/urls/:slug
 * @access Public (could be made private)
 */
exports.deleteWebhookUrl = async (req, res) => {
  try {
    const webhookUrl = await WebhookUrl.findOneAndDelete({ 
      slug: req.params.slug 
    });
    
    if (!webhookUrl) {
      return res.status(404).json({
        success: false,
        error: 'Webhook URL not found'
      });
    }
    
    // Optional: delete associated requests
    await WebhookRequest.deleteMany({ 
      webhookUrl: webhookUrl._id 
    });
    
    res.json({
      success: true,
      message: 'Webhook URL deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete webhook URL'
    });
  }
};