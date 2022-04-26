require('dotenv').config()

const config={
    app: {
        port: process.env.APP_PORT || 80,
        jwt: process.env.JWT_SECRET,
    },
    db: {
        user: process.env.DB_USER,
    }
}
