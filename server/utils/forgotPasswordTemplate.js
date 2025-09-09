const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Tourism</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Use the following OTP to reset your password. This OTP is valid for 10 minutes.</p>
        <h3 style="background: #f4f4f4; width: max
        -content; padding: 10px; border: 1px solid #ddd; margin-top: 20px;">${otp}</h3>
        <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>Best regards,<br/>The Tourism Team</p>
        </div>
        `;
};

module.exports = forgotPasswordTemplate;
