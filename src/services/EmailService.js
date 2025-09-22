const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function sendOtpMail(to, code) {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject: "Your OTP Code",
        text: `Mã OTP của bạn là: ${code}. Mã sẽ hết hạn sau 5 phút.`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendOtpMail };
