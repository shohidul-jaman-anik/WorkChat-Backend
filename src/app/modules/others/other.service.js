// const fs = require('fs');
const jwt = require('jsonwebtoken');
// const config = require('../../../../config');

const teamId = '39TC4A7ABH';
const keyId = '2Q5S445F8M';

const key =`-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQggyhi2INcpYHRwZPO
Eowk8aEY5q14FpwrajuIrND8VYigCgYIKoZIzj0DAQehRANCAARWqJYp6qCZc4zx
Az1G0KqHV005UK3oG5racRkYLvvyBpnVRKSA6+9o4CR6fz7eMHGZ0QtK+qY0jp9/
+4PdP0Cq
-----END PRIVATE KEY-----`;

module.exports.generateTokenForIphoneService = async () => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: teamId,
    iat: now,
  };

  const options = {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: keyId,
    },
  };

  const token = jwt.sign(payload, key, options);
  return token;
};
