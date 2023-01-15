const ENV   = require('../ENV')
const Axios = require('axios')



module.exports = Axios.create({
    baseURL:    ENV.URLS.BASE_URL
,   timeout:    ENV.AXIOS_CONFIG.TIMEOUT_MS
})
