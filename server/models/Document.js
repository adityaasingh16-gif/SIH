/**
 * ============================================================================
 * PROVENANCE LEGAL EVAULT - DOCUMENT MODEL SCHEMA
 * ============================================================================
 * Defines the MongoDB / Database schema for legal records anchored on-chain.
 */

const mongoose = require('mongoose');

const TimelineEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  actor: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    default: () => new Date().toISOString()
  },
  statusColor: {
    type: String,
    default: 'bg-emerald-500'
  }
});

const LegalDocumentSchema = new mongoose.Schema(
  {
    documentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Commercial Contracts', 'Deeds & Land', 'Identity & IP', 'Regulatory Compliance', 'Custom Legal Record'],
      default: 'Commercial Contracts'
    },
    sha256Hash: {
      type: String,
      required: [true, 'Cryptographic SHA-256 hash is required'],
      unique: true,
      index: true,
      lowercase: true
    },
    ipfsCID: {
      type: String,
      required: true
    },
    blockNumber: {
      type: String,
      required: true
    },
    blockchainTxHash: {
      type: String,
      required: true
    },
    jurisdiction: {
      type: String,
      default: 'Supreme Court of New York'
    },
    confidentiality: {
      type: String,
      enum: ['Secret / Restricted', 'Confidential', 'Public / Unrestricted'],
      default: 'Confidential'
    },
    signerAddress: {
      type: String,
      required: true,
      lowercase: true
    },
    status: {
      type: String,
      enum: ['Verified', 'Pending', 'Revoked'],
      default: 'Verified'
    },
    fileSizeMB: {
      type: Number,
      default: 1.5
    },
    provenanceTimeline: [TimelineEventSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('LegalDocument', LegalDocumentSchema);
