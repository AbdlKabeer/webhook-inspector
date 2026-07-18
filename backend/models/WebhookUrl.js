const mongoose = require('mongoose');

const WebhookUrlSchema = new mongoose.Schema({
  // Unique slug for the webhook URL
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  
  // User who created the URL (optional)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Metadata about the URL
  metadata: {
    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  // Expiration for the URL
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from creation
  },
  
  // Request count and last request
  stats: {
    totalRequests: {
      type: Number,
      default: 0
    },
    lastRequestAt: {
      type: Date,
      default: null
    }
  },
  
  // Allowed HTTP methods
  allowedMethods: {
    type: [String],
    default: ['POST', 'GET']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full webhook URL
WebhookUrlSchema.virtual('fullUrl').get(function() {
  return `${process.env.BASE_WEBHOOK_URL}${this.slug}`;
});

// Middleware to deactivate expired URLs
WebhookUrlSchema.pre('find', function() {
  this.where({ 
    expiresAt: { $gt: new Date() },
    'metadata.isActive': true 
  });
});

// Method to check if URL is still valid
WebhookUrlSchema.methods.isValid = function() {
  return this.metadata.isActive && this.expiresAt > new Date();
};

module.exports = mongoose.model('WebhookUrl', WebhookUrlSchema);