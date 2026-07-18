const { nanoid } = require('nanoid');
const WebhookUrl = require('../models/WebhookUrl');

/**
 * Generate a unique slug for webhook URL
 * @param {number} [length=12] - Length of the slug
 * @returns {Promise<string>} Unique slug
 */
const generateUniqueSlug = async (length = 12) => {
  while (true) {
    const slug = nanoid(length);
    
    // Check if slug already exists
    const existingUrl = await WebhookUrl.findOne({ slug });
    
    if (!existingUrl) {
      return slug;
    }
    
    // If slug exists, generate a new one
  }
};

module.exports = generateUniqueSlug;