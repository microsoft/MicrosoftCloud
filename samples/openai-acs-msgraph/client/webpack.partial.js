const webpack = require('webpack');
require('dotenv').config({ path: '../.env' })

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            "AAD_CLIENT_ID": JSON.stringify(process.env.AAD_CLIENT_ID),
            "TEAM_ID": JSON.stringify(process.env.TEAM_ID),
            "CHANNEL_ID": JSON.stringify(process.env.CHANNEL_ID),
            "OPENAI_API_KEY": (process.env.OPENAI_API_KEY) ? true : false, 
            "ACS_CONNECTION_STRING": (process.env.ACS_CONNECTION_STRING) ? true : false,
            "ACS_PHONE_NUMBER": JSON.stringify(process.env.ACS_PHONE_NUMBER),
            "ACS_EMAIL_ADDRESS": (process.env.ACS_EMAIL_ADDRESS) ? true : false,
            "CUSTOMER_EMAIL_ADDRESS": JSON.stringify(process.env.CUSTOMER_EMAIL_ADDRESS),
            "CUSTOMER_PHONE_NUMBER": JSON.stringify(process.env.CUSTOMER_PHONE_NUMBER),
            "API_PORT": JSON.stringify(process.env.API_PORT)
        })
    ]
}