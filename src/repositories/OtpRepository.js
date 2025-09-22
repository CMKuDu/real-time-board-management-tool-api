// repositories/OtpRepository.js
const Otp = require('../models/Otp');

class OtpRepository {
    constructor() {
        this.otps = [];
    }

    async create({ email, code }) {
        const otp = new Otp({
            id: this.otps.length + 1,
            email,
            code
        });
        this.otps.push(otp);
        return otp;
    }

    async findValidOtp(email, code) {
        const now = new Date();
        return this.otps.find(o => o.email === email && o.code === code && o.expiresAt > now);
    }
}

module.exports = new OtpRepository();
