require('dotenv').config()

module.exports = {

    REDIS_CONFIG:    {
        HOST:       `${process.env.REDIS_HOST}`
    ,   PORT:       parseInt(`${process.env.REDIS_PORT}`)
    ,   RETRY_MS:   parseInt(`${process.env.REDIS_RETRY_MS}`)
    }

,   AXIOS_CONFIG:   {
        TIMEOUT_MS: parseInt(`${process.env.AXIOS_TIMEOUT_MS}`)
    }

,   URLS: {
        BASE_URL:       `${process.env.BASE_URL}`
    ,   FULL_SCHEDULE:  `${process.env.FULL_SCHEDULE_URL}`
    ,   SHOW_INFO:      `${process.env.SHOW_INFO_URL}`
    }

,   APP_CONFIG: {
        PORT:   parseInt(`${process.env.APP_PORT}`)
    }

}
