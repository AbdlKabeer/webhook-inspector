const mongoose = require('mongoose');

const WebhookRequestSchema = new mongoose.Schema({
  // Reference to the WebhookUrl
  webhookUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WebhookUrl',
    required: true
  },
  
  // Request details
  method: {
    type: String,
    required: true,
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  },
  
  // Full request headers
  headers: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Request query parameters
  queryParams: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Request body
  body: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  
  // IP address of the requester
  ipAddress: {
    type: String,
    default: null
  },
  
  // Additional metadata
  metadata: {
    userAgent: {
      type: String,
      default: null
    },
    contentType: {
      type: String,
      default: null
    }
  },
  
  // Response tracking (optional)
  responseDetails: {
    status: {
      type: Number,
      default: null
    },
    body: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexing for performance
WebhookRequestSchema.index({ 
  webhookUrl: 1, 
  createdAt: -1 
});

module.exports = mongoose.model('WebhookRequest', WebhookRequestSchema);