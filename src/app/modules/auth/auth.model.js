const mongoose = require('mongoose');
const crypto = require('crypto');
const emailValidator = require('email-validator');
const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      require: [true, 'Please provide a username'],
      unique: true,
    },
    description: String,
    phone: String,
    email: {
      type: String,
      required: [true, 'Please provide a unique email'],
      unique: true,
      validate: function () {
        return emailValidator.validate(this.email);
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      unique: false,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'buyer', 'admin', 'unauthorized'],
      },
      default: 'unauthorized',
    },
    profile: { type: String },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes',
      },
    ],
    llamaAiSessions: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'LlamaAiSession' },
    ],
    confirmationToken: String,
    confirmationTokenExpires: Date,
    resetPasswordOTP: String,
    resetPasswordExpires: Date,
    deleteAccountOTP: String,
    deleteAccountExpires: Date,
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.confirmationToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

// Before saving database
UserSchema.pre('save', function () {
  console.log('Before saving database');
});

// After saving database
UserSchema.post('', function (doc) {
  console.log(doc, 'After saving database');
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
