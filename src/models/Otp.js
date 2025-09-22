// models/Otp.js
class Otp {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.code = data.code;
        this.expiresAt = data.expiresAt || new Date(Date.now() + 5 * 60 * 1000);
        this.createdAt = data.createdAt || new Date();
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            code: this.code,
            expiresAt: this.expiresAt,
            createdAt: this.createdAt
        };
    }
}

module.exports = Otp;
