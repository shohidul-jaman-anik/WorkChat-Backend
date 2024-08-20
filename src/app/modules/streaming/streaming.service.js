const config = require('../../../../config');
const UserModel = require('../auth/auth.model');
const { ObjectId } = require('mongodb');

module.exports.autioVideoStreamingService = async userId => {
  const { AccessToken } = await import('livekit-server-sdk');
  const roomName = 'inso-ai-room';

  // Log the userId for debugging
  console.log('userId:', userId);

  // Find the participant
  const participant = await UserModel.findOne({ _id: new ObjectId(userId) });

  // Handle the case where participant is null
  if (!participant) {
    throw new Error('User not found or invalid userId');
  }

  // Ensure the participant has an email
  if (!participant.email) {
    throw new Error('User does not have an email associated with the account');
  }

  // Create an access token
  const at = new AccessToken(
    // config?.livekit_api_key,
    // config?.livekit_secret_key,
    'APIJLJY9Lkyj9m9',
    'pdAzEHVaxcSZCTrqZaIujVBeFMhqn8tpliOGQr4nnDP',
    {
      identity: participant.email,
      ttl: '60m',
    },
  );

  at.addGrant({ roomJoin: true, room: roomName });

  const result = await at.toJwt();
  console.log(result, 'resulttttttttt');

  return result;
};
