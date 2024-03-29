require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET
}