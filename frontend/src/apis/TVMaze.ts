import ENV      from '../ENV'

import Axios    from 'axios'



export default Axios.create({
    baseURL:    ENV.URLS.BASE_URL
,   timeout:    ENV.AXIOS_CONFIG.TIMEOUT_MS
,   headers:    {
        'Content-Type': 'application/json'
    ,   'Accepts':      'application/json'
    }
})
