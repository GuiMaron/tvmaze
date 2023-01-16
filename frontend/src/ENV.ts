const ENV = {

    AXIOS_CONFIG: {
        TIMEOUT_MS:                 parseInt(`${process.env.REACT_APP_AXIOS_TIMEOUT_MS}`)
    ,   WARNING_SLOW_CONNECTION_MS: parseInt(`${process.env.REACT_APP_AXIOS_WARNING_SLOW_CONNECTION_TIMEOUT_MS}`)
    }

,   URLS: {
        BASE_URL:       `${process.env.REACT_APP_BASE_URL}`
    ,   FULL_SCHEDULE:  `${process.env.REACT_APP_FULL_SCHEDULE_URL}`
    ,   SHOW_INFO:      `${process.env.REACT_APP_SHOW_INFO_URL}`
    }

,   PAGINATION: {
        PAGE_SIZE:  parseInt(`${process.env.REACT_APP_PAGE_SIZE}`)
    }

}



export default ENV
