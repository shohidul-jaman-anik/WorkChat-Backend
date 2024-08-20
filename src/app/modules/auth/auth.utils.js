const otpGenerator = require('otp-generator');

module.exports.generateOTP = async () => {
  const otp = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};

module.exports.registrationOtpTemplate = async (email, token) => {
  const mailData = {
    userEmail: email,
    sub: 'Verify Your Account',
    message: `<div style=" font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;  margin: auto; width: 60%;">
                <div style="max-width: 1050px;  background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin: auto; width: 90%;">
                  <h2 style="color: #333333;">Email Verification</h2>
                  <p style="color: #666666; font-size: 18px;">Dear user,</p>
                  <p style="color: #666666; font-size: 18px;">Thank you for signing up on Inso Ai! To complete your registration, please click the link below to verify your email address:</p>
                  <button  style="margin-bottom: 20px; background-color: #242C36; color: #FFFFFF; border: none; display: inline-block; border-radius: 8px; transition: background-color 0.3s; padding: 8px 15px; cursor: pointer;  text-align: center; ">
                  <a href="https://insocloud.com/api/v1/auth/register/confirmation/${token}" style="text-decoration: none; color: #FFFFFF; font-size: 18px;">Verify Email</a>
                  </button>
                  <p style="color: #666666; font-size: 18px;">If you didn't sign up for our service, you can ignore this email.</p>
                </div>
                <p style="color: #999999; margin-top: 20px;">This email was sent by Inso Ai.</p>
              </div>`,
  };
  return mailData;
};

module.exports.forgetPassOtpTemplate = async (email, user, OTP) => {
  const mailData = {
    userEmail: email,
    sub: 'Verify Your One-Time Password (OTP)', // Clear and informative subject
    message: `
      <div style="max-width: 800px; font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; margin: auto; width: 50%;">
        <div style="max-width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin: auto; width: 90%;">
          <h2 style="color: #333333; text-align: center;">Verify Your OTP</h2>
          <p style="color: #666666; font-size: 18px;">
            Dear ${user.username || 'User'},
          </p>
          <p style="color: #666666; font-size: 18px;">
            To complete your reset password, please enter the following OTP: <span style="color: #333333; font-size: 20px; font-weight: bold; text-align: center;">
            ${OTP}
            </span>
          </p>
          <p style="color: #666666; font-size: 18px;">
            This code is valid for 10 minutes. Please do not share it with anyone for your security.
          </p>
        </div>
        <p style="color: #999999; margin-top: 20px; text-align: center;">
          This email was sent by Inso Ai.
        </p>
      </div>
    `,
  };
  return mailData;
};


module.exports.deleteUserOtpTemplate = async (email, user, OTP) => {
  const mailData = {
    userEmail: user.email,
    sub: 'Delete Account OTP',
    message: `
      <div style="max-width: 800px; font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; margin: auto; width: 50%;">
        <div style="max-width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin: auto; width: 90%;">
          <h2 style="color: #333333; text-align: center;">Verify Your OTP</h2>
          <p style="color: #666666; font-size: 18px;">
            Dear ${user.username || 'User'},
          </p>
          <p style="color: #666666; font-size: 18px;">
            To proceed with deleting your account, please enter the following OTP:
            <span style="color: #333333; font-size: 20px; font-weight: bold; text-align: center;">${OTP}</span>
          </p>
          <p style="color: #666666; font-size: 18px;">
            This code is valid for 10 minutes. Please do not share it with anyone for your security.
          </p>
        </div>
        <p style="color: #999999; margin-top: 20px; text-align: center;">
          This email was sent by Inso Ai.
        </p>
      </div>
    `,
  };
  return mailData;
};
